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
