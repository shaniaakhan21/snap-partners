import Box from '@mui/material/Box'
import StarIcon from '@material-ui/icons/Star'
import { styled } from '@mui/system'
import { Rank, RankData } from 'lib/types/overview'
import { bgFromRank } from 'lib/utils/bgFromRank'

interface StyledBoxProps {
  backgroundColor: string;
}

const StyledBox = styled(Box)<StyledBoxProps>((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  backgroundColor: props.backgroundColor,
  borderRadius: 4
}))

interface ReferralsProps{
  rankData: RankData | null
}

export default function Referrals (props: ReferralsProps) {
  const { rankData } = props

  if (!rankData) return <></>

  return (
    <div className="bg-white rounded-lg pl-5 pr-6 md:pl-10 md:pr-12 py-7">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <StyledBox backgroundColor={bgFromRank(rankData.currentRank as Rank)}>
            <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: bgFromRank(rankData.currentRank as Rank) }} />
          </StyledBox>
          <span className='ml-5 text-lg font-semibold'>
            {rankData.currentRank}
          </span>
        </div>
        <span className='ml-5 text-lg font-semibold'>
            Referrals
        </span>
      </div>
      <table className="table-fixed w-full border-collapse border border-slate-500 mt-4 text-left">
        <thead>
          <tr className='bg-transparentPrimary-24%'>
            <th className='text-ellipsis overflow-hidden whitespace-nowrap text-xs md:text-base border border-gray-300 pl-4'>Levels</th>
            <th className='text-ellipsis overflow-hidden whitespace-nowrap text-xs md:text-base border border-gray-300 pl-4'>Restaurants</th>
            <th className='text-ellipsis overflow-hidden whitespace-nowrap text-xs md:text-base border border-gray-300 pl-4'>Drivers</th>
            <th className='text-ellipsis overflow-hidden whitespace-nowrap text-xs md:text-base border border-gray-300 pl-4'>Customers</th>
            <th className='text-ellipsis overflow-hidden whitespace-nowrap text-xs md:text-base border border-gray-300 pl-4'>ERC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='text-xs md:text-base border border-gray-300 pl-4'>Personal referrals</td>
            <td className='text-xs md:text-base border border-gray-300 pl-4'></td>
            <td className='text-xs md:text-base border border-gray-300 pl-4'></td>
            <td className='text-xs md:text-base border border-gray-300 pl-4'></td>
            <td className='text-xs md:text-base border border-gray-300 pl-4'></td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}
