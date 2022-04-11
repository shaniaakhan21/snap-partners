export interface IROLES {
  CUSTOMER: 'CUSTOMER',
  MERCHANT: 'MERCHANT',
  DRIVER: 'DRIVER',
  ADMIN: 'ADMIN'
}

export type TROLE =
  IROLES['CUSTOMER'] |
  IROLES['MERCHANT'] |
  IROLES['DRIVER'] |
  IROLES['ADMIN']