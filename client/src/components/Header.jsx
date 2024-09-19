import { Link } from "react-router-dom";

const Header = () => {
  let currentUser;
  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="flex justify-between items-cente pr-4 w-max-w-4xl  lg:max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl  flex flex-wrap">
            <span className="text-slate-500">UK </span>
            <span className="text-slate-700"> &nbsp; Real State</span>
          </h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/register">
            <li className="text-slate-700 hover:underline"> Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
