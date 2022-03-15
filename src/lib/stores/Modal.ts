import { MouseEvent, ReactNode } from 'react'
import createAtom from 'zustand'

interface IModalWithoutId {
  isOpen: boolean
  modalChildren?: ReactNode
}

interface IModal extends IModalWithoutId {
  id: string
}

interface IModalAtom {
  modalsData: IModal[] | null
  openModal: (id: string, callbackOnOpen?: () => void) => void
  closeModal: (e: MouseEvent<HTMLElement>, elementRef: HTMLElement, id: string, callbackOnClose?: () => void) => void
  addModal: (modal: IModal) => void
  updateModal: (id: string, modal: IModalWithoutId) => void
  removeModal: (id: string) => void
  clearAllModals: () => void
}

export const MODALS_ID = {
  MODAL_FORGOT_PASSWORD_ID: 'FORGOT_PASSWORD'
}

export const useModalStore = createAtom<IModalAtom>(set => ({
  modalsData: null,
  openModal: (id: string, callbackOnOpen?: () => void) => {
    if (callbackOnOpen) callbackOnOpen()

    set(prevState => {
      const modal = prevState.modalsData?.find(modal => id === modal.id)
      if (!modal) return
      document.body.style.overflowY = 'hidden'
      modal.isOpen = true
    })
  },
  closeModal: (e: MouseEvent<HTMLElement>, elementRef: HTMLElement, id: string, callbackOnClose?: () => void) => {
    if (callbackOnClose) callbackOnClose()
    if (elementRef === e.target) {
      document.body.style.overflowY = 'auto'

      set(prevState => {
        const modal = prevState.modalsData?.find(modal => id === modal.id)
        if (!modal) return prevState
        modal.isOpen = false
      })
    }
  },
  addModal: (newModal: IModal) => set(prevState => ({
    modalsData: prevState.modalsData ? [...prevState.modalsData, newModal] : [newModal]
  })),
  updateModal: (id: string, modalNewData: IModalWithoutId) => {
    set(prevState => {
      const modalToUpdate = prevState.modalsData.find(modal => id === modal.id)
      if (!modalToUpdate) return
      modalToUpdate.isOpen = modalNewData.isOpen
      modalToUpdate.modalChildren = modalNewData.modalChildren
    })
  },
  removeModal: (id: string) => set(prevState => {
    const modalsCopy = [...prevState.modalsData]
    const modalIndexToRemove = modalsCopy.findIndex(modal => id === modal.id)

    if (modalIndexToRemove === -1) return prevState

    modalsCopy.splice(modalIndexToRemove)

    return { modalsData: modalsCopy }
  }),
  clearAllModals: () => set({ modalsData: null })
}))
