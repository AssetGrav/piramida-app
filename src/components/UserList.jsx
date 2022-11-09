import React, { useEffect } from "react";
import { useAuth } from "../hook/useAuth";
import { useUser } from "../hook/useUser";
import User from "./User";

function UserList() {
  const { newUserBoolean } = useAuth();
  const { users, getUsers } = useUser();

  useEffect(() => {
    getUsers();
  }, [newUserBoolean]);

  return (
    <div className="container">
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <div key={user._id}>
            <User user={user} />
          </div>
        ))}
      </ul>
    </div>
  );
}
UserList.propTypes = {};

export default UserList;
