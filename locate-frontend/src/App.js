import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  FoundObject,
  AdminDashboard,
  LostObject,
  SignIn,
  SignUp,
  Profile,
} from "./pages/index";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="lost_object" element={<LostObject />} />
        <Route path="found_object" element={<FoundObject />} />
      </Route>
      <Route path="sign_in" element={<SignIn />} />
      <Route path="sign_up" element={<SignUp />} />
      <Route path="profile/:id" element={<Profile />} />
      <Route path="dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
