import createAtom from 'zustand'

interface ILayoutConfigAtom {
  genealogy: {
    isNewGenealogy: boolean
    toggleTypeGenealogy: () => void
  }
}

export const useLayoutConfig = createAtom<ILayoutConfigAtom>(set => ({
  genealogy: {
    isNewGenealogy: true,

    toggleTypeGenealogy: () => set(prevState => ({
      genealogy: {
        ...prevState.genealogy,
        isNewGenealogy: !prevState.genealogy.isNewGenealogy
      }
    }))
  }
}))
