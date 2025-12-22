import { createContext, useCallback, useState, type ReactElement } from 'react'
import { generateOverlayId } from './util'
import OverlayContainer from './OverlayContainer'

export type OpenElementType =
  | ReactElement
  | ((parameters: {
      isOpen: boolean
      onClose: (value?: any) => void
    }) => ReactElement)

export type CloseAsyncParameters = {
  value?: any
  resolver?: ResolverType
}

export type CloseOverlayType = (
  id: string,
  parameters: CloseAsyncParameters,
) => void

export type ResolverType = (value: any) => void

export type OverlayContextType = {
  openOverlay: (element: OpenElementType) => void
  closeOverlay: CloseOverlayType
  openOverlayAsync: <T>(element: OpenElementType) => Promise<T>
}

export const overlayContext = createContext<OverlayContextType>({
  openOverlay: () => {},
  closeOverlay: () => {},
  openOverlayAsync: () => Promise.resolve({} as any),
})

export const Overlay = ({ children }: { children: ReactElement }) => {
  const [overlayMap, setOverlayMap] = useState<
    Map<string, { isOpen: boolean; element: ReactElement }>
  >(new Map())

  const closeOverlay = useCallback(
    (id: string = '', { value, resolver }: CloseAsyncParameters) => {
      if (value && resolver) {
        resolver(value)
      }

      setOverlayMap((prev) => {
        const newMap = new Map(prev)
        newMap.delete(id)
        return newMap
      })
    },
    [],
  )

  const closeMiddleWare = useCallback((id?: any, resolver?: ResolverType) => {
    return (value?: any) => {
      closeOverlay(id, { value, resolver })
    }
  }, [])

  const openOverlay = useCallback(
    (element: OpenElementType, resolver?: ResolverType) => {
      const id = generateOverlayId()

      const overlayElement =
        typeof element === 'function'
          ? element({
              isOpen: true,
              onClose: closeMiddleWare(id, resolver),
            })
          : element

      setOverlayMap((prev) => {
        const newMap = new Map(prev)
        newMap.set(id, { isOpen: true, element: overlayElement })
        return newMap
      })
    },
    [],
  )

  const openOverlayAsync = useCallback(<T,>(element: OpenElementType) => {
    return new Promise<T>((resolve, reject) => {
      try {
        openOverlay(element, resolve)
      } catch (error) {
        reject(new Error('Async Overlay Error', { cause: error }))
      }
    })
  }, [])

  const overlayElements = Array.from(overlayMap.entries())

  return (
    <overlayContext.Provider
      value={{ openOverlay, closeOverlay, openOverlayAsync }}
    >
      {children}
      {overlayElements.map(([id, { isOpen, element }]) => {
        const isLastOpenOverlay =
          id === overlayElements[overlayElements.length - 1][0]

        return (
          <OverlayContainer
            isOpen={isOpen}
            key={id}
            element={element}
            onClose={closeMiddleWare(id)}
            isLastOpen={isLastOpenOverlay}
          />
        )
      })}
    </overlayContext.Provider>
  )
}
