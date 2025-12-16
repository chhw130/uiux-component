import Dialog from './Dialog'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
}

const DialogExample = ({ isOpen, onClose, onConfirm }: DialogProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <h2>Dialog</h2>
      <div>모달입니다.</div>
      <button onClick={onClose}>Close</button>
      <button onClick={onConfirm}>Confirm</button>
    </Dialog>
  )
}

export default DialogExample
