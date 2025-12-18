import { createContext, useCallback, useState, type ReactElement } from 'react'
import { generateOverlayId } from './util'
import OverlayContainer from './OverlayContainer'

type OpenOverlayType =
  | ReactElement
  | ((parameters: {
      isOpen: boolean
      onClose: (value?: any) => void
    }) => ReactElement)

type OverlayContextType = {
  openOverlay: (element: OpenOverlayType) => void
  closeOverlay: (id: string, value?: any) => void
  openOverlayAsync: <T>(element: OpenOverlayType) => Promise<T>
}

export const overlayContext = createContext<OverlayContextType>({
  openOverlay: () => {},
  closeOverlay: () => {},
  openOverlayAsync: () => Promise.resolve({} as any),
})

type ResolverType = (value: any) => void

export const Overlay = ({ children }: { children: ReactElement }) => {
  const [overlayMap, setOverlayMap] = useState<
    Map<
      string,
      { isOpen: boolean; element: ReactElement; resolver?: ResolverType }
    >
  >(new Map())

  const closeOverlay = useCallback(
    (id: string = '', value?: any, resolver?: ResolverType) => {
      if (resolver) {
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

  const closeMiddleWare = (id?: any) => {
    return (value?: any) => {
      if (typeof value === 'object') {
        closeOverlay(id, null, overlayMap.get(id)?.resolver)
        return
      }
      closeOverlay(id, value, overlayMap.get(id)?.resolver)
    }
  }

  const openOverlay = useCallback(
    (element: OpenOverlayType, resolver?: ResolverType) => {
      const id = generateOverlayId()

      const onClose = closeMiddleWare(id)

      const overlayElement =
        typeof element === 'function'
          ? element({
              isOpen: true,
              onClose,
            })
          : element

      setOverlayMap((prev) => {
        const newMap = new Map(prev)
        newMap.set(id, { isOpen: true, element: overlayElement, resolver })
        return newMap
      })
    },
    [closeOverlay, overlayMap],
  )

  const openOverlayAsync = useCallback(
    <T,>(element: OpenOverlayType) => {
      return new Promise<T>((resolve) => {
        openOverlay(element, resolve)
      })
    },
    [openOverlay, overlayMap],
  )

  const overlayElements = Array.from(overlayMap.entries())

  return (
    <overlayContext.Provider
      value={{ openOverlay, closeOverlay, openOverlayAsync }}
    >
      {children}
      {overlayElements.map(([id, { isOpen, element }]) => {
        return (
          <OverlayContainer
            isOpen={isOpen}
            key={id}
            overlayId={id}
            element={element}
          />
        )
      })}
    </overlayContext.Provider>
  )
}
