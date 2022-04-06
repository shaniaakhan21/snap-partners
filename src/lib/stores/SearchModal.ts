import { MouseEvent } from 'react'
import createAtom from 'zustand'
import { dashboardPathnames } from 'components/layout/private/Dashboard/Drawer/routes'

interface ISearchModalAtom {
  genealogySearchIsOpen: boolean
  toggleGenealogySearch: (pathname: string) => void
  openGenealogySearch: () => void
  closeGenealogySearch: (e: MouseEvent<HTMLElement>, element: HTMLElement) => void
}

export const useSearchModalStore = createAtom<ISearchModalAtom>(set => ({
  genealogySearchIsOpen: false,

  toggleGenealogySearch: (pathname: string) => {
    if (dashboardPathnames.genealogy.pathname === pathname) {
      set(prevState => ({ genealogySearchIsOpen: !prevState.genealogySearchIsOpen }))
    }
  },

  openGenealogySearch: () => {
    document.body.style.overflowY = 'hidden'
    set({ genealogySearchIsOpen: true })
  },

  closeGenealogySearch: (e: MouseEvent<HTMLElement>, element: HTMLElement) => {
    if (element === e.target) {
      document.body.style.overflowY = 'auto'
      set({ genealogySearchIsOpen: false })
    }
  }
}))
