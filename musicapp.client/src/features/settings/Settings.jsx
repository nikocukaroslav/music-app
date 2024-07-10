import Button from "@/ui/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLanguage,
  toggleJumpControls,
} from "@/features/settings/settingsSlice.js";
import { translation } from "@/features/settings/language.js";
import AccountSettings from "@/features/settings/AccountSettings.jsx";
import TranslateSvg from "@/svg/TranslateSvg.jsx";
import ThemeSvg from "@/svg/ThemeSvg.jsx";
import SkipEndSvg from "@/svg/SkipEndSvg.jsx";

function Settings({ global = false }) {
  const showJumpControls = useSelector(
    (state) => state.settings.showJumpControls,
  );
  const language = useSelector((state) => state.settings.language);

  const dispatch = useDispatch();

  function handleJumpControls() {
    dispatch(toggleJumpControls());
  }

  function handleLanguage(e) {
    dispatch(changeLanguage(e.target.value));
    window.location.reload();
  }

  return (
    <section className={`${global ? "" : "m-4"} w-full`}>
      <ul className="flex flex-col h-full gap-3 w-full">
        <li className="rounded-md main-color border-2 border-color p-3 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <TranslateSvg />
            <h3 className="text-xl">{translation.Language}</h3>
          </div>
          <select
            className={`background-color rounded-md p-2.5 ${global ? "w-1/3" : "w-1/6"} outline-none`}
            onChange={handleLanguage}
          >
            <option value="eng" selected={language === "eng"}>
              English
            </option>
            <option value="uk" selected={language === "uk"}>
              Українська
            </option>
          </select>
        </li>
        <li className="rounded-md main-color border-2 border-color p-3 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <ThemeSvg />
            <h3 className="text-xl">{translation.Theme}</h3>
          </div>
          <select
            className={`rounded-md background-color p-2.5 ${global ? "w-1/3" : "w-1/6"} outline-none`}
            onChange={handleLanguage}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </li>

        {!global && (
          <li className="rounded-md main-color p-3 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <SkipEndSvg h="6" w="6" className="-ml-1 icon-color" />

              <h3 className="text-xl">{translation.ShowJumpControls}</h3>
            </div>
            <div className="rounded-md overflow-hidden w-64">
              <Button
                className="background-color w-1/2"
                rounded={false}
                onClick={handleJumpControls}
                clicked={showJumpControls}
              >
                On
              </Button>
              <Button
                className="background-color w-1/2"
                rounded={false}
                onClick={handleJumpControls}
                clicked={!showJumpControls}
              >
                Off
              </Button>
            </div>
          </li>
        )}
        {!global && <AccountSettings />}
      </ul>
    </section>
  );
}

export default Settings;
