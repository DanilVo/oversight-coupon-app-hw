import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import userService from "../../../Services/UserService";
import AdminDashboard from "../../DashboardArea/AdminDashboard/AdminDashboard";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";

/*
  Functionality that is presented in this route: 
  - Conditional routing based on login status
*/

function Routing(): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserModel>();
  const userFromStore = authStore.getState().user;
  const token = localStorage.getItem("token");

  const fetchUser = async (id: string) => {
    await userService.getSingleUser(id);
  };

  useEffect(() => {
    if (token && !userInfo) {
      const user = JSON.parse(atob(token));      
      fetchUser(user.id);
    }
  }, [token, userInfo]);

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setUserInfo(authStore.getState().user);
    });

    return () => unsubscribe();
  }, [userFromStore]);

  return (
    <div className="Routing">
      <Routes>
        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        <Route
          path="/dashboard"
          element={token ? <AdminDashboard /> : <PageNotFound />}
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Page not found Route*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
