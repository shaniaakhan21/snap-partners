import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { Button } from 'components/common/Button'

const LoginOrSignBox = () => {
  return (
    <Card
      sx={{ minWidth: 582, background: '#0000004f', border: '#0000004f 1px solid', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      className="px-2 py-4 md:px-8 md:py-2 rounded-2xl mt-28"
    >

      <CardContent>
        <h1 className="text text-white text-2xl md:text-3xl font-semibold-it font-normal text-center">
              Purchase <span className='text-red-h'>Now</span>
        </h1>
        <br></br>
        <p className="text text-white text-2xl md:text-3xl font-light text-center">
          <Button classes='text-lg bg-btn-color rounded-lg px-7'>
              LOG IN / SIGN UP
            <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
          </Button>
        </p>
      </CardContent>

    </Card>
  )
}

export default LoginOrSignBox
