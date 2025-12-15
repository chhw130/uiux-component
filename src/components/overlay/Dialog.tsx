import styles from './overlay.module.css'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
}

const Dialog = ({ isOpen, onClose }: DialogProps) => {
  return (
    isOpen && (
      <div>
        <div className={styles['overlay-content']}>
          <h2>Dialog</h2>
          <div>모달입니다.</div>
          <button onClick={onClose}>Close / {isOpen ? 'true' : 'false'}</button>
        </div>
      </div>
    )
  )
}

export default Dialog
