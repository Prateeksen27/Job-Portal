import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuthStore();

  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Please fill all fields");
      return;
    }
    login(data);
  };

  return (
    <div
      className="
        w-full md:w-1/2 
        px-4 sm:px-8 md:px-16 lg:px-20 
        flex flex-col justify-center 
        gap-4 py-8 
        text-center md:text-left
      "
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-white">
        Welcome to <span className="text-bright-sun-400">TalentHub</span>
      </h2>

      <form
        onSubmit={onHandleSubmit}
        className="flex flex-col gap-4 mt-4 w-full max-w-sm mx-auto md:mx-0"
      >
        <TextInput
          leftSection={<IconAt />}
          label="Your email"
          placeholder="Enter your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
          withAsterisk
          size="md"
        />
        <PasswordInput
          leftSection={<IconLock />}
          label="Password"
          placeholder="Enter your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
          withAsterisk
          size="md"
        />

        <Button
          type="submit"
          variant="filled"
          autoContrast
          fullWidth
          className="mt-2"
        >
          Login
        </Button>
      </form>

      <div className="text-sm text-gray-300 mt-4 text-center md:text-left">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-bright-sun-400 hover:underline font-medium"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
