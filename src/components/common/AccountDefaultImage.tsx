import { IAuth } from 'lib/stores/Auth'
import { TRANK } from 'lib/types/user/ranks';

interface AccountDefaultImageProps {
  rank: TRANK;
  size?: number | string
}
export default function AccountDefaultImage (props: AccountDefaultImageProps) {
  const { rank, size = '80px' } = props
  const imgPath = `/images/profile/${rank}.png`

  return <img src={imgPath} style={{ width: size, height: size, borderRadius: size }}/>
}
