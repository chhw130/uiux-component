import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react'
import './accordion.css'

type OpenIndexes = Set<string>

const accordionContext = createContext<{
  openIndexes: OpenIndexes
  setOpenIndexes: Dispatch<SetStateAction<OpenIndexes>>
}>({
  openIndexes: new Set(),
  setOpenIndexes: () => {},
})

/**
 * Accordion Wrapper Component
 */
type AccordionProps = {
  children: React.ReactNode
  // isOpen값이 바뀔 때 호출되는 함수인데 Value로 괜찮을까??
  onValueChange?: (openIndexes: string[]) => void
  defaultValue?: string[]
} & React.HTMLAttributes<HTMLDivElement>

export const Accordion = ({
  children,
  onValueChange,
  defaultValue,
  ...props
}: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<OpenIndexes>(
    new Set(defaultValue),
  )

  const memoizedOnValueChanged = useCallback(
    (indexes: OpenIndexes) => {
      onValueChange?.(Array.from(indexes))
    },
    [openIndexes],
  )

  useEffect(() => {
    memoizedOnValueChanged(openIndexes)
  }, [openIndexes])

  return (
    <accordionContext.Provider value={{ openIndexes, setOpenIndexes }}>
      <div className="accordion-container" {...props}>
        {children}
      </div>
    </accordionContext.Provider>
  )
}

/**
 * Accordion Item Component
 */
const accordionItemContext = createContext<{
  value: string
}>({
  value: '',
})

type AccordionItemProps = {
  children: React.ReactNode
  value: string
} & React.HTMLAttributes<HTMLDetailsElement>

export const AccordionItem = ({
  children,
  value,
  ...props
}: AccordionItemProps) => {
  const { openIndexes } = useContext(accordionContext)

  return (
    <accordionItemContext.Provider value={{ value }}>
      <details
        className="accordion-item"
        open={openIndexes.has(value)}
        {...props}
      >
        {children}
      </details>
    </accordionItemContext.Provider>
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
  const { value } = useContext(accordionItemContext)
  const { openIndexes, setOpenIndexes } = useContext(accordionContext)

  const onClickAccordionHeader = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      if (openIndexes.has(value)) {
        setOpenIndexes((prev) => {
          const newIndexes = new Set(prev)
          newIndexes.delete(value)
          return newIndexes
        })
        return
      }

      setOpenIndexes((prev) => {
        const newIndexes = new Set(prev)
        newIndexes.add(value)
        return newIndexes
      })
    },
    [value, openIndexes],
  )

  const buttonIcon = openIndexes.has(value) ? '▼' : '▶'

  return (
    <summary
      className="accordion-header"
      onClick={onClickAccordionHeader}
      tabIndex={0}
      {...props}
    >
      {children}
      <button className="accordion-toggle-button" tabIndex={-1}>
        {buttonIcon}
      </button>
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
  return (
    <div className="accordion-content" {...props}>
      {children}
    </div>
  )
}

Accordion.Item = AccordionItem
Accordion.Header = AccordionHeader
Accordion.Content = AccordionContent
