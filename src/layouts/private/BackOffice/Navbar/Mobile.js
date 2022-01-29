import React from 'react'
import { ProfileMobile } from './Profile'
import { SearchIcon, MoarOptionsVerticalIcon } from '../../../../components/icons'
import { DrawerContext } from '../../../../contexts/Drawer'
import { SearchModalContext, TYPES } from '../../../../contexts/SearchModal'
import { useStyles } from '../styles'

export const NavbarMobile = () => {
	const classes = useStyles()
	const { drawer, drawerDispatch } = React.useContext(DrawerContext)
	const { searchModalDispatch } = React.useContext(SearchModalContext)

	const handleClickButtonNavbar = () => {
		document.body.style.overflowY = drawer ? 'auto' : 'hidden'
		drawerDispatch(prevState => !prevState)
	}

	const handleClickSearch = () => {
		if (window.location.pathname.includes('referrals')) {
			document.body.style.overflowY = 'hidden'
			searchModalDispatch({ type: TYPES.SEARCH_MODAL_REFERRALS_UPDATE, payload: true })
		}
	}

	return (
		<header className={classes.navbarMobile} >
			<div style={{ marginTop: 4 }}>
				<MoarOptionsVerticalIcon onClick={handleClickButtonNavbar} />
			</div>

			<div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
				<button 
					style={{ 
						marginLeft: 4, 
						backgroundColor: 'transparent', 
						border: 'none',
						cursor: 'pointer'
					}} 
					onClick={handleClickSearch}
				>
					<SearchIcon />
				</button>
			</div>

			{/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 4 }}>
					<SearchIcon />

					<input
						style={{
							marginLeft: 6,
							border: 'none',
							padding: '4px',
							marginTop: 2,
							width: 124,
							'::-webkit-input-placeholder': { fontWeight: 700 }
						}}
						type='text'
						placeholder='Search'
					/>
				</div>
			</div> */}

			<div style={{ marginLeft: 36, display: 'flex', alignItems: 'center' }}>
				<ProfileMobile />
			</div>
		</header>
	)
}
