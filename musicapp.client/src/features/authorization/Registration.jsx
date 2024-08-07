import Input from "@/ui/Input.jsx";
import Button from "@/ui/Button.jsx";
import {useEffect, useState} from "react";
import {generateGUID} from "@/helpers.js";
import CheckBox from "@/ui/CheckBox.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    resetStatus,
    setIsLoading,
    setStatus,
    setUserId,
    setUsername,
} from "@/features/authorization/authorizationSlice.js";
import {createUser} from "@/services/apiMusicApp.js";
import {translation} from "@/features/settings/language.js";
import KeySvg from "@/svg/KeySvg.jsx";
import UserSvg from "@/svg/UserSvg.jsx";
import AddUserSvg from "@/svg/AddUserSvg.jsx";

function Registration() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [loginIsValid, setLoginIsValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginExist, setIsLoginExist] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetStatus());
    }, [dispatch]);

    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoginExist(false);
        setPasswordIsValid(password.length >= 3);
        setLoginIsValid(login.length >= 3);

        if (password.length < 3 || login.length < 3) return;

        dispatch(setIsLoading(true));

        const user = {
            id: generateGUID(),
            login: login,
            password: password,
        };

        const result = await createUser(user);

        if (result.error) {
            setIsLoginExist(true);
        } else {
            dispatch(setStatus("authorized"));
            dispatch(setUserId(result.newUser.id));
            dispatch(setUsername(result.newUser.login));

            navigate("/music");
        }

        dispatch(setIsLoading(false));
    }

    return (
        <form className="flex flex-col gap-5 h-full max-[764px]:text-sm" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
        <span className="flex items-center gap-3">
          <UserSvg/>
            {translation.CreateLogin}
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
            {translation.PickPassword}
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
            {!loginIsValid && (
                <p className="text-xl max-[764px]:text-sm text-red-500">
                    {translation.PasswordShouldBeLonger}
                </p>
            )}
            {!passwordIsValid && (
                <p className="text-xl max-[764px]:text-sm text-red-500">
                    {translation.LoginShouldBeLonger}
                </p>
            )}
            {isLoginExist && (
                <p className="text-xl max-[764px]:text-sm text-red-500">{translation.LoginAlreadyExist}</p>
            )}
            <Button className="border-2 border-color mt-auto flex items-center gap-3 justify-center">
                <AddUserSvg className="svg-6"/>
                {translation.CreateAccount}
            </Button>
        </form>
    );
}

export default Registration;
