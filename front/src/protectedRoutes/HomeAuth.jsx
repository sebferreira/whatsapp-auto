import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function HomeAuth() {
  const {user} = useAuth();
  if (user) {
    return <Navigate to="/tables" replace />;
  }
  return <Outlet />;
}

export default HomeAuth;
