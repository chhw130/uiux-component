import { createContext, useCallback, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './overlay.module.css'

type OverlayContextType = {
  isOpen: boolean
  openOverlay: (children: () => ReactNode) => void
  closeOverlay: () => void
}

export const overlayContext = createContext<OverlayContextType>({
  isOpen: false,
  openOverlay: () => {},
  closeOverlay: () => {},
})

type OverlayComponentProps = {
  children: ReactNode
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void
}

const OverlayComponent = ({ children, onClose }: OverlayComponentProps) => {
  return (
    <div className={styles['overlay-container']} onClick={onClose}>
      <div className={styles['overlay-content']}>{children}</div>
    </div>
  )
}

export const Overlay = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [overlayChildren, setOverlayChildren] = useState<ReactNode>(null)

  const openOverlay = useCallback((childrenCallback: () => ReactNode) => {
    setIsOpen(true)
    setOverlayChildren(childrenCallback())
  }, [])

  const closeOverlay = useCallback(() => {
    setIsOpen(false)
  }, [])

  const clickOverlayOutside = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeOverlay()
      }
    },
    [closeOverlay],
  )

  return (
    <overlayContext.Provider value={{ isOpen, openOverlay, closeOverlay }}>
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
