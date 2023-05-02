import { Ranks } from 'lib/constants/variables'
import { Rank } from 'lib/types/overview'
import { CheckMarkGreenIcon } from '../icons'

interface RankStepProps {
    rank: number;
    currentRank: number;
    title: Rank;
}

interface RankStepsProps {
    currentRank: number;
}

const RankStep = (props: RankStepProps) => {
  const { rank, currentRank, title } = props
  const selected = rank === currentRank
  return (
    <div className='flex flex-col justify-center items-center' style={{ minWidth: 56 }}>
      <div className='flex items-center justify-center' style={{ borderRadius: 16, height: 32, width: 32, backgroundColor: selected ? '#DD4C37' : '#19191914', borderWidth: 1, borderColor: '#9D9D9D' }}>
        {selected ? <CheckMarkGreenIcon color='#FFFFFF' /> : <p className='text-xs font-bold text-gray-500'>{rank + 1}</p>}
      </div>
      <p className='text-xs align text-center mt-2' style={{ color: selected ? '#E35C49' : '#DADADA' }}>
        {title}
      </p>
    </div>
  )
}

export const RankSteps = (props: RankStepsProps) => {
  const { currentRank } = props

  const renderRank = (rank: Rank, idx: number) => {
    console.log('will render line ', idx !== Ranks.length - 1)
    return (
      <div className='relative flex flex-row items-center flex-1'>
        <RankStep rank={idx} currentRank={currentRank} title={rank} />
        {
          idx !== Ranks.length - 1 && (
            <div style={{ height: 1, backgroundColor: '#D6D6D6', width: '100%', flex: 1, marginBottom: 24 }} />
          )
        }
      </div>
    )
  }
  return (
    <div className="flex flex-row justify-between">
      {Ranks.map(renderRank)}
    </div>
  )
}
