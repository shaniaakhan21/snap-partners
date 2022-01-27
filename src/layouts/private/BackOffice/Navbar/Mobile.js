import React from 'react'
import { useStyles } from '../styles'
import { SearchIcon, MoarOptionsVerticalIcon } from '../../../../components/icons'
import { ProfileMobile } from './Profile'
import { DrawerContext } from '../../../../contexts/Drawer'

export const NavbarMobile = () => {
	const classes = useStyles()
	const { drawerDispatch } = React.useContext(DrawerContext)

	return (
		<header className={classes.navbarMobile} >
			<div style={{ marginTop: 4 }}>
				<MoarOptionsVerticalIcon onClick={() => drawerDispatch(prevState => !prevState)} />
			</div>

			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
			</div>

			<div style={{ marginLeft: 36, display: 'flex', alignItems: 'center' }}>
				<ProfileMobile />
			</div>
		</header>
	)
}
