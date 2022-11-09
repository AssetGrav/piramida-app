import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import "../index.css";

function NavMenu() {
  const { currentUser } = useAuth();
  return (
    <div className="bg-gray-200 flex">
      <nav className="flex mt-2 py-5 grow">
        <Link to="/" className={!currentUser ? "disabled-link" : ""}>
          <div className="bg-blue-500 hover:bg-blue-700 text-white ml-5 font-bold py-2 px-4 rounded">
            Home
          </div>
        </Link>
        <Link to="users" className={!currentUser ? "disabled-link" : ""}>
          <div className="bg-blue-500 hover:bg-blue-700 text-white ml-5 font-bold py-2 px-4 rounded">
            Users
          </div>
        </Link>
        <Link to="magazine" className={!currentUser ? "disabled-link" : ""}>
          <div className="bg-blue-500 hover:bg-blue-700 text-white ml-5 font-bold py-2 px-4 rounded">
            Magazine
          </div>
        </Link>
      </nav>

      {!currentUser ? (
        <Link to="login">
          <div className="m-5 bg-green-400 hover:bg-blue-700 text-white ml-5 font-bold py-2 px-4 rounded">
            войти
          </div>
        </Link>
      ) : (
        <Link to="logout">
          <div className="m-5 bg-green-400 hover:bg-blue-700 text-white ml-5 font-bold py-2 px-4 rounded">
            выйти
          </div>
        </Link>
      )}
    </div>
  );
}

NavMenu.propTypes = {};

export default NavMenu;
