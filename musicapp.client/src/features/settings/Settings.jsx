import Button from "@/ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {changeLanguage, toggleJumpControls} from "@/features/settings/settingsSlice.js";
import {translation} from "@/features/settings/language.js";

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
        <section className={`${global ? "" : "p-3"}`}>
            <ul className="flex flex-col gap-3">
                <li className="flex flex-col gap-2">
                    <h3 className="text-xl">{translation.Language}</h3>
                    <select className={` w-40 rounded-xl ${global ? "main-color" : "second-color"} p-2.5 `}
                            onChange={handleLanguage}>
                        <option value="eng" selected={language === "eng"}>English</option>
                        <option value="uk" selected={language === "uk"}>Українська</option>
                    </select>
                </li>
                <li className="flex flex-col gap-2">
                    <h3 className="text-xl">{translation.Theme}</h3>
                    <select
                        className={`w-40 rounded-xl ${global ? "main-color" : "second-color"} p-2.5 outline-none`}
                        onChange={handleLanguage}>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </li>
                {!global && <li className="flex flex-col gap-2">
                    <h3 className="text-xl">{translation.ShowJumpControls}</h3>
                    <div className="rounded-xl overflow-hidden w-40">
                        <Button className="second-color w-1/2"
                                rounded={false}
                                onClick={handleJumpControls}
                                clicked={showJumpControls}>On</Button>
                        <Button className="second-color w-1/2"
                                rounded={false}
                                onClick={handleJumpControls}
                                clicked={!showJumpControls}>Off</Button>
                    </div>
                </li>}
            </ul>
        </section>
    );
}

export default Settings;