import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

interface IFormAccountInfoProps {
  auth: IAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const FormAccountInfo = ({ auth, setTypeUpdate }: IFormAccountInfoProps) => {
  const _auth :any = auth
  const isIntegrous = (_auth.roles.integrousAssociate || _auth.roles.integrousCustomer)
  return (
    <ul className='w-full h-full rounded-lg'>
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
              className='w-full bg-transparent text-lg font-semibold'
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
              className='w-full bg-transparent text-lg font-semibold'
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
        <li className='rounded-xl w-1/2 bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
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
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('dateOfBirth')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
      </div>

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
              className='w-full bg-transparent text-lg font-semibold'
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
            className='w-full bg-transparent text-lg font-semibold'
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

      <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
        <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center w-1/2'>
          <div>
            <label htmlFor='street' className='text-sm'>STREET</label>
            <br />
            <input
              id='street'
              name='street'
              type='text'
              value={auth.street}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('street')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
        <li className='rounded-xl w-1/2 bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
          <div>
            <label htmlFor='city' className='text-sm'>CITY</label>
            <br />
            <input
              id='city'
              name='city'
              type='text'
              value={auth.city}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('city')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
      </div>

      <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
        <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center w-1/2'>
          <div>
            <label htmlFor='state' className='text-sm'>STATE / PROVINCE</label>
            <br />
            <input
              id='state'
              name='state'
              type='text'
              value={auth.state}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('state')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
        <li className='rounded-xl w-1/2 bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
          <div>
            <label htmlFor='zip' className='text-sm'>Zipcode</label>
            <br />
            <input
              id='zip'
              name='zip'
              type='text'
              value={auth.zip}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('zip')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
      </div>

      <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
        <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center w-1/2'>
          <div>
            <label htmlFor='street' className='text-sm'>STREET</label>
            <br />
            <input
              id='street'
              name='street'
              type='text'
              value={auth.street}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('street')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
        <li className='rounded-xl w-1/2 bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
          <div>
            <label htmlFor='city' className='text-sm'>CITY</label>
            <br />
            <input
              id='city'
              name='city'
              type='text'
              value={auth.city}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('city')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
      </div>

      <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
        <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center w-1/2'>
          <div>
            <label htmlFor='state' className='text-sm'>STATE / PROVINCE</label>
            <br />
            <input
              id='state'
              name='state'
              type='text'
              value={auth.state}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('state')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
        <li className='rounded-xl w-1/2 bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
          <div>
            <label htmlFor='zip' className='text-sm'>Zipcode</label>
            <br />
            <input
              id='zip'
              name='zip'
              type='text'
              value={auth.zip}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('zip')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
      </div>

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
            className='w-full bg-transparent text-lg font-semibold'
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
            className='w-full bg-transparent text-lg font-semibold'
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
            className='w-full bg-transparent text-lg font-semibold'
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

      {/* <li className='rounded-xl bg-white px-4 py-3 mt-2 flex justify-between items-center'> */}
      {/*  <div> */}
      {/*    <h2 className='text-lg mb-4 font-bold'>Builder Website Info</h2> */}
      {/*    {builderWebsiteFields.map((item, index) => (<> */}
      {/*      <label htmlFor='password' className='text-sm capitalize'>{item.replace('_url', '')} URL</label> */}
      {/*      <br /> */}
      {/*      <input */}
      {/*        id={item} */}
      {/*        name={item} */}
      {/*        type='text' */}
      {/*        value={auth[item] ?? ''} */}
      {/*        disabled={true} */}
      {/*        className='w-full bg-transparent text-lg mb-3 ml-4' */}
      {/*      /> */}
      {/*    </>))} */}
      {/*  </div> */}

      {/*  <div> */}
      {/*    <button */}
      {/*      onClick={() => setTypeUpdate('builderInfo')} */}
      {/*      className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase' */}
      {/*    > */}
      {/*      Edit */}
      {/*    </button> */}
      {/*  </div> */}
      {/* </li> */}

    </ul>
  )
}
