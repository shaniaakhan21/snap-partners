import { MouseEvent, useState } from 'react'

export const useModal = (initState: boolean) => {
  const [isOpen, setIsOpen] = useState(initState)

  const fnOpenModal = (callbackOnOpen?: () => void) => {
    if (callbackOnOpen) callbackOnOpen()
    document.body.style.overflowY = 'hidden'
    setIsOpen(true)
  }

  const fnCloseModal = (e: MouseEvent<HTMLElement>, elementRef: HTMLElement, callbackOnClose?: () => void) => {
    if (callbackOnClose) callbackOnClose()
    if (elementRef === e.target) {
      document.body.style.overflowY = 'auto'
      setIsOpen(false)
    }
  }

  return { isOpen, fnOpenModal, fnCloseModal }
}
