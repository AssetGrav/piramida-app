import React from "react";
import PropTypes from "prop-types";
import LevelList from "./LevelList";
import { Link } from "react-router-dom";

function User({ user }) {
  console.log("user_id", "users/:" + user._id);
  return (
    <li className="py-4 flex">
      <img className="h-10 w-10 rounded-full" src={user.image} alt="" />
      <div className="flex-1">
        <div className="px-4 flex-row">
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <LevelList list={user.levelList} />
        </div>
      </div>
      <Link to={":" + user._id}>
        <button className=" w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          open
        </button>
      </Link>
    </li>
  );
}

User.propTypes = {
  user: PropTypes.object,
};

export default User;
