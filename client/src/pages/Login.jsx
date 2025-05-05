import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import Loading from "../components/Loader";
import { motion } from "framer-motion";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      if (data.email === "Admin@gmail.com") {
        if (data.password === "HRISHIsham@63") {
          const adminUser = {
            name: "Admin",
            email: data.email,
            role: "admin",
            token: "fake_admin_token_123",
          };
          dispatch(setCredentials(adminUser));
          navigate("/dashboard");
          return;
        } else {
          toast.error("Invalid admin credentials");
          return;
        }
      }

      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <motion.div
        className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-28 py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Left Side */}
        <motion.div
          className="text-center lg:text-left max-w-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="inline-block mb-4 text-sm font-medium text-purple-300 bg-[#1f2d3d] px-3 py-1 rounded-full shadow-md">
            Manage all your tasks in one place!
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Real-Time <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Task Manager
            </span>
          </h1>
          {/* Neon Ball Animation */}
          <div className="cell mt-10">
            <div className="circle rotate-in-up-left bg-gradient-to-r from-purple-400 to-pink-500"></div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          className="w-full max-w-md bg-[#1e293b]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 text-white"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-purple-300 text-3xl font-bold text-center mb-2">
            Welcome back!
          </p>
          <p className="text-center text-sm text-gray-400 mb-6">
            Keep all your credentials safe.
          </p>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
            <Textbox
              placeholder="email@example.com"
              type="email"
              name="email"
              label="Email Address"
              className="bg-[#1e293b] text-white placeholder:text-gray-300 placeholder:text-lg w-full"
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <Textbox
              placeholder="Your password"
              type="password"
              name="password"
              label="Password"
              className="bg-[#1e293b] text-white placeholder:text-gray-300 placeholder:text-lg w-full"
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />

            <div className="text-sm text-right">
              <span className="text-gray-400 hover:text-purple-300 hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                label="Login"
                className="w-full h-10 bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold rounded-full shadow-lg transition"
              />
            )}

            <p className="text-sm text-gray-400 text-center mt-4">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-purple-400 hover:underline font-medium"
              >
                Create an account
              </Link>
            </p>
          </form>

          <div className="text-center mt-10">
            <Link
              to="/"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
