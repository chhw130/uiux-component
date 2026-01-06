import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Overlay } from './index'
import { useOverlay } from './useOverlay'
import Dialog from './Dialog'

// 테스트를 위한 래퍼 컴포넌트
const TestApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="root">
      <Overlay>{children as React.ReactElement}</Overlay>
    </div>
  )
}

// 오버레이를 여는 트리거 컴포넌트
const OverlayTrigger = () => {
  const { onOpen, onOpenAsync } = useOverlay()

  const handleOpen = () => {
    onOpen(({ isOpen, onClose }) => (
      <Dialog isOpen={isOpen} onClose={onClose}>
        <div>Overlay Content</div>
        <button onClick={() => onClose()}>Close</button>
      </Dialog>
    ))
  }

  const handleOpenAsync = async () => {
    const result = await onOpenAsync<string>(({ isOpen, onClose }) => (
      <Dialog isOpen={isOpen} onClose={onClose}>
        <div>Async Overlay Content</div>
        <button onClick={() => onClose('confirmed')}>Confirm</button>
      </Dialog>
    ))
    // 결과를 화면에 표시
    const resultDiv = document.createElement('div')
    resultDiv.textContent = `Result: ${result}`
    document.body.appendChild(resultDiv)
  }

  return (
    <div>
      <button onClick={handleOpen}>Open Overlay</button>
      <button onClick={handleOpenAsync}>Open Async Overlay</button>
    </div>
  )
}

describe('Overlay 컴포넌트', () => {
  beforeEach(() => {
    // Portal을 위해 body 정리
    document.body.innerHTML = '<div id="root"></div>'
  })

  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('useOverlay 훅을 사용하여 오버레이를 열고 닫을 수 있다.', async () => {
    const user = userEvent.setup()
    render(
      <TestApp>
        <OverlayTrigger />
      </TestApp>,
    )

    // 열기 전에는 없음
    expect(screen.queryByText('Overlay Content')).not.toBeInTheDocument()

    // 열기 버튼 클릭
    await user.click(screen.getByText('Open Overlay'))

    // 오버레이 내용 확인
    expect(screen.getByText('Overlay Content')).toBeInTheDocument()

    // 닫기 버튼 클릭
    await user.click(screen.getByText('Close'))

    // 닫힌 후 사라짐
    await waitFor(() => {
      expect(screen.queryByText('Overlay Content')).not.toBeInTheDocument()
    })
  })

  it('openOverlayAsync를 사용하여 값을 반환받을 수 있다.', async () => {
    const user = userEvent.setup()
    render(
      <TestApp>
        <OverlayTrigger />
      </TestApp>,
    )

    await user.click(screen.getByText('Open Async Overlay'))
    expect(screen.getByText('Async Overlay Content')).toBeInTheDocument()

    await user.click(screen.getByText('Confirm'))

    // 오버레이가 닫히고 결과가 표시되는지 확인
    await waitFor(() => {
      expect(
        screen.queryByText('Async Overlay Content'),
      ).not.toBeInTheDocument()
      expect(screen.getByText('Result: confirmed')).toBeInTheDocument()
    })
  })

  it('오버레이가 열리면 body의 스크롤이 잠긴다.', async () => {
    const user = userEvent.setup()
    render(
      <TestApp>
        <OverlayTrigger />
      </TestApp>,
    )

    expect(document.body.style.overflow).toBe('')

    await user.click(screen.getByText('Open Overlay'))
    expect(document.body.style.overflow).toBe('hidden')

    await user.click(screen.getByText('Close'))
    expect(document.body.style.overflow).toBe('')
  })

  it('Escape 키를 누르면 오버레이가 닫힌다.', async () => {
    const user = userEvent.setup()
    render(
      <TestApp>
        <OverlayTrigger />
      </TestApp>,
    )

    await user.click(screen.getByText('Open Overlay'))
    expect(screen.getByText('Overlay Content')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByText('Overlay Content')).not.toBeInTheDocument()
    })
  })

  it('오버레이 내부에서 Tab 키를 누르면 포커스가 순환한다 (Focus Trap).', async () => {
    const user = userEvent.setup()

    // 포커스 테스트를 위한 커스텀 트리거
    const FocusTestTrigger = () => {
      const { onOpen } = useOverlay()
      return (
        <button
          onClick={() =>
            onOpen(({ isOpen, onClose }) => (
              <Dialog isOpen={isOpen} onClose={onClose}>
                <input aria-label="First Input" />
                <button>Middle Button</button>
                <input aria-label="Last Input" />
              </Dialog>
            ))
          }
        >
          Open Focus Test
        </button>
      )
    }

    render(
      <TestApp>
        <FocusTestTrigger />
      </TestApp>,
    )

    await user.click(screen.getByText('Open Focus Test'))

    // 첫 번째 요소에 포커스가 가는지 확인
    const firstInput = screen.getByLabelText('First Input')
    expect(firstInput).toHaveFocus()

    // 탭 이동
    await user.tab()
    expect(screen.getByText('Middle Button')).toHaveFocus()

    await user.tab()
    const lastInput = screen.getByLabelText('Last Input')
    expect(lastInput).toHaveFocus()

    // 마지막 요소에서 탭하면 다시 첫 번째 요소로 (순환)
    await user.tab()
    expect(firstInput).toHaveFocus()

    // Shift + Tab (역순)
    await user.tab({ shift: true })
    expect(lastInput).toHaveFocus()
  })

  it('오버레이가 열리면 root 요소에 aria-hidden 속성이 추가된다.', async () => {
    const user = userEvent.setup()
    render(
      <TestApp>
        <OverlayTrigger />
      </TestApp>,
    )

    const root = document.getElementById('root')
    expect(root).not.toHaveAttribute('aria-hidden')

    await user.click(screen.getByText('Open Overlay'))
    expect(root).toHaveAttribute('aria-hidden', 'true')

    await user.click(screen.getByText('Close'))
    expect(root).not.toHaveAttribute('aria-hidden')
  })
})
