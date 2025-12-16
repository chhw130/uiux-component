import { useState } from 'react'
import { useOverlay } from './useOverlay'
import DialogExample from './DialogExample'

const OverlaySection = () => {
  const overlay = useOverlay()
  const [asyncValue, setAsyncValue] = useState<string | null>(null)

  return (
    <section>
      <h2>Overlay</h2>
      <button
        onClick={async () => {
          overlay.onOpen(({ isOpen, onClose }) => {
            return (
              <DialogExample
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={onClose}
              />
            )
          })
        }}
      >
        Open
      </button>
      <button
        onClick={async () => {
          const result = await overlay.onOpenAsync<string>(
            ({ isOpen, onClose }) => {
              return (
                <DialogExample
                  isOpen={isOpen}
                  onClose={() => {
                    onClose('closed')
                  }}
                  onConfirm={() => {
                    onClose('confirmed')
                  }}
                />
              )
            },
          )

          setAsyncValue(result)
        }}
      >
        Open Async
      </button>

      <p>data : {asyncValue}</p>
    </section>
  )
}

export default OverlaySection
