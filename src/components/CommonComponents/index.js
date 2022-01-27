import React from 'react'
import { Footer } from '../index'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

// REVISAR SI ESTE COMPONENTE ES NECESARIO
const CommonComponents = ({ children, topNav = true, sidebar = false, footer = true }) => {
	return (
		<>
			<Helmet>
				<link rel='icon' href='/svg/favicon.svg' type='image/x-icon' />
			</Helmet>

			<div>
				<div style={{ display: 'flex' }}>
					<div style={{ width: '100%' }}>
						<div style={{ width: '100%' }}>
							{children}
						</div>
					</div>
				</div>
			</div>
			{ Footer && <Footer /> }
		</>
	)
}

CommonComponents.propTypes = {
	children: PropTypes.any,
	topNav: PropTypes.bool,
	botNav: PropTypes.bool,
	banner: PropTypes.bool,
	conferenceBanner: PropTypes.bool,
	sidebar: PropTypes.bool,
	footer: PropTypes.bool
}

export default CommonComponents
