import { useCallback, type ReactNode } from 'react'
import styles from './overlay.module.css'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}

const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  const clickOverlayOutside = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose()
      }
    },
    [],
  )

  return (
    isOpen && (
      <div
        onClick={clickOverlayOutside}
        className={styles['overlay-container']}
      >
        <div className={styles['overlay-content']}>{children}</div>
      </div>
    )
  )
}

export default Dialog
