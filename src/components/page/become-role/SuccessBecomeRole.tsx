import { AppleStore, CheckMarkGreenIcon, GooglePlayBanner } from 'components/common/icons'

export const SuccessBecomeRole = ({ roleBecomed }: { roleBecomed: 'CUSTOMER' | 'DRIVER' | 'MERCHANT' }) => {
  const copyByRole = {
    CUSTOMER: {
      CTA_DESCRIPTION: '',
      IMG: '/images/headBecomeCustomer.png',
      APP_TO_DOWNLOAD: {
        TITLE: 'User app',
        DESCRIPTION: 'Order food and get it SNAP',
        TO_ANDROID: 'https://play.google.com/store/apps/details?id=com.snapdelivered.userapp',
        TO_APPLE: 'https://apps.apple.com/us/app/snap-user/id1478863057'
      },
      HEADER: 'Congrats, you’re a customer now!'
    },
    DRIVER: {
      CTA_DESCRIPTION: 'Now that you have decided to become a driver make sure to download our driver app and get started earning  delivering today!',
      IMG: '/images/headBecomeDriver.png',
      APP_TO_DOWNLOAD: {
        TITLE: 'Snap Operations Specialist app',
        DESCRIPTION: 'Fullfil and Manage orders',
        TO_ANDROID: 'https://play.google.com/store/apps/details?id=com.snapdelivered.driverapp',
        TO_APPLE: 'https://apps.apple.com/us/app/snap-operations-specialist/id1478862279'
      },
      HEADER: 'We have received your documents and will review in the next 24-48 hours, you will receive an email when the process is completed'
    },
    MERCHANT: {
      CTA_DESCRIPTION: 'Now that you have decided to become a Merchant make sure to download our restaurant app and get started earning',
      IMG: '/images/headBecomeMerchant.png',
      APP_TO_DOWNLOAD: {
        TITLE: 'Snap Merchant Control app',
        DESCRIPTION: 'Manager orders and payments',
        TO_ANDROID: 'https://play.google.com/store/apps/details?id=com.snapdelivered.restaurantapp',
        TO_APPLE: 'https://apps.apple.com/ve/app/snap-merchant-control/id1478737288'
      },
      HEADER: 'Congrats, you’re a merchant now!'
    }
  }
  return (
    <div className='max-w-sm w-full h-full mx-auto flex flex-col items-center justify-center'>
      <div className='text-center'>
        <span className='font-bold text-xl'>{copyByRole[roleBecomed].HEADER}</span>
      </div>

      <div className='mt-2'>
        <CheckMarkGreenIcon style={{ width: '-webkit-fill-available' }} classes='h-24' />
        <img src={copyByRole[roleBecomed].IMG} />
      </div>

      <div className='bg-white p-4 rounded-md mt-5 text-gray-800'>
        <div>
          <span className='text-primary-500 font-bold text-xl'>Download app</span>
          <p className='mt-4'>{copyByRole[roleBecomed].CTA_DESCRIPTION}</p>
        </div>

        <div className='mt-10'>
          <span className='font-semibold text-lg'>{copyByRole[roleBecomed].APP_TO_DOWNLOAD.TITLE}</span>
          <p className='mt-2'>{copyByRole[roleBecomed].APP_TO_DOWNLOAD.DESCRIPTION}</p>

          <div className='flex flex-col sm:flex-row items-center mt-4 gap-y-4'>
            <a href={copyByRole[roleBecomed].APP_TO_DOWNLOAD.TO_ANDROID} target='_blank' rel='noopener noreferrer'>
              <GooglePlayBanner/>
            </a>

            <a href={copyByRole[roleBecomed].APP_TO_DOWNLOAD.TO_APPLE} target='_blank' rel='noopener noreferrer'>
              <AppleStore />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
