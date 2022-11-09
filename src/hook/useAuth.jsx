import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import users from "../api/users";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [levelUpId, setLevelUpId] = useState();

  useEffect(() => {
    if (pathname.substring(0, 2) === "/:") {
      setLevelUpId(pathname.substring(2, pathname.length));
    }
  }, []);

  const [levelUpList, setLevelUpList] = useState();
  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [newUserBoolean, setNewUserBoolean] = useState(false);
  const navigation = useNavigate();

  async function getUserData() {
    try {
      if (localStorage.getItem("auth")) {
        const content = JSON.parse(localStorage.getItem("auth"));
        setUser(content);
      }
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (levelUpId) {
      users.getById(levelUpId).then((data) => setLevelUpList(data.levelList));
    }
  }, [levelUpId]);

  function logOut() {
    localStorage.removeItem("auth");
    setUser(null);
    setNewUserBoolean(false);
    navigation("/");
  }
  const usersList = JSON.parse(localStorage.getItem("users"));

  async function signUp({ email, password, ...rest }) {
    const findEmail = await usersList.find((elem) => elem.email === email);
    try {
      if (findEmail === undefined) {
        let arr = levelUpList;
        if (arr.length === 0) {
          arr.push({
            _id: levelUpId,
            level: 1,
            value: "",
            bonus: 0,
          });
        } else if (arr.length === 1) {
          arr.push({
            _id: levelUpId,
            level: 2,
            value: "",
            bonus: 0,
          });
        } else if (arr.length === 2) {
          arr.push({
            _id: levelUpId,
            level: 3,
            value: "",
            bonus: 0,
          });
        } else if (arr.length === 3) {
          arr.splice(0, 1);
          arr.forEach((elem, index) => {
            elem.level = index + 1;
          });
          arr.push({
            _id: levelUpId,
            level: 3,
            value: "",
            bonus: 0,
          });
        }
        const createUser = { email, password, ...rest, levelList: arr };
        setUser(createUser);
        // добавление токена
        localStorage.setItem("auth", JSON.stringify(createUser));
        // добавление в список
        usersList.push(createUser);
        localStorage.setItem("users", JSON.stringify(usersList));
        setNewUserBoolean(true);
      }
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким email уже существует",
          };
          throw errorObject;
        }
      }
    }
  }
  async function singIn({ email, password }) {
    try {
      const findEmail = usersList.find(
        (elem) => elem.email === email && elem.password === password
      );
      if (findEmail !== undefined) {
        localStorage.setItem("auth", JSON.stringify(findEmail));
        await getUserData();
      }
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        switch (message) {
          case "EMAIL_NOT_FOUND":
            throw new Error("Email или пароль введены не корректно");
          case "INVALID_PASSWORD":
            throw new Error("Email или пароль введены не корректно");
          default:
            throw new Error("Слишком много попыток входа. Попробуйте позднее");
        }
      }
    }
  }

  function errorCatcher(error) {
    console.log(error.response);
    const { message } = error.response.data;
    setError(message);
  }
  console.log("error", error);
  return (
    <AuthContext.Provider
      value={{ signUp, currentUser, singIn, logOut, newUserBoolean }}
    >
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AuthProvider;
