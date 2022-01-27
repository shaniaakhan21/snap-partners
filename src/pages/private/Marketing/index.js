import React from 'react'
import { DriverIcon, RestaurantsIcon, IBOIcon, CustomerIcon } from '../../../components/icons'
import { useStyles } from './styles'
import { Link } from 'react-router-dom'

export const MarketingPage = () => {
	const { current: marketingDetails } = React.useRef([
		{
			icon: <CustomerIcon />,
			title: 'Customer',
			subtitle: 'Subtitle text here',
			description: 'Select an image and share the link in the different social networks to get new Customers!',
			to: '/marketing/customers'
		},
		{
			icon: <DriverIcon />,
			title: 'Driver',
			subtitle: 'Subtitle text here',
			description: 'Select an image and share the link in the different social networks to get new Drivers On Board',
			to: '/marketing/drivers'
		},
		{
			icon: <RestaurantsIcon />,
			title: 'Restaurants',
			subtitle: 'Subtitle text here',
			description: 'Select an image and share the link in the different social networks to get new Restaurant Partners',
			to: '/marketing/restaurants'
		},
		{
			icon: <IBOIcon />,
			title: 'IBO',
			subtitle: 'Subtitle text here',
			description: 'Select an image and share the link in the different social networks to get new Business partners',
			to: '/marketing/ibo'
		}
	])
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div style={{ textAlign: 'center' }}>
				<h4 style={{ fontSize: 36, fontWeight: 700, margin: 0 }}>Marketing Tools</h4>
				<br/>
				<span style={{ color: '#E35C49', fontSize: 26, fontWeight: 700 }}>Building your Business with a Few Clicks</span>
				<div style={{ marginTop: 24 }}>
					<span style={{ color: '#404040', fontWeight: 600, marginTop: 24 }}>Send Branded Campaings with our system, let’s start by clicking who you want to reach out</span>
				</div>
			</div>

			<div className={classes.container_cards}>
				{
					marketingDetails.map((detail, idx) => (
						<div key={detail.title} className={classes.cards}>
							<div id='asd' style={{ backgroundColor: '#FF998B', height: 4, width: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '4px 4px 0px 0px' }}></div>

							<div style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 16, width: '100%' }}>
								<span style={{ color: '#1C1C1C', fontWeight: 700, fontSize: 18 }}>{detail.title}</span>
								<br/>
								<span>{detail.subtitle}</span>
							</div>
							<div style={{ width: '100%', height: 0.5, backgroundColor: '#eee', marginBottom: 9 }}></div>
							{detail.icon}
							<br/>
							<div style={{ padding: '0px 24px' }}>
								<p style={{ fontWeight: 400 }}>{detail.description}</p>
							</div>
							<div style={{ width: '100%', height: 0.5, backgroundColor: '#eee' }}></div>
							<br/>
							<Link to={detail.to} style={{ color: 'white', textDecoration: 'none', backgroundColor: '#DD4C37', padding: '12px 18px', fontWeight: 700, borderRadius: '24px', border: 'none' }}>
                SEE MORE
							</Link>
						</div>
					))
				}
			</div>
		</div>
	)
}
