type DialogProps = {
  isOpen: boolean
  onClose: () => void
}

const Dialog = ({ isOpen, onClose }: DialogProps) => {
  return (
    <div>
      {isOpen && (
        <div>
          <h2>Dialog</h2>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  )
}

export default Dialog
