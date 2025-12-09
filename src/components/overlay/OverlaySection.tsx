import { useOverlay } from './useOverlay'

const OverlaySection = () => {
  const { isOpen, onOpen } = useOverlay()

  return (
    <section>
      <h2>Overlay</h2>
      <p>isOpen: {isOpen ? 'true' : 'false'}</p>
      <button onClick={() => onOpen(() => <div>Overlay</div>)}>Open</button>
    </section>
  )
}

export default OverlaySection
