import Button from "@/ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {changeLanguage, toggleJumpControls} from "@/features/settings/settingsSlice.js";
import {translation} from "@/features/settings/language.js";
import AccountSettings from "@/features/settings/AccountSettings.jsx";
import TranslateSvg from "@/svg/TranslateSvg.jsx";

function Settings({global = false}) {
    const showJumpControls = useSelector(state => state.settings.showJumpControls)
    const language = useSelector(state => state.settings.language);

    const dispatch = useDispatch();

    function handleJumpControls() {
        dispatch(toggleJumpControls())
    }

    function handleLanguage(e) {
        dispatch(changeLanguage(e.target.value))
        window.location.reload();
    }

    return (
        <section className={`${global ? "" : "m-4"} w-full`}>
            <ul className="flex flex-col h-full gap-3 w-full">
                <li className="rounded-md second-color p-3 flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <TranslateSvg/>
                        <h3 className="text-xl">{translation.Language}</h3>
                    </div>
                    <select className={`main-color rounded-md p-2.5 w-1/6 hover:hover-color transition`}
                            onChange={handleLanguage}>
                        <option value="eng" selected={language === "eng"}>English</option>
                        <option value="uk" selected={language === "uk"}>Українська</option>
                    </select>
                </li>
                <li className="rounded-md second-color p-3 flex justify-between items-center">
                    <h3 className="text-xl">{translation.Theme}</h3>
                    <select className={`main-color rounded-md p-2.5 w-1/6 hover:hover-color transition`}
                            onChange={handleLanguage}>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </li>

                {!global && <li className="rounded-md second-color p-3 flex justify-between items-center">
                    <h3 className="text-xl">{translation.ShowJumpControls}</h3>
                    <div className="rounded-md overflow-hidden w-64">
                        <Button className="main-color w-1/2"
                                rounded={false}
                                onClick={handleJumpControls}
                                clicked={showJumpControls}>On</Button>
                        <Button className="main-color w-1/2"
                                rounded={false}
                                onClick={handleJumpControls}
                                clicked={!showJumpControls}>Off</Button>
                    </div>
                </li>
                }
                {!global && <AccountSettings/>}
            </ul>
        </section>
    );
}

export default Settings;