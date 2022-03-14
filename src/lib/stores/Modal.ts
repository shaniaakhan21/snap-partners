import { MouseEvent, ReactNode } from 'react'
import createAtom from 'zustand'

interface IModal {
  id: number
  isOpen: boolean
  modalChildren?: ReactNode
}

interface IModalAtom {
  modalsData: IModal[] | null
  initModals: (numberOfModals: number) => void // * Only use this method to indicate quantity of modals. It is used in _app page
  openModal: (id: number, modalChildren: ReactNode, callbackOnOpen?: () => void) => void
  closeModal: (e: MouseEvent<HTMLElement>, elementRef: HTMLElement, id: number, callbackOnClose?: () => void) => void
  addModal: (modal: IModal) => void
  removeModal: (id: number) => void
  clearAllModals: () => void
}

export const useModalStore = createAtom<IModalAtom>(set => ({
  modalsData: null,
  initModals: (numberOfModals: number) => set({
    modalsData: new Array(numberOfModals).fill(null).map((_, index) => ({
      id: index,
      isOpen: false,
      modalChildren: null
    }))
  }),
  openModal: (id: number, modalChildren: ReactNode, callbackOnOpen?: () => void) => {
    if (callbackOnOpen) callbackOnOpen()
    document.body.style.overflowY = 'hidden'

    set(prevState => {
      const modal = prevState.modalsData.find(modal => id === modal.id)

      if (!modal) return prevState

      modal.isOpen = true
      modal.modalChildren = modalChildren

      return {
        modalsData: {
          ...prevState.modalsData,
          modal
        }
      }
    })
  },
  closeModal: (e: MouseEvent<HTMLElement>, elementRef: HTMLElement, id: number, callbackOnClose?: () => void) => {
    if (callbackOnClose) callbackOnClose()
    if (elementRef === e.target) {
      document.body.style.overflowY = 'auto'

      set(prevState => {
        const modal = prevState.modalsData.find(modal => id === modal.id)

        if (!modal) return prevState

        modal.isOpen = false
        modal.modalChildren = null

        return {
          modalsData: {
            ...prevState.modalsData,
            modal
          }
        }
      })
    }
  },
  addModal: (modal: IModal) => set(prevState => ({
    modalsData: [...prevState.modalsData, modal]
  })),
  removeModal: (id: number) => set(prevState => {
    const modalsCopy = [...prevState.modalsData]
    const modalIndexToRemove = modalsCopy.findIndex(modal => id === modal.id)

    if (modalIndexToRemove === -1) return prevState

    modalsCopy.splice(modalIndexToRemove)

    return {
      modalsData: modalsCopy
    }
  }),
  clearAllModals: () => set({ modalsData: null })
}))
