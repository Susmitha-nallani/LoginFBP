import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../src/Components/Sidebar/sideBar";
import Login from "../src/Components/LoginPage/Login";
import SignUp from "../src/Components/SignUpPage/SignUp";
import Dashboard from "../src/Components/dashboard/dashboard";
import SecurityProfile from "../src/Components/securityProfile/securityProfile";
import UserProfile from "../src/Components/userProfile/userProfile";

import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <Routes>
                <Route path="/Sidebar" element={<Sidebar />} />
                <Route
                  path="/dashboard"
                  element={
                    <Layout>
                      <Dashboard />
                    </Layout>
                  }
                />
                <Route
                  path="/SecurityProfile"
                  element={
                    <Layout>
                      <SecurityProfile />
                    </Layout>
                  }
                />
                <Route
                  path="/userProfile"
                  element={
                    <Layout>
                      <UserProfile />
                    </Layout>
                  }
                />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
