import Input from "@/ui/Input.jsx";
import Button from "@/ui/Button.jsx";
import CheckBox from "@/ui/CheckBox.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    resetStatus,
    setIsLoading,
    setStatus,
    setUserId,
    setUsername
} from "@/features/authorization/authorizationSlice.js";
import {loginUser} from "@/services/apiMusicApp.js";
import {translation} from "@/features/settings/language.js";

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isIdentified, setIsIdentified] = useState(true);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetStatus())
    }, [dispatch]);

    async function handleSubmit(e) {
        e.preventDefault();

        dispatch(setIsLoading(true))

        const user = {
            login: login,
            password: password,
        }

        const result = await loginUser(user)

        dispatch(setStatus(result.status))
        dispatch(setUsername(result.login))
        dispatch(setUserId(result.id))

        if (result.status === "authorized") {
            navigate("/music")
        } else {
            setIsIdentified(false)
            setTimeout(() =>
                setIsIdentified(true), 5000
            )
        }

        dispatch(setIsLoading(false))
    }

    return (
        <form className="flex flex-col gap-5 h-full"
              onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
                <span>{translation.Login}</span>
                <Input type="text"
                       required={true}
                       value={login}
                       onChange={(e) => setLogin(e.target.value)}/>
            </label>
            <label className="flex flex-col gap-2">
                <span>{translation.Password}</span>
                <Input type={showPassword ? "text" : "password"}
                       required={true}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label className="text-sm flex items-center gap-2 -mt-2">
                <CheckBox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="appearance-none h-5 w-5 border-2 border-gray-500
                        rounded checked:bg-gray-500 focus:outline-none hover:bg-gray-500 "/>
                <span>{translation.ShowPassword}</span>
            </label>
            {(!isIdentified && login.length > 0 && password.length > 0) &&
                <p className="text-xl text-red-500">{translation.LoginOrPasswordIsIncorrect}</p>}
            <Button className="main-color mt-auto">{translation.LogIn}</Button>
        </form>
    );
}

export default Login;