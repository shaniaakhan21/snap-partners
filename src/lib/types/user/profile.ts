export type TAccountInfoToUpdate = 'email' | 'phone' | 'password' | 'bankaccount' | 'socialsecurity' | 'username' | 'builderInfo'

export enum BuilderWebsiteField {
  facebook_url = 'facebook_url',
  twitter_url = 'twitter_url',
  linkedin_url = 'linkedin_url',
  instagram_url = 'instagram_url'
}
export const builderWebsiteFields = Object.values(BuilderWebsiteField)
