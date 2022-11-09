import React from "react";
// import EditUserPage from "../components/page/editUserPage";
// import UserPage from "../components/page/UserPage";
import UserPage from "../components/page/UserPage";
import UserList from "../components/UserList";
import { useParams } from "react-router-dom";
import UserProvider from "../hook/useUser";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  console.log("userId", userId);
  return (
    <>
      <UserProvider>
        {" "}
        {userId ? <UserPage userId={userId.slice(1)} /> : <UserList />}
      </UserProvider>
    </>
  );
};

export default Users;
