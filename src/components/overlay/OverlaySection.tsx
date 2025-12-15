import Dialog from './Dialog'
import { useOverlay } from './useOverlay'

const OverlaySection = () => {
  const overlay = useOverlay()

  return (
    <section>
      <h2>Overlay</h2>
      <button
        onClick={() =>
          overlay.onOpen(({ isOpen, onClose }) => {
            return <Dialog isOpen={isOpen} onClose={onClose} />
          })
        }
      >
        Open
      </button>
    </section>
  )
}

export default OverlaySection
