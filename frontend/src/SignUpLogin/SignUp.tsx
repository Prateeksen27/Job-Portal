import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">
        Create Account
      </div>
      <TextInput
        label="Full Name"
        placeholder="Your Name"
        withAsterisk
      />
      <TextInput
        leftSection={<IconAt />}
        label="Your email"
        placeholder="Your email"
        withAsterisk
      />
      <PasswordInput
        leftSection={<IconLock />}
        label="Password"
        withAsterisk
        placeholder="Your Password"
      />
      <PasswordInput
        leftSection={<IconLock />}
        label="Confirm Password"
        withAsterisk
        placeholder="Confirm Your Password"
      />
      <Checkbox
      autoContrast
        defaultChecked
        label="I agree to privacy policy"
        color="bright-sun.6"
      />
      <Button variant="filled" autoContrast>Register</Button>
      <div className="mx-auto">Have an account ?  <Link to='/login' className="text-bright-sun-400 hover:underline">Login</Link></div>
    </div>
  )
}

export default SignUp