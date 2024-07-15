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
  setUsername,
} from "@/features/authorization/authorizationSlice.js";
import {loginUser} from "@/services/apiMusicApp.js";
import {translation} from "@/features/settings/language.js";
import UserSvg from "@/svg/UserSvg.jsx";
import KeySvg from "@/svg/KeySvg.jsx";
import LogInSvg from "@/svg/LogInSvg.jsx";

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isIdentified, setIsIdentified] = useState(true);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetStatus());
    }, [dispatch]);

    async function handleSubmit(e) {
        e.preventDefault();

        dispatch(setIsLoading(true));

        const user = {
            login: login,
            password: password,
        };

        const result = await loginUser(user);

        dispatch(setStatus(result.status));
        dispatch(setUsername(result.login));
        dispatch(setUserId(result.id));

        if (result.status === "authorized") {
            navigate("/music");
        } else {
            setIsIdentified(false);
            setTimeout(() => setIsIdentified(true), 5000);
        }

        dispatch(setIsLoading(false));
    }

    return (
        <form className="flex flex-col gap-5 h-full max-[764px]:text-sm" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
        <span className="flex items-center gap-3">
          <UserSvg/>
            {translation.Login}
        </span>
                <Input
                    type="text"
                    required={true}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </label>
            <label className="flex flex-col gap-2">
        <span className="flex items-center gap-3">
          <KeySvg/>
            {translation.Password}
        </span>
                <Input
                    type={showPassword ? "text" : "password"}
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label className="text-sm flex items-center gap-2 -mt-2">
                <CheckBox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="appearance-none h-5 w-5 border-2 border-color
                        rounded checked:background-color focus:outline-none hover:background-color"
                />
                <span className="max-[764px]:text-xs">{translation.ShowPassword}</span>
            </label>
            {!isIdentified && login.length > 0 && password.length > 0 && (
                <p className="text-xl text-red-500 max-[764px]:text-sm">
                    {translation.LoginOrPasswordIsIncorrect}
                </p>
            )}
            <Button
                className="border-2 border-color mt-auto flex items-center gap-3 justify-center"
                padding="2"
            >
                <LogInSvg h="8" w="8"/>
                {translation.LogIn}
            </Button>
        </form>
    );
}

export default Login;
