import { Link } from "react-router-dom";

function Navbar() {

  const token =
    localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

  window.location.replace("/");
  };

  return (

    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          ResumeAI
        </Link>

        {/* MENU */}

        <div className="flex items-center gap-4">

          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Home
          </Link>

          {token ? (

            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white px-5 py-2 rounded-xl font-semibold shadow-md"
              >
                Logout
              </button>
            </>

          ) : (

            <Link
              to="/auth"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition-all duration-300 text-white px-5 py-2 rounded-xl font-semibold shadow-md"
            >
              Login
            </Link>

          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;