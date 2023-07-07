// This will be the API response format for Rank Component
export const data = {
  fm: {
    pvc: {
      value: 100,
      percentage: 17
    }
  },
  mng: {
    commissionVol: 60,
    PSMRatio: '2/3',
    PSMPercentage: 70,
    workingLegs: {
      one: { rate: 2500, percentage: 100 },
      two: { rate: 1200, percentage: 30 },
      three: { rate: 1200, percentage: 30 }
    },
    gv: {
      value: 3500,
      percentage: 70
    }
  },
  sv: {
    commissionVol: 70,
    PSMRatio: '2/4',
    PSMPercentage: 50,
    workingLegs: {
      one: { rate: 2500, percentage: 100 },
      two: { rate: 1200, percentage: 30 },
      three: { rate: 1200, percentage: 30 },
      four: { rate: 1200, percentage: 30 }
    },
    gv: {
      value: 3500,
      percentage: 70
    }
  },
  dct: {
    commissionVol: 70,
    PSMRatio: '2/4',
    PSMPercentage: 50,
    workingLegs: {
      one: { rate: 2500, percentage: 100 },
      two: { rate: 1200, percentage: 30 },
      three: { rate: 1200, percentage: 30 },
      four: { rate: 1200, percentage: 30 },
      five: { rate: 1200, percentage: 30 }
    },
    gv: {
      value: 3500,
      percentage: 70
    }
  },
  exec: {
    commissionVol: 70,
    PSMRatio: '2/4',
    PSMPercentage: 50,
    workingLegs: {
      one: { rate: 2500, percentage: 100 },
      two: { rate: 1200, percentage: 30 },
      three: { rate: 1200, percentage: 30 },
      four: { rate: 1200, percentage: 30 },
      five: { rate: 1200, percentage: 30 }
    },
    gv: {
      value: 3500,
      percentage: 70
    }
  }
}

// This will be the API response for monthly subscription
export const monthlySubscriptionData = {
  customers: {
    new: 20,
    total: 8823
  },
  drivers: {
    new: 20,
    total: 4546
  },
  merchants: {
    new: 20,
    total: 682
  },
  vidgo: {
    new: 20,
    total: 34
  },
  erc: {
    new: 20,
    total: 34
  }
}

// This will be the API response for monthly production
export const monthlyProductionData = {
  customers: {
    new: 20,
    total: 8823
  },
  drivers: {
    new: 20,
    total: 4546
  },
  merchants: {
    new: 20,
    total: 682
  },
  vidgo: {
    new: 20,
    total: 34
  },
  erc: {
    new: 20,
    total: 34
  }
}

// This will be the API response for monthly production
export const teamCommission = [
  { level: '1 Tier', riders: '2', restaurantOrders: '2', clientOrders: '10', erc: '0', vidgo: '5' },
  { level: '2 Tier', riders: '5', restaurantOrders: '2', clientOrders: '12', erc: '0', vidgo: '5' },
  { level: '5 Tier', riders: '3', restaurantOrders: '2', clientOrders: '10', erc: '0', vidgo: '5' }
]

// This will be the API response format for certification
export const certification = [
  {
    title: 'ERC TRAINING MODULES',
    description: 'Step 1',
    imageURL: 'https://snapdeliveredteam.com/images/1v1.png',
    redirectUrl: 'https://jorns.smartstudenthub.com/ERC/Register'
  },
  {
    title: 'ERC CERTIFICATION EXAM',
    description: 'Step 2',
    imageURL: 'https://snapdeliveredteam.com/images/2.png',
    redirectUrl: 'https://snapfinancialcertified.com/'
  }
]

// This will be the API response for top producers
export const topProducers = {
  ibo: {
    personal: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }, {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    manager: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    supervisor: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    director: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    executive: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ]
  },
  erc: {
    personal: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    manager: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    supervisor: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    director: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    executive: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ]
  },
  delivery: {
    personal: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    manager: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    supervisor: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    director: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    executive: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ]
  },
  vidgo: {
    personal: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    manager: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    supervisor: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    director: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    executive: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ]
  },
  products: {
    personal: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    manager: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    supervisor: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    director: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ],
    executive: [
      // {
      //   name: 'Cameron Williamson',
      //   noOfCustomers: '3',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // },
      // {
      //   name: 'Sam Williamson',
      //   noOfCustomers: '4',
      //   profileImage: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
      // }
    ]
  }
}

// This will be the API response for Events
export const events = [
  {
    img: 'https://snapdeliveredteam.com/images/leadershipcertv1.png',
    title: 'Leadership Certification Conference',
    description: 'July 21st - 23rd, 2023',
    redirectUrl: 'https://snapseminars.com/'
  },
  {
    img: 'https://snapdeliveredteam.com/images/leadershipcertv1.png',
    title: 'Leadership Certification Conference',
    description: 'July 21st - 23rd, 2023',
    redirectUrl: 'https://snapseminars.com/'
  }
]
