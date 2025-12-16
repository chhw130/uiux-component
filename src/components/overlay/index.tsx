import {
  createContext,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

type OpenOverlayType =
  | ReactNode
  | ((parameters: {
      isOpen: boolean
      onClose: (value?: any) => void
    }) => ReactNode)

type OverlayContextType = {
  isOpen: boolean
  openOverlay: (callback: OpenOverlayType) => void
  closeOverlay: (value?: any) => void
  openOverlayAsync: <T>(callback: OpenOverlayType) => Promise<T>
}

export const overlayContext = createContext<OverlayContextType>({
  isOpen: false,
  openOverlay: () => {},
  closeOverlay: () => {},
  openOverlayAsync: () => Promise.resolve({} as any),
})

type ResolverType = (value: any) => void

export const Overlay = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [overlayChildren, setOverlayChildren] = useState<ReactNode>(null)

  const openOverlay = useCallback((callback: OpenOverlayType) => {
    setIsOpen(true)

    setOverlayChildren(
      typeof callback === 'function'
        ? callback({ isOpen: true, onClose: closeOverlay })
        : callback,
    )
  }, [])

  const resolverRef = useRef<ResolverType | null>(null)

  const openOverlayAsync = useCallback(
    <T,>(callback: OpenOverlayType) => {
      return new Promise<T>((resolve) => {
        openOverlay(callback)
        resolverRef.current = resolve
      })
    },
    [openOverlay],
  )

  const closeOverlay = useCallback((value?: any) => {
    if (resolverRef.current) {
      resolverRef.current(value)
      resolverRef.current = null
    }
    setIsOpen(false)
    setOverlayChildren(null)
  }, [])

  return (
    <overlayContext.Provider
      value={{ isOpen, openOverlay, closeOverlay, openOverlayAsync }}
    >
      {children}
      {isOpen && createPortal(overlayChildren, document.body)}
    </overlayContext.Provider>
  )
}
