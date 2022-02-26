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

export const referralCard = (label: string, copyReferral: string, openMyGeneaology: string) => {
  window.dataLayer.push({
    category: 'ReferralCard',
    action: 'click',
    label,
    copyReferral,
    openMyGeneaology
  })
}
