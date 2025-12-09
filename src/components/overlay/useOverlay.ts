import { useContext } from 'react'
import { overlayContext } from '.'

export const useOverlay = () => {
  const { isOpen, openOverlay, closeOverlay } = useContext(overlayContext)

  return { isOpen, onOpen: openOverlay, onClose: closeOverlay }
}
