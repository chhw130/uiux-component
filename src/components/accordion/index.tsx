import {
  createContext,
  useCallback,
  useContext,
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

type AccordionProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const Accordion = ({ children, ...props }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <accordionContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="accordion-container" {...props}>
        {children}
      </div>
    </accordionContext.Provider>
  )
}

type AccordionHeaderProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

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
    <div
      className="accordion-header"
      onClick={onClickAccordionHeader}
      {...props}
    >
      {children}
      <button className="accordion-toggle-button">{toggleIcon}</button>
    </div>
  )
}

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
