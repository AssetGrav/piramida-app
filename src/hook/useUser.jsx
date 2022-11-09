import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import usersList from "../api/users";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBonus, setUserBonus] = useState();
  useEffect(() => {
    getUsers();
    getUserBonus();
  }, []);
  useEffect(() => {
    if (error !== null) {
      setError(null);
    }
  }, [error]);
  async function getUsers() {
    try {
      await usersList.fetchAll().then((data) => setUsers(data));
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function getUserBonus() {
    try {
      const userBonus = await JSON.parse(localStorage.getItem("bonus"));
      setUserBonus(userBonus);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function getUserById(userId) {
    return users.find((u) => u._id === userId);
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }
  return (
    <UserContext.Provider
      value={{ users, getUserById, getUsers, getUserBonus, userBonus }}
    >
      {!isLoading ? children : "Loading..."}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UserProvider;
