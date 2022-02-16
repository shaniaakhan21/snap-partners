import { GenealogyIcon } from './icons'

export const AccountNoImage = ({ classes = '' }) => {
  return (
    <div className={`w-10 h-10 rounded-3xl bg-gray-200 flex items-center justify-center ${classes}`}>
      <GenealogyIcon />
    </div>
  )
}
