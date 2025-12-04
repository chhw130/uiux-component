import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from './index'
import { fn } from 'storybook/test'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      description: '기본적으로 열려있을 아이템들의 value 배열입니다.',
      control: 'object',
    },
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="item-1">
        <Accordion.Header>Is it accessible?</Accordion.Header>
        <Accordion.Content>
          Yes. It adheres to the WAI-ARIA design pattern for accordions.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Header>Is it styled?</Accordion.Header>
        <Accordion.Content>
          Yes. It comes with default styles that can be easily overridden.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Header>Is it animated?</Accordion.Header>
        <Accordion.Content>
          Yes. It's animated by default, but you can disable it if you prefer.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  args: {
    onValueChange: fn(),
    defaultValue: ['item-1'],
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DefaultValueOpen: Story = {
  args: {
    defaultValue: ['item-2'],
  },
}

export const MultipleValuesOpen: Story = {
  args: {
    defaultValue: ['item-1', 'item-3'],
  },
}

export const DisabledItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="item-1">
        <Accordion.Header>Normal Item</Accordion.Header>
        <Accordion.Content>You can open and close this item.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2" disabled>
        <Accordion.Header>Disabled Item</Accordion.Header>
        <Accordion.Content>
          You cannot interact with this item.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Header>Another Normal Item</Accordion.Header>
        <Accordion.Content>This one works too.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}
