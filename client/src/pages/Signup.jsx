import z from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { signUp } from "../util/http";

// Define Zod schemas for validation
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

const registerSchema = credentialsSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/login");
    },
  });

  function signUpAction(formData) {
    setErrors([]);

    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();
    const confirmPassword = formData.get("confirmPassword")?.trim();

    const result = registerSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setErrors(result.error.issues);
      return;
    }

    mutation.mutate(result.data);
  }

  return (
    <div className="flex flex-col w-4/12 p-2 mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-4">Sign Up</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={signUpAction}
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
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Password"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>
      {mutation.isError && (
        <div className="mt-2">
          <p className="text-red-500">
            {mutation.error.info?.message || mutation.error.message}
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
