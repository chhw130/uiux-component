import './App.css'
import { Accordion } from './components/accordion'

const EXAMPLE = {
  accordion: Array.from({ length: 5 }, (_, i) => ({
    title: `accordion ${i + 1}`,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, 
      quis aliquam nisl nisl eu nisl. 
      Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, 
      quis aliquam nisl nisl eu nisl. 
      Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, 
      quis aliquam nisl nisl eu nisl. 
      Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.`,
  })),
}

function App() {
  return (
    <>
      <section>
        <h2>Accordion</h2>
        <Accordion
          onValueChange={(value) => {
            console.log('value change', value)
          }}
        >
          {EXAMPLE.accordion.map((item, idx) => (
            <Accordion.Item value={idx} key={idx}>
              <Accordion.Header>{item.title}</Accordion.Header>
              <Accordion.Content>
                <p>{item.content}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
    </>
  )
}

export default App
