import { IAuth } from 'lib/stores/Auth'

interface IButtonCTAProps {
  auth: IAuth
  setNewWindow: (newWindow: Window) => void
}

export const ButtonCTA = ({ auth, setNewWindow }: IButtonCTAProps) => {
  const handleClickUpgradeToManager = () => {
    const windowOpened = window.open(
      `https://store.snapdelivered.com/product/manager-upgrade?userId=${auth.id}`,
      'windowUpgradeToManager'
    )

    setNewWindow(windowOpened)
    // When a newWindow is sent, in DashboardLayout we have an effect to handle upgrade to manager.
  }

  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-center mt-11'>
      <button
        onClick={handleClickUpgradeToManager}
        className='w-full h-20 bg-textAcent-500 text-white rounded-lg shadow-md flex flex-col justify-center px-4'
      >
        <h6 className='text-lg font-semibold'>Upgrade to manager</h6>
      </button>
    </div>
  )
}
