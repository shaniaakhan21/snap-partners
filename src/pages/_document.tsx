import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GTM_ID } from 'lib/utils/gtm'
import { APP_INFO } from 'config/appInfo'

const { SEO, RRSS } = APP_INFO

export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='title' content={SEO.TITLE_PAGE} />
          <meta name='description' content={SEO.DESCRIPTION_PAGE} />
          <meta name='keywords' content={SEO.KEYWORDS_PAGE.join(', ')} />
          <meta name='author' content={SEO.AUTHOR} />
          <meta name='copyright' content={SEO.AUTHOR} />
          <meta name='robots' content='index' />
          <meta name='robots' content='follow' />
          <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />

          <meta name='application-name' content={SEO.TITLE_PAGE} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={SEO.TITLE_PAGE} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          {/* <meta name='msapplication-config' content='/static/icons/browserconfig.xml' /> */}
          <meta name='msapplication-TileColor' content='#DD4C37' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#DD4C37' />

          {/* <link rel='apple-touch-icon' href='/static/icons/touch-icon-iphone.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/static/icons/touch-icon-ipad.png' />
        <link rel='apple-touch-icon' sizes='167x167' href='/static/icons/touch-icon-ipad-retina.png' /> */}
          <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-touch-icon.png' />

          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png' />
          <link rel='manifest' href='/static/site.webmanifest' />
          {/* <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#DD4C37' /> */}
          <link rel='shortcut icon' href='/static/favicon.ico' />

          <meta name='twitter:image:alt' content={SEO.TITLE_PAGE} />
          <meta name='twitter:creator' content={RRSS.TWITTER.USERNAME} />
          <meta property='twitter:card' content='summary_large_image' />
          <meta property='twitter:url' content={SEO.URL_PAGE} />
          <meta property='twitter:title' content={SEO.TITLE_PAGE} />
          <meta property='twitter:description' content={SEO.DESCRIPTION_PAGE} />
          <meta property='twitter:image:alt' content={SEO.TITLE_PAGE} />
          <meta property='twitter:image' content={`${SEO.URL_PAGE}/images/logo-full-232px.png`} />

          <meta property='og:site_name' content={SEO.TITLE_PAGE} />
          <meta property='og:type' content='website' />
          <meta property='og:url' content={SEO.URL_PAGE} />
          <meta property='og:title' content={SEO.TITLE_PAGE} />
          <meta property='og:description' content={SEO.DESCRIPTION_PAGE} />
          <meta property='og:image' content={`${SEO.URL_PAGE}/images/logo-full-232px.png`} />

          {/* <!-- apple splash screen images --> */}
          {/* <link rel='apple-touch-startup-image' href='/static/images/apple_splash_2048.png' sizes='2048x2732' />
          <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1668.png' sizes='1668x2224' />
          <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1536.png' sizes='1536x2048' />
          <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1125.png' sizes='1125x2436' />
          <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1242.png' sizes='1242x2208' />
          <link rel='apple-touch-startup-image' href='/static/images/apple_splash_750.png' sizes='750x1334' />
          <link rel='apple-touch-startup-image' href='/static/images/apple_splash_640.png' sizes='640x1136' /> */}

          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='*' />
          <link href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Ubuntu:ital,wght@0,300;0,400;1,300;1,400;1,500;1,700&display=swap' rel='stylesheet' />
          <link rel='icon' href='/static/favicon.ico' />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${
                typeof document !== 'undefined' && document.location.hostname === 'snapdeliveredteam.com'
                  ? GTM_ID.PRO
                  : GTM_ID.PRE
              }`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
