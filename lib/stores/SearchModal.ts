import createAtom from 'zustand'

interface ISearchModalAtom {
  referralsIsOpen: boolean
  setReferralIsOpen: (value: boolean) => void
}

export const useSearchModalStore = createAtom<ISearchModalAtom>(set => ({
  referralsIsOpen: false,
  setReferralIsOpen: (newValue: boolean) => set({ referralsIsOpen: newValue })
}))
