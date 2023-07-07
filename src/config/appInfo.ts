export const APP_INFO = {
  SEO: {
    AUTHOR: 'Snap Partners',
    TITLE_PAGE: 'Delivering what matters most',
    DESCRIPTION_PAGE: '… In a SNAP!',
    URL_PAGE: 'https://snap263.snap.devopsteam.info',
    KEYWORDS_PAGE: [
      'Snap Partners',
      'Snap Partners'
    ]
  },

  LEGAL: {
    PRIVACY_POLICY: { to: '/legal/privacy-policy', label: 'Privacy Policy' },
    TERMS_OF_USE: { to: '/legal/terms-of-use', label: 'Terms & Conditions' }
  },

  RRSS: {
    TWITTER: {
      USERNAME: '@SnapDBlog'
    },
    FACEBOOK: {
      link: 'https://www.facebook.com/snapdelivered'
    },
    YOUTUBE: {
      link: 'https://www.youtube.com/channel/UC7zzJ0gaX5QrE8lPqG_Lr1w'
    }
  },

  USER_BADGES: {
    referralPartner: {
      key: 'referralPartner',
      label: 'Referral Partner',
      ROLES: {
        CUSTOMER: '/static/badges/FreeMemberCustomer.png',
        DRIVER: '/static/badges/FreeMemberDriver.png',
        MERCHANT: '/static/badges/FreeMemberMerchant.png'
      }
    },

    manager: {
      key: 'manager',
      label: 'Manager',
      ROLES: {
        CUSTOMER: '/static/badges/ManagerCustomer.png',
        DRIVER: '/static/badges/ManagerDriver.png',
        MERCHANT: '/static/badges/ManagerMerchant.png'
      }
    },

    supervisor: {
      key: 'supervisor',
      label: 'Supervisor',
      ROLES: {
        CUSTOMER: '/static/badges/SupervisorCustomer.png',
        DRIVER: '/static/badges/SupervisorDriver.png',
        MERCHANT: '/static/badges/SupervisorMerchant.png'
      }
    },

    director: {
      key: 'director',
      label: 'Director',
      ROLES: {
        CUSTOMER: '/static/badges/DirectorCustomer.png',
        DRIVER: '/static/badges/DirectorDriver.png',
        MERCHANT: '/static/badges/DirectorMerchant.png'
      }
    },

    executive: {
      key: 'executive',
      label: 'Executive',
      ROLES: {
        CUSTOMER: '/static/badges/ExecutiveCustomer.png',
        DRIVER: '/static/badges/ExecutiveDriver.png',
        MERCHANT: '/static/badges/ExecutiveMerchant.png'
      }
    }
  },

  APPS: {
    APPLE_STORE: {
      DRIVER_APP: {
        title: 'Driver app',
        subtitle: 'Snap Operations Specialist app',
        description: 'Fullfil and Manage orders and',
        link: 'https://apps.apple.com/us/app/snap-operations-specialist/id1478862279'
      },

      CUSTOMER_APP: {
        title: 'Customer app',
        subtitle: 'User app',
        description: 'Order food and get it SNAP',
        link: 'https://apps.apple.com/us/app/snap-user/id1478863057'
      },

      MERCHANT_APP: {
        title: 'Merchant app',
        subtitle: 'Snap Merchant Control app',
        description: 'Manager orders and payments',
        link: 'https://apps.apple.com/ve/app/snap-merchant-control/id1478737288'
      }
    },

    ANDROID_STORE: {
      DRIVER_APP: {
        title: 'Driver app',
        subtitle: 'Snap Operations Specialist app',
        description: 'Fullfil and Manage orders and',
        link: 'https://play.google.com/store/apps/details?id=com.snapdelivered.driverapp'
      },

      CUSTOMER_APP: {
        title: 'Customer app',
        subtitle: 'User app',
        description: 'Order food and get it SNAP',
        link: 'https://play.google.com/store/apps/details?id=com.snapdelivered.userapp'
      },

      MERCHANT_APP: {
        title: 'Merchant app',
        subtitle: 'Snap Merchant Control app',
        description: 'Manager orders and payments',
        link: 'https://play.google.com/store/apps/details?id=com.snapdelivered.restaurantapp'
      }
    }
  }
}
