import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = () => {
    const general = useSelector(state => state.general);
    return general.user_id ? <Navigate to="/"/> : <Outlet/> 
}

export default AuthGuard;