import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import toast from "react-hot-toast"

const SignUp = () => {
  const [data,setData] = useState({
    username:"",
    email:"",
    password:""
  })
  const [confirmPassword,setConfirmPassword] = useState("")
  const {signUp} = useAuthStore()
  const onHandleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    if(data.password !== confirmPassword){
      toast.error("Passwords do not match")
      return
    }
    signUp(data)
  }
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">
        Create Account
      </div>
      <TextInput
        label="Full Name"
        placeholder="Your Name"
        withAsterisk
        value={data.username}
        onChange={(e)=>setData({...data,username:e.currentTarget.value})}
      />
      <TextInput
        leftSection={<IconAt />}
        label="Your email"
        placeholder="Your email"
        value={data.email}
        onChange={(e)=>setData({...data,email:e.currentTarget.value})}
        withAsterisk
      />
      <PasswordInput
        leftSection={<IconLock />}
        label="Password"
        withAsterisk
        value={data.password}
        onChange={(e)=>setData({...data,password:e.currentTarget.value})}
        placeholder="Your Password"
      />
      <PasswordInput
        leftSection={<IconLock />}
        label="Confirm Password"
        withAsterisk
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.currentTarget.value)}
        placeholder="Confirm Your Password"
      />
      <Checkbox
      autoContrast
        defaultChecked
        label="I agree to privacy policy"
        color="bright-sun.6"
      />
      <Button variant="filled" autoContrast onClick={onHandleSubmit}>Register</Button>
      <div className="mx-auto">Have an account ?  <Link to='/login' className="text-bright-sun-400 hover:underline">Login</Link></div>
    </div>
  )
}

export default SignUp