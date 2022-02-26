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

export const marketingCard = (userType: string) => {
  window.dataLayer.push({
    category: 'MarketingCard',
    action: 'click',
    label: userType,
    step: 1
  })
}

export const marketingSharingCard = (name: string, socialMediaClicked: string) => {
  window.dataLayer.push({
    category: 'MarketingSharingCard',
    action: 'click',
    label: name,
    step: 2,
    shareType: socialMediaClicked
  })
}
