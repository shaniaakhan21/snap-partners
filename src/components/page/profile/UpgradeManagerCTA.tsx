import { IAuth } from 'lib/stores/Auth'

interface IUpgradeManagerCTAProps {
  auth: IAuth
  setNewWindow: (newWindow: Window) => void
}

export const UpgradeManagerCTA = ({ auth, setNewWindow }: IUpgradeManagerCTAProps) => {
  const handleClickUpgradeToManager = () => {
    const windowOpened = window.open(
      `https://store.snapdelivered.com/product/manager-upgrade?userId=${auth.id}`,
      'windowUpgradeToManager'
    )

    setNewWindow(windowOpened)
    // When a newWindow is sent, in DashboardLayout we have an effect to handle upgrade to manager.
  }

  return (
    <button
      onClick={handleClickUpgradeToManager}
      className='w-full md:w-1/2 h-20 bg-textAcent-500 text-white rounded-lg shadow-md flex flex-col justify-center px-4'
    >
      <h6 className='text-lg font-semibold'>Upgrade to manager</h6>
    </button>
  )
}
