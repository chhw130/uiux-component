import './App.css'
import { Accordion } from './components/accordion'

const EXAMPLE = {
  accordion: {
    title: 'accordion',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, 
      quis aliquam nisl nisl eu nisl. 
      Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, 
      quis aliquam nisl nisl eu nisl. 
      Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, 
      quis aliquam nisl nisl eu nisl. 
      Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.`,
  },
}

function App() {
  return (
    <>
      <section>
        <h2>Accordion</h2>
        <Accordion
          onValueChange={(isOpen: boolean) => {
            console.log('value change', isOpen)
          }}
        >
          <Accordion.Header>{EXAMPLE.accordion.title}</Accordion.Header>
          <Accordion.Content>
            <p>{EXAMPLE.accordion.content}</p>
          </Accordion.Content>
        </Accordion>
      </section>
    </>
  )
}

export default App
