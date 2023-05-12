import { IAuth } from 'lib/stores/Auth'

interface AccountDefaultImageProps {
  auth: IAuth;
  size?: number | string
}
export default function AccountDefaultImage (props: AccountDefaultImageProps) {
  const { auth, size = '80px' } = props
  const imgPath = `/images/profile/${auth.ranks.type}.png`

  return <img src={imgPath} style={{ width: size, height: size, borderRadius: size }}/>
}
