import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import toast from "react-hot-toast"

const Login = () => {
  const [data,setData] = useState({
    email:"",
    password:""
  })
 
  const {login} = useAuthStore()
  const onHandleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    login(data)
  }
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">
        Welcome to TalentHub
      </div>
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
      <Button variant="filled" autoContrast onClick={onHandleSubmit}>Login</Button>
      <div className="mx-auto">don't Have an account ?  <Link to='/signup' className="text-bright-sun-400 hover:underline">Register</Link></div>
    </div>
  )
}

export default Login