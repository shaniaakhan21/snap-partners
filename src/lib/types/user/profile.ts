export type TAccountInfoToUpdate = 'email' | 'phone' | 'password' | 'bankaccount' | 'socialSecurityNumber' | 'username' | 'builderInfo' | 'street' | 'city' | 'state' | 'zip' | 'dateOfBirth' | 'businessName' | 'business_type' | 'b_start_date' | 'ein'

export enum BuilderWebsiteField {
  facebook_url = 'facebook_url',
  twitter_url = 'twitter_url',
  linkedin_url = 'linkedin_url',
  instagram_url = 'instagram_url'
}
export const builderWebsiteFields = Object.values(BuilderWebsiteField)
