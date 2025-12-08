import './App.css'
import AccordionSection from './components/accordion/AccordionSection'
import { Overlay } from './components/overlay'
import OverlaySection from './components/overlay/OverlaySection'

function App() {
  return (
    <Overlay>
      {/* <AccordionSection /> */}
      <OverlaySection />
    </Overlay>
  )
}

export default App
