export interface IROLES {
  CUSTOMER: 'CUSTOMER',
  MERCHANT: 'MERCHANT',
  DRIVER: 'DRIVER',
  AGENT: 'AGENT',
  ADMIN: 'ADMIN',
  integrousCustomer: 'integrousCustomer',
  integrousAssociate: 'integrousAssociate'
}

export type TROLE =
  IROLES['CUSTOMER'] |
  IROLES['MERCHANT'] |
  IROLES['DRIVER'] |
  IROLES['AGENT'] |
  IROLES['ADMIN'] |
  IROLES['integrousCustomer'] |
  IROLES['integrousAssociate']
