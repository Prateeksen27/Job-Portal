import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const SignUp = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useAuthStore();

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.username || !data.email || !data.password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (data.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    signUp(data);
  };

  return (
    <div
      className="
        w-full md:w-1/2 
        flex flex-col justify-center 
        px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 
        py-10
      "
    >
      <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center md:text-left">
        Create Account
      </h2>

      <form
        onSubmit={onHandleSubmit}
        className="flex flex-col gap-4 mt-6 w-full max-w-sm mx-auto md:mx-0"
      >
        <TextInput
          label="Full Name"
          placeholder="Your Name"
          withAsterisk
          value={data.username}
          onChange={(e) =>
            setData({ ...data, username: e.currentTarget.value })
          }
          size="md"
        />

        <TextInput
          leftSection={<IconAt />}
          label="Email"
          placeholder="Your email"
          withAsterisk
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.currentTarget.value })
          }
          size="md"
        />

        <PasswordInput
          leftSection={<IconLock />}
          label="Password"
          placeholder="Your password"
          withAsterisk
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.currentTarget.value })
          }
          size="md"
        />

        <PasswordInput
          leftSection={<IconLock />}
          label="Confirm Password"
          placeholder="Re-enter password"
          withAsterisk
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          size="md"
        />

        <Checkbox
          autoContrast
          defaultChecked
          label="I agree to privacy policy"
          color="bright-sun.6"
          className="mt-2"
        />

        <Button
          variant="filled"
          autoContrast
          fullWidth
          type="submit"
          className="py-3 text-base"
        >
          Register
        </Button>
      </form>

      <div className="text-sm text-gray-300 mt-5 text-center md:text-left">
        Have an account?
        <Link
          to="/login"
          className="text-bright-sun-400 hover:underline font-medium ml-1"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
