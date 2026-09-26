import z from "zod";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router";

import { login } from "../util/http";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export default function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState([]);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/events");
    },
  });

  function loginAction(formData) {
    setErrors([]);

    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();

    const result = credentialsSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.issues);
      return;
    }

    mutation.mutate(result.data);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to continue tracking the topics you care about.
          </p>
        </div>

        <form
          action={loginAction}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="space-y-5">
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {errors.length > 0 && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-600">
                  {error.message}
                </p>
              ))}
            </div>
          )}

          {mutation.isError && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">
                {mutation.error.info?.message || mutation.error.message}
              </p>
            </div>
          )}

          <button
            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
