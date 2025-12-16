import {
  createContext,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import styles from './overlay.module.css'

type OverlayContextType = {
  isOpen: boolean
  openOverlay: (callback: OpenOverlayType) => void
  closeOverlay: (value?: any) => void
  openOverlayAsync: <T = any>(callback: OpenOverlayType) => Promise<T>
}

type OpenOverlayType =
  | ReactNode
  | ((parameters: {
      isOpen: boolean
      onClose: (value?: any) => void
    }) => ReactNode)

export const overlayContext = createContext<OverlayContextType>({
  isOpen: false,
  openOverlay: () => {},
  closeOverlay: () => {},
  openOverlayAsync: () => Promise.resolve(null as any),
})

type OverlayComponentProps = {
  children: ReactNode
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void
}

const OverlayComponent = ({ children, onClose }: OverlayComponentProps) => {
  return (
    <div className={styles['overlay-container']} onClick={onClose}>
      {children}
    </div>
  )
}

export const Overlay = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [overlayChildren, setOverlayChildren] = useState<ReactNode>(null)

  const resolverRef = useRef<((value: any) => void) | null>(null)

  const closeOverlay = useCallback((value?: any) => {
    if (resolverRef.current) {
      resolverRef.current(value)
      resolverRef.current = null
    }
    setIsOpen(false)
    setOverlayChildren(null)
  }, [])

  const openOverlay = useCallback(
    (callback: OpenOverlayType) => {
      setIsOpen(true)

      setOverlayChildren(
        typeof callback === 'function'
          ? callback({ isOpen: true, onClose: closeOverlay })
          : callback,
      )
    },
    [closeOverlay],
  )

  const openOverlayAsync = useCallback(
    <T,>(callback: OpenOverlayType) => {
      return new Promise<T>((resolve) => {
        openOverlay(callback)
        resolverRef.current = resolve
      })
    },
    [openOverlay],
  )

  const clickOverlayOutside = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeOverlay()
      }
    },
    [closeOverlay],
  )

  return (
    <overlayContext.Provider
      value={{ isOpen, openOverlay, closeOverlay, openOverlayAsync }}
    >
      {children}
      {isOpen &&
        createPortal(
          <OverlayComponent onClose={clickOverlayOutside}>
            {overlayChildren}
          </OverlayComponent>,
          document.body,
        )}
    </overlayContext.Provider>
  )
}
