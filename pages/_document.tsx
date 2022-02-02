import Document, { Html, Head, Main, NextScript } from 'next/document'
import { config } from 'config'

const { PAGE_INFO: { SEO, RRSS } } = config

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
          <link rel='apple-touch-icon' sizes='180x180' href='/static/icons/touch-icon-iphone-retina.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/static/icons/touch-icon-ipad-retina.png' />

          <link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' />
          <link rel='manifest' href='/static/manifest.json' />
          <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#DD4C37' /> */}
          <link rel='shortcut icon' href='/static/favicon.ico' />

          <meta name='twitter:image:alt' content={SEO.TITLE_PAGE} />
          <meta name='twitter:creator' content={RRSS.TWITTER.USERNAME} />
          <meta property='twitter:card' content='summary_large_image' />
          <meta property='twitter:url' content={SEO.URL_PAGE} />
          <meta property='twitter:title' content={SEO.TITLE_PAGE} />
          <meta property='twitter:description' content={SEO.DESCRIPTION_PAGE} />
          <meta property='twitter:image:alt' content={SEO.TITLE_PAGE} />
          {/* <meta property='twitter:image' content={`${SEO.URL_PAGE}/img/snap-public.png`} /> */}

          <meta property='og:site_name' content={SEO.TITLE_PAGE} />
          <meta property='og:type' content='website' />
          <meta property='og:url' content={SEO.URL_PAGE} />
          <meta property='og:title' content={SEO.TITLE_PAGE} />
          <meta property='og:description' content={SEO.DESCRIPTION_PAGE} />
          {/* <meta property='og:image' content={`${SEO.URL_PAGE}/img/snap-public.png`} /> */}

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
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
