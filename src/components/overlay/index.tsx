import { createContext, useCallback, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type OverlayContextType = {
  isOpen: boolean
  openOverlay: (children: ReactNode) => void
  closeOverlay: () => void
}

export const overlayContext = createContext<OverlayContextType>({
  isOpen: false,
  openOverlay: () => {},
  closeOverlay: () => {},
})

const OverayComponent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      123
      <div>{children}</div>
    </>
  )
}

export const Overlay = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [overlayChildren, setOverlayChildren] = useState<ReactNode>(null)

  const openOverlay = useCallback((children: ReactNode) => {
    console.log(1)
    setIsOpen(true)
    setOverlayChildren(children)
  }, [])

  const closeOverlay = useCallback(() => {
    console.log(2)
    setIsOpen(false)
  }, [])

  return (
    <overlayContext.Provider value={{ isOpen, openOverlay, closeOverlay }}>
      {children}
      {isOpen &&
        createPortal(
          <OverayComponent>{overlayChildren}</OverayComponent>,
          document.body,
        )}
    </overlayContext.Provider>
  )
}
