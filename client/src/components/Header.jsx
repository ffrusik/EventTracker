import { Link, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { me } from "../util/http";

export default function Header() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: me,
  });

  function handleSignOut() {
    localStorage.removeItem("token");

    queryClient.setQueryData(["user"], null);

    navigate("/");
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Navigation */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Event<span className="text-blue-600">Tracker</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/events"
              className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
            >
              Events
            </Link>
          </nav>
        </div>

        {/* User navigation */}
        <nav>
          {isError ? (
            <p className="text-sm text-red-600">
              {error.info?.message || "Failed to fetch user data"}
            </p>
          ) : isLoading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : data ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{data.email}</span>

              <button
                onClick={handleSignOut}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
