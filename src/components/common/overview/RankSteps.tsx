import { Ranks } from 'lib/constants/variables'
import { Rank } from 'lib/types/overview'
import { CheckMarkGreenIcon } from '../icons'

interface RankStepsProps {
    currentRank: number;
    onRankPress: (idx: number)=> unknown
}

export const RankSteps = (props: RankStepsProps) => {
  const { currentRank, onRankPress } = props

  const renderRank = (rank: Rank, idx: number) => {
    const selected = idx === currentRank
    return (
      <button key={rank} className='flex flex-1 flex-row relative' onClick={() => onRankPress(idx)} style={{ minHeight: 70 }}>
        <div className='flex flex-col items-center' style={{ minWidth: 59 }}>
          <div className='flex items-center justify-center' style={{ borderRadius: 16, height: 32, width: 32, backgroundColor: selected ? '#DD4C37' : '#19191914', borderWidth: 1, borderColor: '#9D9D9D' }}>
            {selected ? <CheckMarkGreenIcon color='#FFFFFF' /> : <p className='text-xs font-bold text-gray-500'>{idx + 1}</p>}
          </div>
          <p className='text-xs align text-center mt-2' style={{ color: selected ? '#E35C49' : '#DADADA' }}>
            {rank}
          </p>
        </div>
        {idx !== Ranks.length - 1 && <div className='flex-1 h-px bg-gray-300 absolute top-35 left-20' style={{ marginTop: -12, height: 5 }} /> }
      </button>
    )
  }
  return (
    <div className='flex flex-row justify-between items-center'>
      {Ranks.map(renderRank)}
    </div>
  )
}
