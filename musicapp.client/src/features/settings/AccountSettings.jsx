import BigButton from "@/ui/BigButton.jsx";
import Input from "@/ui/Input.jsx";
import Button from "@/ui/Button.jsx";
import {translation} from "@/features/settings/language.js";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoading, setUsername} from "@/features/authorization/authorizationSlice.js";
import {changeLogin} from "@/services/apiMusicApp.js";

function AccountSettings() {
    const [loginChanging, setLoginChanging] = useState(false);
    const [passwordChanging, setPasswordChanging] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const userId = useSelector(state => state.authorization.userId);

    const dispatch = useDispatch();

    function handleLoginChangingActive() {
        setLoginChanging(!loginChanging);
        setPasswordChanging(false);
        setLogin("");
        setPassword("");
    }

    function handlePasswordChangingActive() {
        setPasswordChanging(!passwordChanging);
        setLoginChanging(false)
        setLogin("");
        setPassword("");
    }


    async function handleSubmitChangeLogin(e) {
        e.preventDefault();
        dispatch(setIsLoading(true))

        const user = {
            id: userId,
            login: login,
            password: password,
        }

        const result = await changeLogin(user);

        console.log(result)

        if (result.status === "successful")
            dispatch(setUsername(login));

        dispatch(setIsLoading(false))
    }

    function handleSubmitChangePassword(e) {
        e.preventDefault();
    }

    return (
        <>

            <h2 className="text-xl">Account settings</h2>
            <li>
                <BigButton className={`${loginChanging && "rounded-b-none"}`}
                           onClick={handleLoginChangingActive}>Change
                    login</BigButton>
                {
                    loginChanging &&
                    <form
                        onSubmit={handleSubmitChangeLogin}
                        className="w-64 flex flex-col gap-2 second-color p-2 rounded-b-md">
                        <label className="flex flex-col gap-1">
                            <span>New login</span>
                            <Input
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                type="text"
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span>Confirm password</span>
                            <Input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </label>
                        <div className="flex gap-3 ">
                            <Button
                                className="border-2 border-color hover:bg-gray-500 w-1/2"
                                padding="1"
                                onClick={() => setLoginChanging(false)}
                            >{translation.Cancel}</Button>
                            <Button
                                className="border-2 border-color main-color hover:bg-gray-700  w-1/2"
                                padding="1">Save</Button>
                        </div>
                    </form>
                }
            </li>
            <li>
                <BigButton className={`${passwordChanging && "rounded-b-none"}`}
                           onClick={handlePasswordChangingActive}>Change
                    password</BigButton>
                {
                    passwordChanging &&
                    <form
                        onSubmit={handleSubmitChangePassword}
                        className="w-64 flex flex-col gap-2 second-color p-2 rounded-b-md">
                        <label className="flex flex-col gap-1">
                            <span>Confirm password</span>
                            <Input
                                type="text"
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span>New password</span>
                            <Input
                                type="text"
                            />
                        </label>
                        <div className="flex gap-3 ">
                            <Button
                                className="border-2 border-color hover:bg-gray-500 w-1/2"
                                padding="1"
                                onClick={() => setPasswordChanging(false)}
                            >{translation.Cancel}</Button>
                            <Button
                                className="border-2 border-color main-color hover:bg-gray-700  w-1/2"
                                padding="1">Save</Button>
                        </div>
                    </form>
                }
            </li>
            <li>
                <BigButton className="bg-red-600 hover:bg-red-700">Delete account</BigButton>
            </li>
        </>
    );
}

export default AccountSettings;