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

export const navbarPress = (label:string) => {
  window.dataLayer.push({
    category: 'sidebar',
    action: 'click',
    label
  })
}

export const downloadCompensationPlan = (fileName: string) => {
  window.dataLayer.push({
    category: 'Download Compensation Plan',
    action: 'click',
    label: fileName
  })
}

export const compensationPlanPageChange = (currentPage: number) => {
  window.dataLayer.push({
    category: 'View Compensation Plan',
    action: 'slide',
    page: currentPage
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
