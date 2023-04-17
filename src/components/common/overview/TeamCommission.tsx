import { styled } from '@material-ui/core/styles'
import Box from '@mui/material/Box'
import StarIcon from '@material-ui/icons/Star'

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  backgroundColor: '#C99FFF',
  borderRadius: 4
})

const TeamCommission = () => {
  return (
    <>
      <div className='grid grid-cols-2 gap-4 pb-5'>
        <div className="col-span-1 flex items-center">
          <StyledBox>
            <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: '#C99FFF' }} />
          </StyledBox>
          <div>
            <h1 className="text-2xl text-black font-bold pl-2">Manager</h1>
          </div>
        </div>
        <div className="col-span-1 text-right">
          <h1 className="text-2xl text-black font-bold pl-2">Team Commission</h1>
        </div>
      </div>

      <table className="table w-full border border-gray-400 p-10">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-1/3 px-4 py-2 text-left bg-purple-200 border border-gray-400">Levels</th>
            <th className="w-1/3 px-4 py-2 text-left bg-purple-200 border border-gray-400">Riders</th>
            <th className="w-1/3 px-4 py-2 text-left bg-purple-200 border border-gray-400">Restaurant Orders</th>
            <th className="w-1/3 px-4 py-2 text-left bg-purple-200 border border-gray-400">Phone</th>
            <th className="w-1/3 px-4 py-2 text-left bg-purple-200 border border-gray-400">ERC</th>
            <th className="w-1/3 px-4 py-2 text-left bg-purple-200 border border-gray-400">Vidgo</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="w-1/3 px-4 py-2 border border-gray-400">John Doe</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">john@example.com</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">123-456-7890</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">John Doe</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">john@example.com</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">123-456-7890</td>
          </tr>
          <tr className="bg-white">
            <td className="w-1/3 px-4 py-2 border border-gray-400">Jane Smith</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">jane@example.com</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">555-555-5555</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">John Doe</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">john@example.com</td>
            <td className="w-1/3 px-4 py-2 border border-gray-400">123-456-7890</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default TeamCommission
