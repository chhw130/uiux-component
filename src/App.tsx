import { useState } from 'react'
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
  const [currentOpenValue, setCurrentOpenValue] = useState<string[]>([])

  return (
    <>
      <section>
        <h2>Accordion</h2>
        <Accordion
          defaultValue={['0', '1']}
          onValueChange={(value: string[]) => {
            setCurrentOpenValue(value)
          }}
        >
          {EXAMPLE.accordion.map((item, idx) => (
            <Accordion.Item value={idx.toString()} key={idx}>
              <Accordion.Header>{item.title}</Accordion.Header>
              <Accordion.Content>
                <p>{item.content}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
        <p>열린 아이템 : {currentOpenValue.join(', ')}</p>
      </section>
    </>
  )
}

export default App
