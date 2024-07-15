import Button from "@/ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {changeLanguage, changeTheme, toggleJumpControls,} from "@/features/settings/settingsSlice.js";
import {translation} from "@/features/settings/language.js";
import AccountSettings from "@/features/settings/AccountSettings.jsx";
import TranslateSvg from "@/svg/TranslateSvg.jsx";
import ThemeSvg from "@/svg/ThemeSvg.jsx";
import SkipEndSvg from "@/svg/SkipEndSvg.jsx";

function Settings({global = false}) {
    const showJumpControls = useSelector(
        (state) => state.settings.showJumpControls,
    );
    const language = useSelector((state) => state.settings.language);
    const theme = useSelector((state) => state.settings.theme);

    const dispatch = useDispatch();

    function handleJumpControls() {
        dispatch(toggleJumpControls());
    }

    function handleLanguage(e) {
        dispatch(changeLanguage(e.target.value));
        window.location.reload();
    }

    function handleTheme(e) {
        dispatch(changeTheme(e.target.value));
        window.location.reload();
    }

    return (
        <section className={`${global ? "" : "m-4"} w-full text-xl max-[764px]:text-sm `}>
            <ul className="flex flex-col h-full gap-3 w-full">
                <li
                    className={`rounded-md main-color ${global && "border-2 border-color "} max-[764px]:p-2 p-3 flex justify-between items-center`}
                >
                    <div className="flex gap-3 items-center">
                        <TranslateSvg/>
                        <h3>{translation.Language}</h3>
                    </div>
                    <select
                        className={`background-color rounded-md p-2.5 ${global ? "w-1/3" : "w-1/6"} outline-none max-[764px]:w-1/3`}
                        onChange={handleLanguage}
                        value={language}
                    >
                        <option value="eng">English</option>
                        <option value="uk">Українська</option>
                    </select>
                </li>
                <li
                    className={`rounded-md main-color ${global && "border-2 border-color "} max-[764px]:p-2 p-3 flex justify-between items-center`}
                >
                    <div className="flex gap-3 items-center">
                        <ThemeSvg/>
                        <h3>{translation.Theme}</h3>
                    </div>
                    <select
                        className={`rounded-md background-color p-2.5 ${global ? "w-1/3" : "w-1/6"} outline-none max-[764px]:w-1/3`}
                        onChange={handleTheme}
                        value={theme}
                    >
                        <option value="light">{translation.Light}</option>
                        <option value="dark">{translation.Dark}</option>
                        <option value="gray">{translation.Gray}</option>
                        <option value="neon">{translation.Neon}</option>
                    </select>
                </li>

                {!global && (
                    <li className="rounded-md main-color max-[764px]:p-2 p-3 flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                            <SkipEndSvg h="6" w="6" className="-ml-1 icon-color svg-6"/>

                            <h3 className="pr-2">{translation.ShowJumpControls}</h3>
                        </div>
                        <div className="rounded-md overflow-hidden w-1/6 max-[764px]:w-1/3">
                            <Button
                                className="background-color w-1/2 "
                                rounded={false}
                                onClick={handleJumpControls}
                                clicked={showJumpControls}
                            >
                                {translation.On}
                            </Button>
                            <Button
                                className="background-color w-1/2"
                                rounded={false}
                                onClick={handleJumpControls}
                                clicked={!showJumpControls}
                            >
                                {translation.Off}
                            </Button>
                        </div>
                    </li>
                )}
                {!global && <AccountSettings/>}
            </ul>
        </section>
    );
}

export default Settings;
