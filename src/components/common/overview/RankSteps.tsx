import { Ranks } from 'lib/constants/variables'
import { Rank } from 'lib/types/overview'
import { IBORankIcon } from '../icons/IBORankIcon'
import { Manager } from '../icons/Manager'
import { Supervisor } from '../icons/Supervisor'
import { Director } from '../icons/Director'
import { Executive } from '../icons/Executive'

interface RankStepsProps {
    currentRank: number;
    onRankPress: (idx: number)=> unknown
}

export const RankSteps = (props: RankStepsProps) => {
  const { currentRank, onRankPress } = props

  const convertName = (name) => {
    if (name === 'Free Member') {
      return 'IBO'
    }
    return name
  }

  const renderRank = (rank: Rank, idx: number) => {
    const selected = idx === currentRank
    const rankIcons = {
      IBO: <IBORankIcon strokeColor={ selected ? '#E74426' : '#515151'}/>,
      Manager: <Manager strokeColor={ selected ? '#E74426' : '#515151'} />,
      Supervisor: <Supervisor strokeColor={ selected ? '#E74426' : '#515151'}/>,
      Executive: <Executive strokeColor={ selected ? '#E74426' : '#515151'}/>,
      Director: <Director strokeColor={ selected ? '#E74426' : '#515151'}/>

    }
    const icon = rankIcons[convertName(rank)]
    return (
      <button key={rank} className='flex flex-1 md:flex-2 flex-row relative mt-2' onClick={() => onRankPress(idx)} style={{ minHeight: 70 }}>
        <div className='flex flex-col items-center ' style={{ minWidth: 59 }}>
          <div className='flex items-center justify-center bg-none py-0 px-[6px] md:py-0 md:px-2 lg:p-4 rounded-full text-red w-9/12 lg:w-full' style={{ borderWidth: 2, borderColor: selected ? '#E74426' : '#EFEFEF' }}>
            {icon}
          </div>
          <p className='text-xs align text-center mt-2 font-semibold' style={{ color: selected ? '#E74426' : '#9D9D9D' }}>
            {convertName(rank)}
          </p>
        </div>
        {idx !== Ranks.length - 1 && <div className='flex-1 h-px bg-gray-300 absolute top-35 left-20' style={{ marginTop: -12, height: 5 }} /> }
      </button>
    )
  }
  return (
    <div className='flex flex-row justify-center md:justify-between items-center'>
      {Ranks.map(renderRank)}
    </div>
  )
}
