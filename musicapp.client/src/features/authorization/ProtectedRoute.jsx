import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const status = useSelector(state => state.authorization.status.status);
    const navigate = useNavigate();

    useEffect(() => {
        if (status !== "authorized") {
            navigate('/Authorization/Login');
        }
    }, [status, navigate]);
    
    return children;
}

export default ProtectedRoute;
