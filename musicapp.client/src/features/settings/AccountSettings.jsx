import BigButton from "@/ui/BigButton.jsx";
import Input from "@/ui/Input.jsx";
import Button from "@/ui/Button.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUsername} from "@/features/authorization/authorizationSlice.js";
import {changeLogin, changePassword, deleteUser} from "@/services/apiMusicApp.js";
import {setIsLoadingSettings} from "@/features/settings/settingsSlice.js";
import {fetchMusic, removeMusic} from "@/features/music/musicSlice.js";
import {useNavigate} from "react-router-dom";
import ConfirmDeletingForm from "@/ui/ConfirmDeletingForm.jsx";
import CrossSvg from "@/svg/CrossSvg.jsx";
import ChevronSvg from "@/svg/ChevronSvg.jsx";

function AccountSettings() {
    const [loginChanging, setLoginChanging] = useState(false);
    const [passwordChanging, setPasswordChanging] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [deletingFormActive, setDeletingFormActive] = useState(false);
    const userId = useSelector(state => state.authorization.userId);
    const music = useSelector(state => state.music.music);

    const dispatch = useDispatch();

    const navigate = useNavigate();

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

    function handleDeletingFormActive() {
        setDeletingFormActive(!deletingFormActive)
    }

    async function handleSubmitChangeLogin(e) {
        e.preventDefault();
        dispatch(setIsLoadingSettings(true))

        const user = {
            id: userId,
            login: login,
            password: password,
        }

        const result = await changeLogin(user);

        console.log(result)

        if (result.status === "successful")
            dispatch(setUsername(login));

        dispatch(setIsLoadingSettings(false))
    }

    async function handleSubmitChangePassword(e) {
        e.preventDefault();
        dispatch(setIsLoadingSettings(true))

        const user = {
            id: userId,
            login: login,
            password: password,
        }

        const result = await changePassword(user);

        console.log(result)

        dispatch(setIsLoadingSettings(false))
    }

    async function deleteAccount() {
        dispatch(setIsLoadingSettings(true));
        dispatch(fetchMusic());

        await Promise.all(music.map(song => dispatch(removeMusic(song.id))));

        if (music.length === 0)
            await deleteUser(userId);

        dispatch(setIsLoadingSettings(false));

        navigate("/authorization/login")
    }

    return (
        <>
            <li>
                <BigButton className={`${loginChanging && "rounded-b-none"} py-5 px-3 relative items-center`}
                           onClick={handleLoginChangingActive}> <span>Change
                        login</span> <span className="absolute top-1/2 -translate-y-2/4 end-5">{loginChanging ?
                    <CrossSvg h="6" w="6" className="bg-inherit"/> :
                    <ChevronSvg w="8" h="8" className="bg-inherit"/>} </span>
                </BigButton>
                {
                    loginChanging &&
                    <form
                        onSubmit={handleSubmitChangeLogin}
                        className="flex gap-5 items-center second-color p-3 rounded-b-md">
                        <label className="flex gap-5 items-center w-1/2">
                            <span className="w-1/3">New login</span>
                            <Input
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                type="text"
                            />
                        </label>
                        <label className="flex gap-5 items-center w-1/2 ">
                            <span className="w-1/3">Confirm password</span>
                            <Input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </label>
                        <Button
                            className="w-[10%] border-2 border-color main-color hover:bg-gray-700"
                            padding="1">Save</Button>
                    </form>
                }
            </li>
            <li>
                <BigButton className={`${passwordChanging && "rounded-b-none"} py-5 px-3 relative items-center`}
                           onClick={handlePasswordChangingActive}> <span>Change
                        login</span> <span className="absolute top-1/2 -translate-y-2/4 end-5">{passwordChanging ?
                    <CrossSvg h="6" w="6" className="bg-inherit"/> :
                    <ChevronSvg w="8" h="8" className="bg-inherit"/>} </span>
                </BigButton>
                {
                    passwordChanging &&
                    <form
                        onSubmit={handleSubmitChangePassword}
                        className="flex gap-5 items-center second-color p-3 rounded-b-md">
                        <label className="flex gap-5 items-center w-1/2">
                            <span className="w-1/3">Confirm password</span>
                            <Input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"

                            />
                        </label>
                        <label className="flex gap-5 items-center w-1/2">
                            <span className="w-1/3">New password</span>
                            <Input
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                type="password"
                            />
                        </label>
                        <Button
                            className="w-[10%] border-2 border-color main-color hover:bg-gray-700"
                            padding="1">Save</Button>
                    </form>
                }
            </li>
            <li className="self-end ">
                <BigButton
                    className="bg-red-600 hover:bg-red-700 w-52"
                    onClick={handleDeletingFormActive}>
                    Delete account
                </BigButton>
                {
                    deletingFormActive &&
                    <ConfirmDeletingForm onCancel={handleDeletingFormActive} onDelete={deleteAccount}/>
                }
            </li>
        </>
    );
}

export default AccountSettings;