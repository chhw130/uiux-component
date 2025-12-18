import { type ReactElement } from 'react'
import { createPortal } from 'react-dom'

const OverlayContainer = ({
  isOpen,
  element,
}: {
  isOpen: boolean
  overlayId: string
  element: ReactElement
}) => {
  return isOpen && createPortal(element, document.body)
}

export default OverlayContainer
