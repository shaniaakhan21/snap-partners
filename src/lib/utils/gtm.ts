import { IAuth } from 'lib/stores/Auth'
import { TROLE } from 'lib/types'

export const GTM_ID = {
  PRE: 'GTM-PRJVWRJ',
  PRO: 'GTM-NNQS9S8'
}

export const userInfo = (info?: Partial<IAuth>) => {
  window.dataLayer.push({
    event: 'userInfo',
    ...info,
    lastVisit: new Date().toDateString()
  })
}

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}

export const referralCard = (label: string, copyReferral: string, openMyGeneaology: string) => {
  window.dataLayer.push({
    event: 'ReferralCard',
    category: 'ReferralCard',
    action: 'click',
    label,
    copyReferral,
    openMyGeneaology
  })
}

export const navbarPress = (label:string) => {
  window.dataLayer.push({
    event: 'sidebar',
    category: 'sidebar',
    action: 'click',
    label
  })
}

export const downloadCompensationPlan = (fileName: string) => {
  window.dataLayer.push({
    event: 'Download Compensation Plan',
    category: 'Download Compensation Plan',
    action: 'click',
    label: fileName
  })
}

export const compensationPlanPageChange = (currentPage: number) => {
  window.dataLayer.push({
    event: 'View Compensation Plan',
    category: 'View Compensation Plan',
    action: 'slide',
    page: currentPage
  })
}

export const marketingCard = (userType: string) => {
  window.dataLayer.push({
    event: 'MarketingCard',
    category: 'MarketingCard',
    action: 'click',
    label: userType,
    step: 1
  })
}

export const marketingSharingCard = (name: string, socialMediaClicked: string, downloadImg) => {
  window.dataLayer.push({
    event: 'MarketingSharingCard',
    category: 'MarketingSharingCard',
    action: 'click',
    label: name,
    step: 2,
    shareType: socialMediaClicked,
    downloadImg
  })
}

export const signUp = (userType: TROLE, step: number, app?: 'android' | 'ios', upgradeToManager?: 'yes' | 'no', accountSettings?: 'yes' | 'no') => {
  window.dataLayer.push({
    event: 'signup',
    category: 'signupProcess',
    action: 'click',
    label: userType,
    step,
    ...(step === 3 ? { appDownloaded: app } : {}),
    ...(step === 4 ? { upgradeToManager } : {}),
    ...(step === 4 ? { accountSettings } : {})
  })
}

export const upgradeToManagerGTM = (isUpgradeToManagerPage) => {
  window.dataLayer.push({
    category: 'upgrade to Manager',
    action: 'click',
    label: isUpgradeToManagerPage ? 'Upgrade interest' : 'Upgrade interest from Profile'
  })
}
