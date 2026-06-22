import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfileAPI } from "../../apis/user/usersAPI";
import StatusMessage from "../Alert/StatusMessage";
import { generateContentAPI } from "../../apis/chatGPT/chatGPT";

const BlogPostAIAssistant = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });

  const mutation = useMutation({ mutationFn: generateContentAPI });

  const formik = useFormik({
    initialValues: {
      prompt: "",
      tone: "",
      category: "",
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required("A prompt is required"),
      tone: Yup.string().required("Selecting a tone is required"),
      category: Yup.string().required("Selecting a category is required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(
        `Generate a blog post based on prompt: "${values.prompt}", category: "${values.category}", tone: "${values.tone}"`
      );
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <StatusMessage type="loading" message="Loading console profile..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4">
        <StatusMessage type="error" message={error?.response?.data?.message || "Failed to load profile"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center pt-28 pb-16 px-4 cyber-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-primary/10 rounded-full blur-3xl" />

      <div className="glass-panel-glow rounded-3xl max-w-2xl w-full p-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center tracking-wider">
          AI GENERATION CORE
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Formulate neural prompts to generate creative assets
        </p>

        {/* Plan and Credits Header */}
        <div className="flex flex-wrap justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 uppercase">Active License:</span>
            <span className="text-sm font-bold text-cyber-secondary uppercase">
              {data?.user?.subscriptionPlan}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 uppercase">Frequency Credits:</span>
            <span className="text-sm font-bold text-cyber-primary">
              {data?.user?.monthlyRequestCount - data?.user?.apiRequestCount} / {data?.user?.monthlyRequestCount} left
            </span>
          </div>
        </div>

        {/* Loading / Success States */}
        {mutation?.isPending && (
          <StatusMessage type="loading" message="Processing neural node..." />
        )}
        {mutation?.isError && (
          <StatusMessage
            type="error"
            message={mutation?.error?.response?.data?.message || "Generation node failed"}
          />
        )}
        {mutation?.isSuccess && (
          <StatusMessage type="success" message="Content generated successfully!" />
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
          {/* Prompt input field */}
          <div>
            <label
              htmlFor="prompt"
              className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2"
            >
              System Prompt (Topic / Core Idea)
            </label>
            <input
              id="prompt"
              type="text"
              {...formik.getFieldProps("prompt")}
              className="w-full bg-cyber-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary transition-all"
              placeholder="e.g. The impact of quantum computing on modern cryptography"
            />
            {formik.touched.prompt && formik.errors.prompt && (
              <div className="text-red-400 text-xs mt-1">{formik.errors.prompt}</div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tone selection field */}
            <div>
              <label
                htmlFor="tone"
                className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2"
              >
                Tone Preset
              </label>
              <select
                id="tone"
                {...formik.getFieldProps("tone")}
                className="w-full bg-cyber-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary transition-all"
              >
                <option value="" className="bg-cyber-bg">Select Tone...</option>
                <option value="formal" className="bg-cyber-bg">Formal</option>
                <option value="informal" className="bg-cyber-bg">Informal</option>
                <option value="humorous" className="bg-cyber-bg">Humorous</option>
              </select>
              {formik.touched.tone && formik.errors.tone && (
                <div className="text-red-400 text-xs mt-1">{formik.errors.tone}</div>
              )}
            </div>

            {/* Category selection field */}
            <div>
              <label
                htmlFor="category"
                className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2"
              >
                Subject Domain (Category)
              </label>
              <select
                id="category"
                {...formik.getFieldProps("category")}
                className="w-full bg-cyber-bg/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary transition-all"
              >
                <option value="" className="bg-cyber-bg">Select Category...</option>
                <option value="technology" className="bg-cyber-bg">Technology</option>
                <option value="health" className="bg-cyber-bg">Health</option>
                <option value="business" className="bg-cyber-bg">Business</option>
              </select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-400 text-xs mt-1">{formik.errors.category}</div>
              )}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyber-primary to-cyber-accent shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
          >
            Compute Content Output
          </button>
        </form>

        {/* Display generated content */}
        {mutation.isSuccess && mutation.data && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-cyber-secondary/20 text-cyber-secondary text-[10px] font-bold tracking-widest px-3 py-1 rounded-br-xl uppercase">
              Output Data Stream
            </div>
            <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed mt-4">
              {mutation.data}
            </p>
          </div>
        )}

        <div className="text-center mt-6">
          <Link
            to="/history"
            className="text-xs font-semibold text-cyber-secondary hover:text-cyber-secondary/80 transition-colors"
          >
            View History logs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostAIAssistant;
