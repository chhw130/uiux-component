import { useContext } from 'react'
import { overlayContext } from '.'

export const useOverlay = () => {
  const { openOverlay, openOverlayAsync } = useContext(overlayContext)

  return {
    onOpen: openOverlay,
    onOpenAsync: openOverlayAsync,
  }
}
