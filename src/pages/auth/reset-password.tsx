import { useRouter } from 'next/router'

const ResetPasswordPage = () => {
  const router = useRouter()

  console.log(router.query)

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h1 className="text-3xl text-center">RESET PASSWORD PAGE</h1>
    </div>
  )
}

export default ResetPasswordPage
