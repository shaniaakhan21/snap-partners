import { CustomerIcon, DriverIcon, MerchantIcon } from 'components/common/icons'
import { ROLES } from 'config/roles'
import { IAuth } from 'lib/stores/Auth'
import Link from 'next/link'

interface IBecomeRolesProps {
  auth: IAuth
}

export const BecomeRoles = ({ auth }: IBecomeRolesProps) => {
  console.log(auth.roles)
  return (
    <>
      {
        (!auth.roles?.customer || !auth.roles?.driver || !auth.roles?.merchant) && (!auth.roles?.admin) && (
          <div className='w-full mt-10'>
            {
              (auth.roles.merchant && auth.roles.driver) && (
                <>
                  <span className='text-3xl font-bold'>Extend your posibilities</span> <br />
                  <span className='text-lg font-semibold'>Your can be a driver at the same time as a costumber or a Merchant</span>
                </>
              )
            }

            <div className='w-full flex flex-col md:flex-row justify-between items-start gap-y-10 gap-x-10 mt-10'>
              {
                ((auth.roles.agent && !auth.roles.customer) && (
                  <Link href={`/become-role?role=${ROLES.CUSTOMER}`}>
                    <a className='bg-white hover:bg-primary-300 hover:bg-opacity-30 rounded-md p-4 w-full'>
                      <div className='flex flex-col md:flex-row justify-center items-center'>
                        <span className='text-2xl font-bold text-gray-800 mr-10'>Become a Customer</span>
                        <CustomerIcon classes='w-24' />
                      </div>
                    </a>
                  </Link>
                ))
              }
              {
                ((auth.roles.merchant || auth.roles.driver) && !auth.roles.customer) && (
                  <Link href={`/become-role?role=${ROLES.CUSTOMER}`}>
                    <a className='bg-white hover:bg-primary-300 hover:bg-opacity-30 rounded-md p-4 w-full'>
                      <div className='flex flex-col md:flex-row justify-center items-center'>
                        <span className='text-2xl font-bold text-gray-800 mr-10'>Become a Customer</span>
                        <CustomerIcon classes='w-24' />
                      </div>
                    </a>
                  </Link>
                )
              }
              {
                (auth.roles.customer && (!auth.roles.driver && !auth.roles.merchant)) && (
                  <Link href={`/become-role?role=${ROLES.DRIVER}`}>
                    <a className='bg-white hover:bg-primary-300 hover:bg-opacity-30 rounded-md p-4 w-full'>
                      <div className='flex flex-col md:flex-row justify-center items-center'>
                        <span className='text-2xl font-bold text-gray-800 mr-10'>Become a Driver</span>
                        <DriverIcon classes='w-24' />
                      </div>
                    </a>
                  </Link>
                )
              }
              {
                ((auth.roles.customer || auth.roles.driver) && !auth.roles.merchant) && (
                  <Link href={`/become-role?role=${ROLES.MERCHANT}`}>
                    <a className='bg-white hover:bg-primary-300 hover:bg-opacity-30 rounded-md p-4 w-full'>
                      <div className='flex flex-col md:flex-row justify-center items-center'>
                        <span className='text-2xl font-bold text-gray-800 mr-10'>Become a Merchant</span>
                        <MerchantIcon />
                      </div>
                    </a>
                  </Link>
                )
              }
            </div>
          </div>
        )
      }
    </>
  )
}
