import React from "react";
import { Routes, Route } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";
import LogOut from "./layout/LogOut";
import Login from "./layout/Login";
import AuthProvider from "./hook/useAuth";
import Users from "./layout/Users";
import Magazine from "./layout/Magazine";

function App() {
  return (
    <div className="container mx-auto">
      <AuthProvider>
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<Users />}>
            <Route path=":userId" element={<Users />} />
          </Route>
          <Route path="magazine" element={<Magazine />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
