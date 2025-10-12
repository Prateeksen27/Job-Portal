import { Divider } from '@mantine/core'
import { IconAnchor } from '@tabler/icons-react'
import SignUp from '../../SignUpLogin/SignUp'
import Login from '../../SignUpLogin/Login'
const SignInPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      <div className='w-[100vw] h-[100vh] flex'>
        <div className='w-1/2 h-full rounded-r-[200px] bg-mine-shaft-900 flex-col flex gap-2 justify-center items-center'>
          <div className="flex text-bright-sun-400 items-center gap-2">
            <IconAnchor
              className="w-16 h-16   drop-shadow-lg"
              stroke={2.6}
            />
            <div className="text-6xl font-semibold">TalentHub</div>
          </div>
          <div className='text-2xl text-mine-shaft-200 font-semibold'>Find your dream job here</div>
        </div>
      <Login />
      </div>
    </div>
  )
}
export default SignInPage