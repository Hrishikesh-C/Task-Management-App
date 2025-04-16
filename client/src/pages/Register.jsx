import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import Loading from "../components/Loader";
import { motion } from "framer-motion";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        title: data.title,
        role: data.role,
        isAdmin: data.role === "admin",
      }).unwrap();

      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <motion.div
        className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-32 py-12"
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

          {/* Ball Animation */}
          <div className="cell mt-10">
            <div className="circle rotate-in-up-left bg-gradient-to-r from-purple-400 to-pink-500"></div>
          </div>
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div
          className="w-full max-w-md bg-[#1e293b]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 text-white"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-purple-300 text-3xl font-bold text-center mb-2">
            Create Account
          </p>
          <p className="text-center text-sm text-gray-400 mb-6">
            Join us and manage your tasks effectively!
          </p>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
            <Textbox
              placeholder="Full Name"
              type="text"
              name="name"
              label="Name"
              register={register("name", { required: "Name is required!" })}
              error={errors.name?.message}
              className="bg-[#1e293b] text-white placeholder:text-gray-400 w-full"
            />

            <Textbox
              placeholder="email@example.com"
              type="email"
              name="email"
              label="Email"
              register={register("email", { required: "Email is required!" })}
              error={errors.email?.message}
              className="bg-[#1e293b] text-white placeholder:text-gray-400 w-full"
            />

            <Textbox
              placeholder="Your Title (e.g., Developer)"
              type="text"
              name="title"
              label="Title"
              register={register("title", { required: "Title is required!" })}
              error={errors.title?.message}
              className="bg-[#1e293b] text-white placeholder:text-gray-400 w-full"
            />

            <Textbox
              placeholder="Password"
              type="password"
              name="password"
              label="Password"
              register={register("password", { required: "Password is required!" })}
              error={errors.password?.message}
              className="bg-[#1e293b] text-white placeholder:text-gray-400 w-full"
            />

            <Textbox
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              register={register("confirmPassword", {
                required: "Confirm Password is required!",
                validate: (value) => value === watch("password") || "Passwords do not match!",
              })}
              error={errors.confirmPassword?.message}
              className="bg-[#1e293b] text-white placeholder:text-gray-400 w-full"
            />

            <div>
              <label className="block text-sm font-medium text-gray-400">Role</label>
              <select
                {...register("role", { required: "Role is required!" })}
                className="mt-1 w-full px-4 py-2 bg-[#1e293b] text-white placeholder:text-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                label="Register"
                className="w-full h-10 bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold rounded-full shadow-lg transition"
              />
            )}
          </form>

          <p className="text-sm text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link to="/log-in" className="text-purple-400 hover:underline font-medium">
              Login
            </Link>
          </p>

          <div className="text-center mt-12">
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

export default Register;
