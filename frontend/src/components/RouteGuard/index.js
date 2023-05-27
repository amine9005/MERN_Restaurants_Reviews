import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteGuard = () => {
    const general = useSelector(state => state.general);
    return general.user_id ? <Outlet/> : <Navigate to="/login"/>
}

export default RouteGuard;