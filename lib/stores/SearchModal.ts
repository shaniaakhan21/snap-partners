import { MouseEvent } from 'react'
import createAtom from 'zustand'

const pathnamesToSearch = {
  dashboard: '/dashboard',
  referrals: '/dashboard/referrals',
  marketing: '/dashboard/marketing',
  genealogy: '/dashboard/genealogy'
}

interface ISearchModalAtom {
  referralsIsOpen: boolean
  toggleReferral: (pathname: string) => void
  openReferral: () => void
  closeReferral: (e: MouseEvent<HTMLElement>, element: HTMLElement) => void
}

export const useSearchModalStore = createAtom<ISearchModalAtom>(set => ({
  referralsIsOpen: false,

  toggleReferral: (pathname: string) => {
    if (pathname.includes(pathnamesToSearch.referrals)) {
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
