import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "./userSlice";

const useAuth = () => {
    const user = useSelector(selectUser);
    return user;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;