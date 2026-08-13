import z from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router";

import { login } from "../util/http";

// Define Zod schemas for validation
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export default function Login() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/events");
    },
  });

  function loginAction(formData) {
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
    <div className="flex flex-col w-4/12 p-2 mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-4">Login</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={loginAction}
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="text"
          placeholder="Email"
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:text-blue-700">
          Sign up
        </Link>
      </p>

      {mutation.isError && (
        <div className="mt-2">
          <p className="text-red-500">
            {mutation.error.message || "An error occurred."}
          </p>
        </div>
      )}
      {errors.length > 0 && (
        <div className="mt-2">
          {errors.map((error, index) => (
            <p key={index} className="text-red-500">
              {error.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
