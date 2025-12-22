import Dialog from './Dialog'
import { useOverlay } from './useOverlay'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
}

const DialogExample = ({ isOpen, onClose, onConfirm }: DialogProps) => {
  const overlay = useOverlay()

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <h2>Dialog</h2>
      <div>모달입니다.</div>
      <button
        onClick={() => {
          overlay.onOpen(({ isOpen, onClose }) => {
            return (
              <Dialog isOpen={isOpen} onClose={onClose}>
                <h2>Dialog</h2>
                <div>새로운 중첩 모달입니다.</div>

                <button onClick={onClose}>Confirm</button>
              </Dialog>
            )
          })
        }}
      >
        open new Overlay
      </button>
      <button onClick={onClose}>Close</button>
      <button onClick={onConfirm}>Confirm</button>
    </Dialog>
  )
}

export default DialogExample
