import React, { useContext } from 'react'
import { useStyles } from '../styles'
import { SearchIcon, NotificationIcon } from '../../../../components/icons'
import { ProfileDesktop } from './Profile'
import { SearchModalContext, TYPES } from '../../../../contexts/SearchModal'

export const NavbarDesktop = () => {
	const classes = useStyles()

	const { searchModalDispatch } = useContext(SearchModalContext)

	const handleClickSearch = () => {
		if (window.location.pathname.includes('referrals')) {
			document.body.style.overflowY = 'hidden'
			searchModalDispatch({ type: TYPES.SEARCH_MODAL_REFERRALS_UPDATE, payload: true })
		}
	}

	return (
		<header className={classes.navbar}>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<span className={classes.navbarTitle}>Dashboard</span>

				<button 
					style={{ 
						marginLeft: 16, 
						backgroundColor: 'transparent', 
						border: 'none',
						cursor: 'pointer'
					}} 
					onClick={handleClickSearch}
				>
					<SearchIcon />
				</button>

				{/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 16 }}>
					<SearchIcon />

					<input
						style={{ marginLeft: 6, border: 'none', padding: '4 6', marginTop: 2, '::-webkit-input-placeholder': { fontWeight: 700 } }}
						type='text'
						placeholder='Search'
					/>
				</div> */}
			</div>

			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ position: 'relative', marginTop: 8 }}>
					<NotificationIcon styles={{ cursor: 'pointer' }} />
					<div style={{
						position: 'absolute',
						top: -14,
						right: -18,
						height: 20,
						width: 20,
						backgroundColor: '#FF4343',
						borderRadius: 999,
						display: 'flex',
						justifyContent: 'center',
						items: 'center',
						paddingTop: 1,
						paddingLeft: 1
					}}>
						<span style={{ color: 'white', userSelect: 'none' }}>3</span>
					</div>
				</div>

				<ProfileDesktop />
			</div>
		</header>
	)
}
