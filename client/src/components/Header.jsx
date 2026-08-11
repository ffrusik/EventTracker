import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <h1>
          <Link to="/events">Event Tracker</Link>
        </h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
