export interface IRANKS {
  REFERRAL_PARTNER: 'referralPartner',
  MANAGER: 'manager',
  SUPERVISOR: 'supervisor',
  DIRECTOR: 'director',
  EXECUTIVE: 'executive'
}

export type TRANK =
  IRANKS['REFERRAL_PARTNER'] |
  IRANKS['MANAGER'] |
  IRANKS['SUPERVISOR'] |
  IRANKS['DIRECTOR'] |
  IRANKS['EXECUTIVE']
