import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
  useMemo,
  type ReactNode,
  type ComponentProps,
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
  children: ReactNode
  onValueChange?: (openIndexes: string[]) => void
  defaultValue?: string[]
} & ComponentProps<'div'>

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
  children: ReactNode
  value: string
  disabled?: boolean
} & ComponentProps<'details'>

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
  children: ReactNode
} & ComponentProps<'summary'>

export const AccordionHeader = ({
  children,
  ...props
}: AccordionHeaderProps) => {
  const { value, disabled } = useContext(accordionItemContext)
  const { setOpenIndexes } = useContext(accordionContext)

  const toggleAccordion = useCallback(() => {
    if (disabled) {
      return
    }
    setOpenIndexes((currentOpenIndexes) => {
      const newIndexes = new Set(currentOpenIndexes)
      if (newIndexes.has(value)) {
        newIndexes.delete(value)
      } else {
        newIndexes.add(value)
      }
      return newIndexes
    })
  }, [disabled, setOpenIndexes, value])

  const onClickAccordionHeader = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      toggleAccordion()
    },
    [toggleAccordion],
  )

  const onKeyDownAccordionHeader = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleAccordion()
      }
    },
    [toggleAccordion],
  )

  const tabIndex = useMemo(() => (disabled ? -1 : 0), [disabled])

  return (
    <summary
      className={`${styles['accordion-header']} ${disabled && styles.disabled}`}
      onClick={onClickAccordionHeader}
      onKeyDown={onKeyDownAccordionHeader}
      tabIndex={tabIndex}
      aria-disabled={disabled}
      {...props}
    >
      {children}
      <span className={styles['accordion-toggle-button']} aria-hidden="true">
        ▶
      </span>
    </summary>
  )
}

/**
 * Accordion Content Component
 */
type AccordionContentProps = {
  children: ReactNode
} & ComponentProps<'div'>

export const AccordionContent = ({
  children,
  ...props
}: AccordionContentProps) => {
  return (
    <div className={styles['accordion-content']}>
      <div className={styles['accordion-content-inner']} {...props}>
        {children}
      </div>
    </div>
  )
}

Accordion.Item = AccordionItem
Accordion.Header = AccordionHeader
Accordion.Content = AccordionContent
