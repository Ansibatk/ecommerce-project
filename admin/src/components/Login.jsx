import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        backendUrl + "/api/user/admin",
        { email, password }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.data);
        setToken(response.data.data);
        toast.success("Login Successful");
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center w-full
        bg-gray-100 text-gray-900
        dark:bg-gray-950 dark:text-gray-100
      "
    >
      <div
        className="
          bg-white shadow-xl rounded-lg px-8 py-6 max-w-md w-full
          border border-gray-200
          dark:bg-gray-900 dark:border-gray-700
        "
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Admin Panel
        </h1>

        <form onSubmit={onSubmitHandler}>

          {/* Email */}
          <div className="mb-4 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="
                rounded-md border border-gray-300 px-3 py-2 w-full
                bg-white text-gray-900
                focus:outline-none focus:ring-2 focus:ring-black
                dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
                dark:focus:ring-gray-400
                placeholder-gray-500 dark:placeholder-gray-400
              "
              type="email"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
              Password
            </p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="
                rounded-md border border-gray-300 px-3 py-2 w-full
                bg-white text-gray-900
                focus:outline-none focus:ring-2 focus:ring-black
                dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
                dark:focus:ring-gray-400
                placeholder-gray-500 dark:placeholder-gray-400
              "
              type="password"
              placeholder="********"
              required
            />
          </div>

          {/* Login Button */}
          <button
            className="
              mt-2 w-full py-2 px-4 rounded-md text-white bg-gray-900 
              hover:bg-gray-800 transition
              dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300
              font-semibold
            "
            type="submit"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
