import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import AdminDashboard from "../../DashboardArea/AdminDashboard/AdminDashboard";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import { authStore } from "../../../Redux/AuthState";

function Routing(): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserModel>();
  const userFromStore = authStore.getState().user;
  const token = localStorage.getItem("token");

  const fetchUser = async (id: string) => {
    await authService.getSingleUser(id);
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
