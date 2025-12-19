import { type ReactElement } from 'react'
import { createPortal } from 'react-dom'

type OverlayContainerProps = {
  isOpen: boolean
  element: ReactElement
}

const OverlayContainer = ({ isOpen, element }: OverlayContainerProps) => {
  return isOpen && createPortal(element, document.body)
}

export default OverlayContainer
