import { MouseEvent } from 'react'
import createAtom from 'zustand'
import { dashboardPathnames } from 'components/layout/Dashboard/Drawer/routes'

interface ISearchModalAtom {
  referralsIsOpen: boolean
  toggleReferral: (pathname: string) => void
  openReferral: () => void
  closeReferral: (e: MouseEvent<HTMLElement>, element: HTMLElement) => void
}

export const useSearchModalStore = createAtom<ISearchModalAtom>(set => ({
  referralsIsOpen: false,

  toggleReferral: (pathname: string) => {
    console.log('current pathname:', pathname)

    if (dashboardPathnames.referrals.pathname === pathname) {
      set(prevState => ({ referralsIsOpen: !prevState.referralsIsOpen }))
    }
  },

  openReferral: () => {
    document.body.style.overflowY = 'hidden'
    set({ referralsIsOpen: true })
  },

  closeReferral: (e: MouseEvent<HTMLElement>, element: HTMLElement) => {
    if (element === e.target) {
      document.body.style.overflowY = 'auto'
      set({ referralsIsOpen: false })
    }
  }
}))
