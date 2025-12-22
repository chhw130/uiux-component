import { useEffect, useRef, type ReactElement } from 'react'
import { createPortal } from 'react-dom'
import './overlay.module.css'

type OverlayContainerProps = {
  isOpen: boolean
  element: ReactElement
  onClose: () => void
  isLastOpen: boolean
}

export const FOCUSABLE_ELEMENT = [
  'button',
  'a',
  'input',
  'textarea',
  'select',
  'option',
  '[tabindex]:not([tabindex="-1"])',
] as const

const OverlayContainer = ({
  isOpen,
  element,
  onClose,
  isLastOpen,
}: OverlayContainerProps) => {
  const modalContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const container = modalContainerRef.current

    const focusableElements = container?.querySelectorAll(
      FOCUSABLE_ELEMENT.join(','),
    ) as HTMLElement[] | undefined

    if (!focusableElements || focusableElements.length === 0) {
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    firstElement.focus()

    // 모달이 열릴 때 첫 번째 요소에 포커스

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab') {
        return
      }

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    container?.addEventListener('keydown', handleTabKey)

    return () => {
      container?.removeEventListener('keydown', handleTabKey)
    }
  }, [isOpen, isLastOpen])

  return (
    isOpen &&
    createPortal(<div ref={modalContainerRef}>{element}</div>, document.body)
  )
}

export default OverlayContainer
