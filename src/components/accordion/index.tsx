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

type OpenIndexes = Set<string | number>

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
  onValueChange?: (openIndexes: OpenIndexes) => void
} & React.HTMLAttributes<HTMLDivElement>

export const Accordion = ({
  children,
  onValueChange,
  ...props
}: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<OpenIndexes>(new Set())

  const memoizedOnValueChanged = useCallback(
    (indexes: OpenIndexes) => onValueChange?.(indexes),
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
  value: string | number
}>({
  value: '',
})

type AccordionItemProps = {
  children: React.ReactNode
  value: string | number
} & React.HTMLAttributes<HTMLDetailsElement>

export const AccordionItem = ({
  children,
  value,
  ...props
}: AccordionItemProps) => {
  return (
    <accordionItemContext.Provider value={{ value }}>
      <details className="accordion-item" {...props}>
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

  const onClickAccordionHeader = useCallback(() => {
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
  }, [value, openIndexes])

  return (
    <summary
      className="accordion-header"
      onClick={onClickAccordionHeader}
      tabIndex={0}
      {...props}
    >
      {children}
      <button className="accordion-toggle-button" tabIndex={-1}>
        {'toggle'}
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
  const { openIndexes } = useContext(accordionContext)
  const { value } = useContext(accordionItemContext)

  const isOpen = openIndexes.has(value)

  if (!isOpen) return null

  return (
    <div className="accordion-content" {...props}>
      {children}
    </div>
  )
}

Accordion.Item = AccordionItem
Accordion.Header = AccordionHeader
Accordion.Content = AccordionContent
