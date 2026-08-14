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
    <header className="flex flex-row justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <h1>
          <Link to="/events">Event Tracker</Link>
        </h1>
      </div>
      <nav>
        {isError ? (
          <p>Error: {error.info?.message || "Failed to fetch user data"}</p>
        ) : isLoading ? (
          <ul className="flex space-x-4">
            <li>Signing in...</li>
            <li>
              <button onClick={handleSignOut} disabled>
                Sign out
              </button>
            </li>
          </ul>
        ) : data ? (
          <ul className="flex space-x-4">
            <li>Signed in as {data.email}</li>
            <li>
              <button onClick={handleSignOut} className="hover:underline">
                Sign out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
