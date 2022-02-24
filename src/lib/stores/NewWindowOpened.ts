import createAtom from 'zustand'

interface INewWindowOpenedAtom {
  newWindow: Window | null
  setNewWindow: (newWindow: Window) => void
  closeNewWindow: () => void
}

export const useNewWindowOpenedStore = createAtom<INewWindowOpenedAtom>(set => ({
  newWindow: null,
  setNewWindow: (newWindow: Window) => set({ newWindow }),
  closeNewWindow: () => set((prevState) => {
    prevState.newWindow?.close()

    return { newWindow: null }
  })
}))
