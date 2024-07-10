import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const status = useSelector(state => state.authorization.status);
    const navigate = useNavigate();

    console.log(status)
    useEffect(() => {
        if (status !== "authorized") {
            navigate('/authorization/login');
        }
    }, [status, navigate]);

    return children;
}

export default ProtectedRoute;
