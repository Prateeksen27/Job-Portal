import { Divider } from '@mantine/core';
import { IconAnchor } from '@tabler/icons-react';
import SignUp from '../../SignUpLogin/SignUp';
import Login from '../../SignUpLogin/Login';
import { useLocation } from 'react-router-dom';

const SignUpPage = () => {
  const location = useLocation();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden">
      <div
        className={`w-[100vw] h-[100vh] flex flex-col md:flex-row [&>*]:flex-shrink-0 transition-transform duration-700 ease-in-out 
        ${location.pathname === '/signup' ? '-translate-x-1/2' : 'translate-x-0'}`}
      >
        {/* Login Section */}
        <Login />
        {/* Middle Branding Section */}
        <div className={`w-1/2 h-full ${location.pathname=='/signup'?'rounded-r-[200px]':'rounded-l-[200px]'} transition-all duration-1000 ease-in-out bg-mine-shaft-900 flex flex-col gap-2 justify-center items-center`}>
          <div className="flex text-bright-sun-400 items-center gap-2">
            <IconAnchor className="w-16 h-16 drop-shadow-lg" stroke={2.6} />
            <div className="text-6xl font-semibold">TalentHub</div>
          </div>
          <div className="text-2xl text-mine-shaft-200 font-semibold">
            Find your dream job here
          </div>
          <Divider className="w-1/3 my-4 bg-bright-sun-400" />
        </div>

        {/* Signup Section */}
        <SignUp />
      </div>
    </div>
  );
};
export default SignUpPage;
