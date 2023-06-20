export interface IROLES {
  IBO: 'IBO',
  CUSTOMER: 'CUSTOMER',
  MERCHANT: 'MERCHANT',
  DRIVER: 'DRIVER',
  AGENT: 'AGENT',
  ADMIN: 'ADMIN',
  integrousCustomer: 'integrousCustomer',
  integrousAssociate: 'integrousAssociate'
}

export type TROLE =
  IROLES['IBO'] |
  IROLES['CUSTOMER'] |
  IROLES['MERCHANT'] |
  IROLES['DRIVER'] |
  IROLES['AGENT'] |
  IROLES['ADMIN'] |
  IROLES['integrousCustomer'] |
  IROLES['integrousAssociate']
