import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import StatusMessage from "../Alert/StatusMessage";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../apis/user/usersAPI";
import { useAuth } from "../../AuthContext/AuthContext";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const mutation = useMutation({ mutationFn: loginAPI });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      login();
    }
  }, [mutation.isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 px-4 cyber-grid">
      {/* Radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-primary/20 rounded-full blur-3xl" />

      <div className="max-w-md w-full glass-panel-glow rounded-3xl p-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Access your neural writer space console
        </p>

        {/* Display loading */}
        {mutation.isPending && (
          <StatusMessage type="loading" message="Verifying credentials..." />
        )}
        {/* Display error */}
        {mutation.isError && (
          <StatusMessage
            type="error"
            message={mutation?.error?.response?.data?.message || "Login failed"}
          />
        )}
        {/* Display success */}
        {mutation.isSuccess && (
          <StatusMessage type="success" message="Identity verified. Redirecting..." />
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email input field */}
          <div>
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2"
            >
              Security Key (Email)
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="w-full bg-cyber-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary transition-all"
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-400 text-xs mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Password input field */}
          <div>
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2"
            >
              Access Passcode
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className="w-full bg-cyber-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary transition-all"
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-400 text-xs mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyber-primary to-cyber-accent shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Authorize Access
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/register"
            className="text-xs font-semibold text-cyber-secondary hover:text-cyber-secondary/80 transition-colors"
          >
            Create New Console Key (Register)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
