import { createContext, useCallback, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './overlay.module.css'

type OverlayContextType = {
  isOpen: boolean
  openOverlay: (callback: OpenOverlayType) => void
  closeOverlay: () => void
}

type OpenOverlayType =
  | ReactNode
  | ((parameters: { isOpen: boolean; onClose: () => void }) => ReactNode)

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
      {children}
    </div>
  )
}

export const Overlay = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [overlayChildren, setOverlayChildren] = useState<ReactNode>(null)

  const closeOverlay = useCallback(() => {
    setIsOpen(false)
    setOverlayChildren(null)
  }, [])

  const openOverlay = useCallback((callback: OpenOverlayType) => {
    setIsOpen(true)

    setOverlayChildren(
      typeof callback === 'function'
        ? callback({ isOpen: true, onClose: closeOverlay })
        : callback,
    )
  }, [])

  const clickOverlayOutside = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeOverlay()
      }
    },
    [],
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
