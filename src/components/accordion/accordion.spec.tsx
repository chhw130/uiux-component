import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import { Accordion } from './index'

describe('Accordion 컴포넌트', () => {
  const CONTENTS = [
    {
      header: 'Header 1',
      content: 'Content 1',
    },
    {
      header: 'Header 2',
      content: 'Content 2',
    },
  ] as const

  it('Accordion 컴포넌트의 올바른 요소를 렌더링합니다.', () => {
    render(
      <Accordion>
        <Accordion.Item value="item-1">
          <Accordion.Header>{CONTENTS[0].header}</Accordion.Header>
          <Accordion.Content>{CONTENTS[0].content}</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    )

    const headerText = screen.getByText(CONTENTS[0].header)
    const contentText = screen.getByText(CONTENTS[0].content)

    expect(headerText).toBeInTheDocument()

    /**
     * 실제 details태그 부분은 초기 렌더링이 되지는 않지만, dom element 메모리에는 차지하고 있음.
     * 그렇기 때문에 toBeInTheDocument() 테스트는 통과하지만, toBeVisible() 테스트는 실패함.
     */
    expect(contentText).toBeInTheDocument()
    expect(contentText).not.toBeVisible()
  })

  it('Accordion 컴포넌트의 헤더를 클릭하면 콘텐츠가 펼쳐지고 닫힙니다.', async () => {
    render(
      <Accordion>
        <Accordion.Item value="item-1">
          <Accordion.Header>{CONTENTS[0].header}</Accordion.Header>
          <Accordion.Content>{CONTENTS[0].content}</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    )

    const header = screen.getByText(CONTENTS[0].header)
    const details = header.closest('details')

    expect(details).not.toHaveAttribute('open')

    await userEvent.click(header)
    expect(details).toHaveAttribute('open')

    await userEvent.click(header)
    expect(details).not.toHaveAttribute('open')
  })

  it('defaultValue 속성을 통해 초기 열린 아이템을 설정 할 수 있습니다.', () => {
    render(
      <Accordion defaultValue={['item-1']}>
        {CONTENTS.map(({ header, content }, index) => (
          <Accordion.Item value={`item-${index}`} key={index}>
            <Accordion.Header>{header}</Accordion.Header>
            <Accordion.Content>{content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>,
    )

    const header1 = screen.getByText(CONTENTS[0].header)
    const details1 = header1.closest('details')
    expect(details1).not.toHaveAttribute('open')

    const header2 = screen.getByText(CONTENTS[1].header)
    const details2 = header2.closest('details')
    expect(details2).toHaveAttribute('open')
  })

  it('onValueChange 속성을 통해 열려있는 아이템이 변경될 때 호출되는 콜백 함수를 설정 할 수 있습니다. 콜백 함수의 인자는 현재 열려있는 accordion의 value 배열입니다.', async () => {
    const onValueChange = vi.fn()
    render(
      <Accordion onValueChange={onValueChange}>
        {CONTENTS.map(({ header, content }, index) => (
          <Accordion.Item value={`item-${index}`} key={index}>
            <Accordion.Header>{header}</Accordion.Header>
            <Accordion.Content>{content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>,
    )

    const header = screen.getByText(CONTENTS[0].header)
    await userEvent.click(header)

    expect(onValueChange).toHaveBeenLastCalledWith(['item-0'])

    const secondHeader = screen.getByText(CONTENTS[1].header)
    await userEvent.click(secondHeader)
    expect(onValueChange).toHaveBeenLastCalledWith(['item-0', 'item-1'])

    await userEvent.click(header)
    expect(onValueChange).toHaveBeenLastCalledWith(['item-1'])
  })

  it('키보드(Tab, Enter, Space)로 아코디언을 조작할 수 있어야 합니다.', async () => {
    render(
      <Accordion>
        <Accordion.Item value="item-1">
          <Accordion.Header>{CONTENTS[0].header}</Accordion.Header>
          <Accordion.Content>{CONTENTS[0].content}</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    )

    const header = screen.getByText(CONTENTS[0].header)
    const details = header.closest('details')

    // 1. Tab 키로 헤더에 포커스
    await userEvent.tab()
    expect(header).toHaveFocus()

    // 2. Enter 키로 열기
    await userEvent.keyboard('{enter}')
    expect(details).toHaveAttribute('open')

    // 3. Space 키로 닫기
    await userEvent.keyboard('{ }')
    expect(details).not.toHaveAttribute('open')

    /**
     * 대부분의 accordion 컴포넌트는 space 키로 열고 닫는 것을 지원하지 않음.
     * 하지만 summary details기반의 컴포넌트는 기본적으로 space키를 지원하고 있음.
     * 따라서 기본 브라우저 동작을 지원하는 부분을 살리는 게 좋다고 판단함. -> space 키도 지원.
     */
  })
})
