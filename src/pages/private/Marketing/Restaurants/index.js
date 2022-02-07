import React from 'react'
import { useLocation } from 'react-router-dom'
import { FacebookIcon, TwitterIcon, ShareRRSSIcon, ShareIcon, LinkedinIcon, GoogleIcon } from '../../../../components/icons'
import { useStyles } from './styles'

export const RestaurantsPage = () => {
	const location = useLocation()
	const classes = useStyles()

	const { current: articles } = React.useRef([
		{
			imageSrc: '/svg/logo.svg',
			title: 'Name of the image',
			subtitle: 'Subtitle text here',
			description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
			hashtags: ['#hashtags', '#here'],
			linkToShare: location.hash
		},
		{
			imageSrc: '/svg/logo.svg',
			title: 'Name of the image',
			subtitle: 'Subtitle text here',
			description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
			hashtags: ['#hashtags', '#here'],
			linkToShare: location.hash
		},
		{
			imageSrc: '/svg/logo.svg',
			title: 'Name of the image',
			subtitle: 'Subtitle text here',
			description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
			hashtags: ['#hashtags', '#here'],
			linkToShare: location.hash
		},
		{
			imageSrc: '/svg/logo.svg',
			title: 'Name of the image',
			subtitle: 'Subtitle text here',
			description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
			hashtags: ['#hashtags', '#here'],
			linkToShare: location.hash
		},
		{
			imageSrc: '/svg/logo.svg',
			title: 'Name of the image',
			subtitle: 'Subtitle text here',
			description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
			hashtags: ['#hashtags', '#here'],
			linkToShare: location.hash
		},
		{
			imageSrc: '/svg/logo.svg',
			title: 'Name of the image',
			subtitle: 'Subtitle text here',
			description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
			hashtags: ['#hashtags', '#here'],
			linkToShare: location.hash
		}
	])

	return (
		<div className={classes.container}>
			<div style={{ textAlign: 'center' }}>
				<h4 style={{ fontSize: 36, fontWeight: 700, margin: 0 }}>Restaurants</h4>
				<br/>
				<span style={{ color: '#E35C49', fontSize: 26, fontWeight: 700 }}>Building your Business with a Few Clicks</span>
				<div style={{ marginTop: 24 }}>
					<span style={{ color: '#404040', fontWeight: 600, marginTop: 24 }}>Now choose the arts you want to share</span>
				</div>
			</div>

			<div className={classes.container_contentArticles}>
				<div className={classes.container_cards}>
					{
						articles.map((article, idx) => (
							<div key={article.title} className={classes.cards}>
								<div style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 16, width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
									<div style={{ borderRadius: 999, height: 20, width: 20, backgroundColor: '#19191929', border: '0.5px solid #9D9D9D', marginRight: 8 }}></div>
									<span>Select art</span>
								</div>

								<div style={{ width: '100%', height: 0.5, borderBottom: '4px solid #FF998B' }}></div>

								<img src={article.imageSrc} style={{ padding: '0 12px' }} />

								<div style={{ width: '100%', height: 0.5, borderBottom: '1px solid #D6D6D6' }}></div>

								<div style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 16, paddingTop: 16, width: '100%' }}>
									<span style={{ color: '#1C1C1C', fontWeight: 700, fontSize: 18 }}>{article.title}</span>
									<br/>
									<span>{article.subtitle}</span>
								</div>

								<div style={{ width: '100%', height: 0.5, borderBottom: '1px solid #D6D6D6' }}></div>

								<div style={{ padding: '16px 24px' }}>
									<p style={{ fontWeight: 400 }}>{article.description}</p>
								</div>

								<div style={{ width: '100%', height: 0.5, borderBottom: '1px solid #D6D6D6' }}></div>

								<div style={{ padding: '16px 24px', textAlign: 'left', width: '100%' }}>
									{
										article.hashtags.map(hashtag => (
											<span key={hashtag} style={{ color: '#1C1C1C', fontSize: 12 }}>{hashtag}{' '}</span>
										))
									}
								</div>

								<div style={{ width: '100%', height: 0.5, borderBottom: '1px solid #D6D6D6' }}></div>

								<div style={{ width: '100%', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<a href='#' target='_blank' rel='noopener noreferrer'>
										<ShareRRSSIcon />
									</a>

									<a href='#' target='_blank' rel='noopener noreferrer'>
										<GoogleIcon />
									</a>

									<a href='#' target='_blank' rel='noopener noreferrer'>
										<ShareIcon />
									</a>

									<a href='#' target='_blank' rel='noopener noreferrer'>
										<FacebookIcon />
									</a>

									<a href='#' target='_blank' rel='noopener noreferrer'>
										<LinkedinIcon />
									</a>

									<a href='#' target='_blank' rel='noopener noreferrer'>
										<TwitterIcon />
									</a>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}
