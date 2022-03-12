import { MouseEvent, ReactNode } from 'react'
import createAtom from 'zustand'

interface IModalAtom {
  isOpen: boolean
  modalChildren?: ReactNode
  openModal: (modalChildren: ReactNode, callbackOnOpen?: () => void) => void
  closeModal: (e: MouseEvent<HTMLElement>, elementRef: HTMLElement, callbackOnClose?: () => void) => void
}

export const useModalStore = createAtom<IModalAtom>(set => ({
  isOpen: false,
  modalChildren: null,
  openModal: (modalChildren: ReactNode, callbackOnOpen?: () => void) => {
    if (callbackOnOpen) callbackOnOpen()
    document.body.style.overflowY = 'hidden'
    set({ isOpen: true, modalChildren })
  },
  closeModal: (e: MouseEvent<HTMLElement>, elementRef: HTMLElement, callbackOnClose?: () => void) => {
    if (callbackOnClose) callbackOnClose()
    if (elementRef === e.target) {
      document.body.style.overflowY = 'auto'
      set({ isOpen: false, modalChildren: null })
    }
  }
}))
