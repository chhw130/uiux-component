import { useContext } from 'react'
import { overlayContext } from '.'

export const useOverlay = () => {
  const { isOpen, openOverlay, closeOverlay, openOverlayAsync } =
    useContext(overlayContext)

  return {
    isOpen,
    onOpen: openOverlay,
    onClose: closeOverlay,
    onOpenAsync: openOverlayAsync,
  }
}
