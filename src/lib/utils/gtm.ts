export const GTM_ID = {
  PRE: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID_PRE,
  PRO: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID_PRO
}

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}
