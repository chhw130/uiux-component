import { useOverlay } from './useOverlay'

const OverlaySection = () => {
  const overlay = useOverlay()

  return (
    <section>
      <h2>Overlay</h2>
      <p>isOpen: {overlay.isOpen ? 'true' : 'false'}</p>
      <button onClick={() => overlay.openOverlay(<div>Overlay</div>)}>
        Open
      </button>
    </section>
  )
}

export default OverlaySection
