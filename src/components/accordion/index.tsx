import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import './accordion.css'

const accordionContext = createContext<{
  isOpen: boolean
  setIsOpen: (toggle: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

/**
 * Accordion Wrapper Component
 */
type AccordionProps = {
  children: React.ReactNode
  // isOpen값이 바뀔 때 호출되는 함수인데 Value로 괜찮을까??
  onValueChange?: (isOpen: boolean) => void
} & React.HTMLAttributes<HTMLDetailsElement>

export const Accordion = ({
  children,
  onValueChange,
  ...props
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const memoizedOnValueChanged = useCallback(
    (isOpen: boolean) => onValueChange?.(isOpen),
    [isOpen],
  )

  useEffect(() => {
    memoizedOnValueChanged(isOpen)
  }, [isOpen])

  return (
    <accordionContext.Provider value={{ isOpen, setIsOpen }}>
      <details className="accordion-container" {...props}>
        {children}
      </details>
    </accordionContext.Provider>
  )
}

/**
 * Accordion Header Component
 */
type AccordionHeaderProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

export const AccordionHeader = ({
  children,
  ...props
}: AccordionHeaderProps) => {
  const { isOpen, setIsOpen } = useContext(accordionContext)

  const toggleIcon = useMemo(() => (isOpen ? '▲' : '▼'), [isOpen])

  const onClickAccordionHeader = useCallback(
    () => setIsOpen(!isOpen),
    [isOpen, setIsOpen],
  )

  return (
    <summary
      className="accordion-header"
      onClick={onClickAccordionHeader}
      {...props}
    >
      {children}
      <button className="accordion-toggle-button">{toggleIcon}</button>
    </summary>
  )
}

/**
 * Accordion Content Component
 */
type AccordionContentProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const AccordionContent = ({
  children,
  ...props
}: AccordionContentProps) => {
  const { isOpen } = useContext(accordionContext)

  if (!isOpen) return null

  return (
    <div className="accordion-content" {...props}>
      {children}
    </div>
  )
}

Accordion.Header = AccordionHeader
Accordion.Content = AccordionContent
