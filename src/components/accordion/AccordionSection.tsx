import { useState } from 'react'
import { Accordion } from '.'

const EXAMPLE = {
  accordion: Array.from({ length: 5 }, (_, i) => ({
    title: `accordion ${i + 1}`,
    content: `이 글은 ${i + 1}번째 아이템의 내용입니다.
    This release includes comprehensive bug fixes across 14+ components:
  
  Checkbox: Fixed indeterminate initial state and api.checkedState accuracy
  Combobox: Fixed initial value propagation in controlled single-select mode
  Dialog & Popover: Improved focus trap scope for elements with aria-controls
  Listbox: Fixed Enter key behavior when no item is highlighted
  Number Input: Fixed cursor jumping when typing in formatted values
  Pagination: Added getPageUrl prop for link-based pagination
  Pin Input: Fixed Cmd+Backspace and Cmd+Delete keyboard shortcuts
  Scroll Area: Fixed Safari RTL scrollbar positioning and resize tracking
  Select: Fixed required state accessibility
  Slider: Fixed dragging behavior when disabled mid-operation
  Switch: Fixed data-active attribute consistency with runtime disabled changes
  Tabs: Improved indicator positioning with getBoundingClientRect()
        `,

    disabled: i === 2,
  })),
}

const AccordionSection = () => {
  const [currentOpenValue, setCurrentOpenValue] = useState<string[]>([])

  return (
    <section>
      <h2>Accordion</h2>
      <p>열린 아이템 : {currentOpenValue.join(', ')}</p>
      <Accordion
        defaultValue={['0', '1']}
        onValueChange={(value: string[]) => {
          setCurrentOpenValue(value)
        }}
      >
        {EXAMPLE.accordion.map(({ title, content, disabled }, idx) => (
          <Accordion.Item value={idx.toString()} key={idx} disabled={disabled}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Content>{content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  )
}

export default AccordionSection
