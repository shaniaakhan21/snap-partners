export const userLevelOptions = [
  {
    name: 'admin',
    value: 'admin'
  },
  {
    name: 'owner',
    value: 'owner'
  },
  {
    name: 'VP',
    value: 'VP'
  },
  {
    name: 'Accounting',
    value: 'accounting'
  },
  {
    name: 'Help Team Manager',
    value: 'helpTeamManager'
  },
  {
    name: 'Help Team',
    value: 'helpTeam'
  },
  {
    name: 'Snap Staff',
    value: 'snapStaff'
  },
  {
    name: 'IBO',
    value: 'ibo'
  },
  {
    name: 'Driver',
    value: 'driver'
  },
  {
    name: 'Merchant',
    value: 'merchant'
  },
  {
    name: 'Customer',
    value: 'customer'
  }
]

export const userLevelMapping = {
  100: 'customer',
  200: 'merchant',
  300: 'driver',
  400: 'ibo',
  500: 'snapStaff',
  600: 'helpTeam',
  700: 'helpTeamManager',
  800: 'accounting',
  900: 'VP',
  1000: 'owner',
  1100: 'admin'

}

export const userLevelReverseMapping = {
  customer: 100,
  merchant: 200,
  driver: 300,
  ibo: 400,
  snapStaff: 500,
  helpTeam: 600,
  helpTeamManager: 700,
  accounting: 800,
  VP: 900,
  owner: 1000,
  admin: 1100
}
