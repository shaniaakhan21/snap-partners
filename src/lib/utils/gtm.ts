export const GTM_ID = {
  PRE: 'GTM-PRJVWRJ',
  PRO: 'GTM-NNQS9S8'
}

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}

export const navbarPress = (label:string) => {
  window.dataLayer.push({
    category: 'sidebar',
    action: 'click',
    label
  })
}
