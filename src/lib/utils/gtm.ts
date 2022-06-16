import { IAuth } from 'lib/stores/Auth'
import { TROLE } from 'lib/types'

const STEP_SIGNUP_LABELS = {
  1: 'user information',
  2: 'register success',
  3: 'upgrade to manager interest'
}

export const GTM_ID = {
  PRE: 'GTM-PRJVWRJ',
  PRO: 'GTM-NNQS9S8'
}

const userInfo = (info?: Partial<IAuth>) => {
  window.dataLayer.push({
    event: 'userInfo',
    ...info,
    lastVisit: new Date().toDateString()
  })
}

const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}

const referralCard = (label: string, copyReferral: string, openMyGeneaology: string) => {
  window.dataLayer.push({
    event: 'ReferralCard',
    category: 'ReferralCard',
    action: 'click',
    label,
    copyReferral,
    openMyGeneaology
  })
}

const navbarPress = (label:string) => {
  window.dataLayer.push({
    event: 'sidebar',
    category: 'sidebar',
    action: 'click',
    label
  })
}

const downloadCompensationPlan = (fileName: string) => {
  window.dataLayer.push({
    event: 'Download Compensation Plan',
    category: 'Download Compensation Plan',
    action: 'click',
    label: fileName
  })
}

const changeCompensationPlanPage = (currentPage: number) => {
  window.dataLayer.push({
    event: 'View Compensation Plan',
    category: 'View Compensation Plan',
    action: 'slide',
    page: currentPage
  })
}

const marketingCard = (userType: string) => {
  window.dataLayer.push({
    event: 'MarketingCard',
    category: 'MarketingCard',
    action: 'click',
    label: userType,
    step: 1
  })
}

const marketingSharingCard = (name: string, socialMediaClicked: string, downloadImg) => {
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

const signUp = (userType: TROLE, step?: number, upgradeToManager?: 'yes' | 'no', accountSettings?: 'yes' | 'no') => {
  window.dataLayer.push({
    event: 'signup',
    category: step ? 'signupProcess' : 'signup user type',
    action: 'click',
    label: step ? `user type ${userType}` : STEP_SIGNUP_LABELS[step],
    ...(step ? { step, userType } : {}),
    ...(step === 3 ? { upgradeToManager, accountSettings } : {})
  })
}

const downloadMobileApp = (store: 'android' | 'ios') => {
  window.dataLayer.push({
    event: 'app download',
    category: 'app download',
    action: 'download',
    label: `${store} app interest`
  })
}

const logIn = (userType: TROLE, loginType: 'phone' | 'email' | 'username', interested: boolean) => {
  window.dataLayer.push({
    event: 'login',
    category: 'login process',
    action: interested ? 'click' : 'login',
    label: interested ? `user type ${userType} interest` : `user type ${userType}`,
    loginType
  })
}

const upgradeToManager = (isUpgradeToManagerPage: boolean) => {
  window.dataLayer.push({
    category: 'upgrade to Manager',
    action: 'click',
    label: isUpgradeToManagerPage ? 'Upgrade interest' : 'Upgrade interest from Profile',
    event: 'upgrade to manager'
  })
}

const editProfile = (editType: string) => {
  window.dataLayer.push({
    category: 'profile edit',
    action: 'click',
    label: editType,
    event: 'profile edit'
  })
}

const myPoints = () => {
  window.dataLayer.push({
    category: 'my points',
    action: 'click',
    label: 'register now',
    event: 'my points'
  })
}

const trainingVideo = (section: string, videoTitle: string) => {
  window.dataLayer.push({
    category: 'training',
    action: 'click',
    label: videoTitle,
    event: 'training',
    section
  })
}

export const GTMTrack = {
  changeCompensationPlanPage,
  downloadCompensationPlan,
  downloadMobileApp,
  editProfile,
  marketingCard,
  marketingSharingCard,
  myPoints,
  navbarPress,
  logIn,
  pageview,
  referralCard,
  signUp,
  trainingVideo,
  upgradeToManager,
  userInfo
}
