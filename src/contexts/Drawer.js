import React from 'react'

export const DrawerContext = React.createContext({
	drawer: false,
	drawerDispatch: () => {}
})

// eslint-disable-next-line react/prop-types
export const DrawerProvider = ({ children }) => {
	const [show, drawerDispatch] = React.useState(false)
	const drawerContextValue = { drawer: show, drawerDispatch }

	return (
		<DrawerContext.Provider value={drawerContextValue}>
			{children}
		</DrawerContext.Provider>
	)
}
