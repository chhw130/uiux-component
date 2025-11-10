import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
  useMemo,
} from 'react'
import styles from './accordion.module.css'

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
      <div {...props}>{children}</div>
    </accordionContext.Provider>
  )
}

/**
 * Accordion Item Component
 */
const accordionItemContext = createContext<{
  value: string
  disabled?: boolean
}>({
  value: '',
  disabled: false,
})

type AccordionItemProps = {
  children: React.ReactNode
  value: string
  disabled?: boolean
} & React.HTMLAttributes<HTMLDetailsElement>

export const AccordionItem = ({
  children,
  value,
  disabled,
  ...props
}: AccordionItemProps) => {
  const { openIndexes } = useContext(accordionContext)

  return (
    <accordionItemContext.Provider value={{ value, disabled }}>
      <details
        className={styles['accordion-item']}
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
  const { value, disabled } = useContext(accordionItemContext)
  const { openIndexes, setOpenIndexes } = useContext(accordionContext)

  const onClickAccordionHeader = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()

      if (disabled) {
        return
      }

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
  const tabIndex = useMemo(() => (disabled ? -1 : 0), [disabled])

  const buttonIcon = useMemo(
    () => (openIndexes.has(value) ? '▼' : '▶'),
    [openIndexes],
  )

  return (
    <summary
      className={`${styles['accordion-header']} ${disabled && styles.disabled}`}
      onClick={onClickAccordionHeader}
      tabIndex={tabIndex}
      aria-disabled={disabled}
      {...props}
    >
      {children}
      <span className={styles['accordion-toggle-button']} aria-hidden="true">
        {buttonIcon}
      </span>
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
    <div className={styles['accordion-content']} {...props}>
      {children}
    </div>
  )
}

Accordion.Item = AccordionItem
Accordion.Header = AccordionHeader
Accordion.Content = AccordionContent
