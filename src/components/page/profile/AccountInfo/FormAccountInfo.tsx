import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { builderWebsiteFields, TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'

interface IFormAccountInfoProps {
  auth: IAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const FormAccountInfo = ({ auth, setTypeUpdate }: IFormAccountInfoProps) => {
  const _auth :any = auth
  const isIntegrous = (_auth.roles.integrousAssociate || _auth.roles.integrousCustomer)
  console.log('date dtae', auth.dateOfBirth)
  return (
    <ul className='w-full h-full rounded-lg'>
      <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
        <li className='rounded-xl bg-white w-full sm:w-1/2 px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
          <div>
            <label htmlFor='name' className='text-sm'>Name</label>
            <br />
            <input
              id='name'
              name='name'
              type='text'
              value={auth.name ?? ''}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>
        </li>

        <li className='rounded-xl bg-white w-full sm:w-1/2 px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
          <div>
            <label htmlFor='lastname' className='text-sm'>Last Name</label>
            <br />
            <input
              id='lastname'
              name='lastname'
              type='text'
              value={auth.lastname ?? ''}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>
        </li>
      </div>
      <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
        <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center w-1/2'>
          <div>
            <label htmlFor='email' className='text-sm'>Email</label>
            <br />
            <input
              id='email'
              name='email'
              type='email'
              value={auth.email}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('email')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>
        <li className='rounded-xl w-1/2 bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
          <div>
            <label htmlFor='dateofbirth' className='text-sm'>Date of Birth</label>
            <br />
            <input
              id='dateofbirth'
              name='dateofbirth'
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
        <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
          <div>
            <label htmlFor='username' className='text-sm'>Username</label>
            <br />
            <input
              id='username'
              name='username'
              type='text'
              value={auth.username}
              disabled={true}
              className='w-full bg-transparent text-lg truncate'
            />
          </div>

          <div>
            <button
              onClick={() => setTypeUpdate('username')}
              className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
            >
            Edit
            </button>
          </div>
        </li>

      )}

      <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
        <div>
          <label htmlFor='name' className='text-sm'>Phone</label>
          <br />
          <input
            id='phone'
            name='phone'
            type='tel'
            value={auth.phoneNumber}
            disabled={true}
            className='w-full bg-transparent text-lg truncate'
            autoComplete='off'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('phone')}
            className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
          >
            Edit
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

      <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
        <div>
          <label htmlFor='password' className='text-sm'>Password</label>
          <br />
          <input
            id='password'
            name='password'
            type='password'
            value='12345678'
            disabled={true}
            className='w-full bg-transparent text-lg truncate'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('password')}
            className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
          >
            Edit
          </button>
        </div>
      </li>

      <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
        <div>
          <label htmlFor='password' className='text-sm'>Social Security Number</label>
          <br />
          <input
            id='password'
            name='text'
            type='text'
            value={auth.socialSecurityNumber}
            disabled={true}
            className='w-full bg-transparent text-lg truncate'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('socialsecurity')}
            className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
          >
            Edit
          </button>
        </div>
      </li>

      <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
        <div>
          <label htmlFor='password' className='text-sm'>Bank Account Information</label>
          <br />
          <input
            id='password'
            name='password'
            type='password'
            value=''
            disabled={true}
            className='w-full bg-transparent text-lg truncate'
          />
        </div>

        <div>
          <button
            onClick={() => setTypeUpdate('bankaccount')}
            className='bg-primary-500 hover:bg-opacity-80 rounded-full px-4 py-1 text-white font-bold uppercase'
          >
            Edit
          </button>
        </div>
      </li>

      {/* <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'> */}
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
      {/*        className='w-full bg-transparent text-lg truncate mb-3 ml-4' */}
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
