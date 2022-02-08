import { MouseEvent } from 'react'
import createAtom from 'zustand'
import { dashboardPathnames } from 'lib/utils/dashboardPathnames'

interface ISearchModalAtom {
  referralsIsOpen: boolean
  toggleReferral: (pathname: string) => void
  openReferral: () => void
  closeReferral: (e: MouseEvent<HTMLElement>, element: HTMLElement) => void
}

export const useSearchModalStore = createAtom<ISearchModalAtom>(set => ({
  referralsIsOpen: false,

  toggleReferral: (pathname: string) => {
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
