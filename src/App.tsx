import './App.css'
import { Accordion } from './components/accordion'

function App() {
  return (
    <>
      <section>
        <h2>Accordion</h2>
        <Accordion>
          <Accordion.Header>Accordion Item 1</Accordion.Header>
          <Accordion.Content>
            <p>Accordion Content</p>
          </Accordion.Content>
        </Accordion>
      </section>
    </>
  )
}

export default App
