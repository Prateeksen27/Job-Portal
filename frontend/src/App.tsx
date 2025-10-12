import { createTheme, MantineProvider, Text } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
// ‼️ import carousel styles after core package styles
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import SignInForm from './pages/AuthPages/SignIn';
// import SignUpPage from './pages/AuthPages/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import FindJobs from './pages/FindJobs';
import Header from './Header/Header';
import Footer from './LandingPage/Footer';
import FindTalent from './pages/FindTalent';
import TalentProfile from './find-talent/TalentProfile';
import PostJobPage from './pages/PostJobPage';
import { JobPage } from './pages/JobPage';
import ApplyJobPage from './pages/ApplyJobPage';
import CompanyPage from './pages/CompanyPage';
import PostedJobs from './pages/PostedJobs';
import JobHistoryPage from './pages/JobHistoryPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

// ‼️ import tiptap styles after core package styles
export default function App() {
  const theme = createTheme({
  colors: {
    "bright-sun": [
      "#fffdea", // 50
      "#fff9c4", // 100
      "#fff59d", // 200
      "#fff176", // 300
      "#ffee58", // 400 ⭐ main shade
      "#fdd835", // 500
      "#fbc02d", // 600
      "#f9a825", // 700
      "#f57f17", // 800
      "#f57f17", // 900
    ],
    "mine-shaft": [
      "#f6f6f6", // 50
      "#e7e7e7", // 100
      "#d1d1d1", // 200
      "#b0b0b0", // 300
      "#888888", // 400
      "#6d6d6d", // 500
      "#5d5d5d", // 600
      "#4f4f4f", // 700
      "#454545", // 800
      "#3d3d3d", // 900
      "#2d2d2d", // 950
    ],
  },
  primaryColor: "bright-sun",
  fontFamily: "Poppins, sans-serif",
});
  const {user,isAuthenticated}= useAuthStore()

  return (
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <Toaster />
      <Router>
        <div className='bg-mine-shaft-950  font-[Poppins]'>
        {isAuthenticated && <Header />}
        <Routes>
          <Route path='/' element={isAuthenticated?<Home />:<Navigate to='/login' />} />
          <Route path="/find-jobs" element={isAuthenticated?<FindJobs />:<Navigate to='/login' />} />    
          <Route path="/jobs" element={isAuthenticated?<JobPage />:<Navigate to='/login' />} />    
          <Route path="/apply-job" element={isAuthenticated?<ApplyJobPage />:<Navigate to='/login' />} />    
          <Route path="/posted-jobs" element={isAuthenticated?<PostedJobs />:<Navigate to='/login' />} />    
          <Route path="/find-talent" element={isAuthenticated?<FindTalent />:<Navigate to='/login' />} />      
          <Route path="/history" element={isAuthenticated?<JobHistoryPage />:<Navigate to='/login' />} />      
          <Route path="/company-profile" element={isAuthenticated?<CompanyPage />:<Navigate to='/login' />} />      
          <Route path="/talent-profile/:id" element={isAuthenticated?<TalentProfile />:<Navigate to='/login' />} />   
          <Route path="/post-job" element={isAuthenticated?<PostJobPage />:<Navigate to='/login' />} />   
          <Route path='/login' element={isAuthenticated?<Navigate to='/' />:<SignInForm />} />
          <Route path='/signup'element={isAuthenticated?<Navigate to='/' />:<SignUpPage />}/>
          <Route path='*' element={isAuthenticated?<Home />:<Navigate to='/login' />} />
        </Routes>
        {isAuthenticated && <Footer />}
        </div>
      </Router>
    </MantineProvider>
  )
}