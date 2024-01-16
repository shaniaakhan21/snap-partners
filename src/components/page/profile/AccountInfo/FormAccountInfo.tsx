import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useState } from 'react'
import { BusinessFields } from './BusinessFields'

interface IFormAccountInfoProps {
  auth: IAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const FormAccountInfo = ({ auth, setTypeUpdate }: IFormAccountInfoProps) => {
  const _auth :any = auth
  const isIntegrous = (_auth.roles.integrousAssociate || _auth.roles.integrousCustomer)
  const [isSwitchOn, setIsSwitchOn] = useState(true)
  const isValidated = auth.isValidated
  const handleSwitchChange = () => {
    setIsSwitchOn((prev) => !prev)
  }
  return (
    <ul className='w-full h-full rounded-lg'>
      {auth.TINstatus === 'business' && (
        <div className='flex flex-row justify-start items-center'>
          <h1 className='text-xl md:text-2xl leading-3'>Business Info</h1>
          <div className='flex justify-center flex-row-reverse rounded-full m-[6px] p-[8px] items-center justify-start'>
            <label className='switch'>
              <input type='checkbox' checked={isSwitchOn} onChange={handleSwitchChange} />
              <span className='slider'></span>
            </label>

          </div>

        </div>

      )}
      {isSwitchOn && (auth.TINstatus === 'business') && (
        <div className='mt-2'>
          <BusinessFields auth={auth} setTypeUpdate={setTypeUpdate}/>
        </div>
      )}

      <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
        <li className='rounded-xl bg-white w-full sm:w-1/2 px-4 py-3 flex justify-between items-center'>
          <div>
            <label htmlFor='name' className='text-sm text-[#708292]'>Name</label>
            <br />
            <input
              id='name'
              name='name'
              type='text'
              value={`${auth.name || ''} ${auth.lastname || ''}`}
              disabled={true}
              className='w-full bg-transparent  text-sm md:text-lg font-semibold'
            />
          </div>
        </li>
      </div>
      <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
        <li className='rounded-xl w-full bg-white px-4 py-3 mt-2 flex justify-between items-center w-1/2'>
          <div className='w-full'>
            <label htmlFor='email' className='text-sm  text-[#708292]'>Email</label>
            <br />
            <input
              id='email'
              name='email'
              type='email'
              value={auth.email}
              disabled={true}
              className='w-full bg-transparent text-sm md:text-lg font-semibold'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('email')}
              className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
            >
              <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
            </button>
          </div>
        </li>

      </div>
      <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
        <div>
          <label htmlFor='dateOfBirth' className='text-sm'>Date of Birth</label>
          <br />
          <input
            id='dateOfBirth'
            name='dateOfBirth'
            type='text'
            value={
              auth.dateOfBirth
                ? new Date(auth.dateOfBirth).toLocaleDateString()
                : ''
            }
            disabled={true}
            className='w-full bg-transparent text-sm md:text-lg truncate'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('dateOfBirth')}
            className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
          >
            <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
          </button>
        </div>
      </li>

      {isIntegrous && (
        <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
          <div>
            <label htmlFor='username' className='text-sm  text-[#708292]'>Username</label>
            <br />
            <input
              id='username'
              name='username'
              type='text'
              value={auth.username}
              disabled={true}
              className='w-full bg-transparent text-sm md:text-lg font-semibold'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('username')}
              className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
            >
              <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
            </button>
          </div>
        </li>

      )}

      <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
        <div>
          <label htmlFor='name' className='text-sm  text-[#708292]'>Phone</label>
          <br />
          <input
            id='phone'
            name='phone'
            type='tel'
            value={auth.phoneNumber}
            disabled={true}
            className='w-full bg-transparent text-sm md:text-lg font-semibold'
            autoComplete='off'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('phone')}
            className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
          >
            <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
          </button>
        </div>
      </li>

      {/* <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'> */}
      <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
        <div>
          <label htmlFor='street' className='text-sm'>STREET</label>
          <br />
          <input
            id='street'
            name='street'
            type='text'
            value={auth.street}
            disabled={true}
            className='w-full bg-transparent text-sm md:text-lg truncate'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('street')}
            className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
          >
            <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
          </button>
        </div>
      </li>
      <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
        <div>
          <label htmlFor='city' className='text-sm'>CITY</label>
          <br />
          <input
            id='city'
            name='city'
            type='text'
            value={auth.city}
            disabled={true}
            className='w-full bg-transparent text-sm md:text-lg truncate'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('city')}
            className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
          >
            <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
          </button>
        </div>
      </li>
      {/* </div>

      <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'> */}
      <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
        <div>
          <label htmlFor='state' className='text-sm'>STATE / PROVINCE</label>
          <br />
          <input
            id='state'
            name='state'
            type='text'
            value={auth.state}
            disabled={true}
            className='w-full bg-transparent text-sm md:text-lg truncate'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('state')}
            className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
          >
            <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
          </button>
        </div>
      </li>
      <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
        <div>
          <label htmlFor='zip' className='text-sm'>Zipcode</label>
          <br />
          <input
            id='zip'
            name='zip'
            type='text'
            value={auth.zip}
            disabled={true}
            className='w-full bg-transparent text-sm md:text-lg truncate'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('zip')}
            className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
          >
            <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
          </button>
        </div>
      </li>

      <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
        <div>
          <label htmlFor='password' className='text-sm  text-[#708292]'>Password</label>
          <br />
          <input
            id='password'
            name='password'
            type='password'
            value='12345678'
            disabled={true}
            className='w-full bg-transparent text-sm md:text-lg font-semibold'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('password')}
            className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
          >
            <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
          </button>
        </div>
      </li>

      <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
        <div>
          <label htmlFor='password' className='text-sm  text-[#708292]'>Social Security Number</label>
          <br />
          <input
            id='password'
            name='text'
            type='text'
            value={auth.socialSecurityNumber}
            disabled={true}
            className='w-full bg-transparent text-sm md:text-lg font-semibold'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('socialSecurityNumber')}
            className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
          >
            <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
          </button>
        </div>
      </li>

      <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'>
        <div>
          <label htmlFor='password' className='text-sm  text-[#708292]'>Bank Account Information</label>
          <br />
          <input
            id='password'
            name='password'
            type='password'
            value=''
            disabled={true}
            className='w-full bg-transparent text-sm md:text-lg font-semibold'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('bankaccount')}
            className='bg-[#F5FBFF] hover:bg-opacity-80 rounded-full p-2 text-white font-bold uppercase border-2 border-[#C9DAE8]'
          >
            <EditOutlinedIcon sx={{ color: '#688FB1' }}/>
          </button>
        </div>
      </li>
    </ul>
  )
}
