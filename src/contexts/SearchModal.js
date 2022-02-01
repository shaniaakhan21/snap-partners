import React, { createContext, useReducer } from 'react'

export const TYPES = {
  SEARCH_MODAL_REFERRALS_UPDATE: 'SEARCH_MODAL_REFERRALS_UPDATE',
}

const REDUCER_ACTIONS = {
  [TYPES.SEARCH_MODAL_REFERRALS_UPDATE]: (state, action) => {
    return {
      ...state,
      referralsIsOpen: action.payload,
    }
  },
}

export const SearchModalContext = createContext({
  searchModalState: null,
  searchModalDispatch: null,
})

const initialState = { 
  referralsIsOpen: false,
}

const reducerFunction = (state, action) => {
  const reducerAction = REDUCER_ACTIONS[action.type]
  return reducerAction ? reducerAction(state, action) : state
}

export const SearchModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState)
  const searchModalContextValue = {
    searchModalState: state,
    searchModalDispatch: dispatch,
  }

  return (
    <SearchModalContext.Provider value={searchModalContextValue}>
      {children}
    </SearchModalContext.Provider>
  )
}