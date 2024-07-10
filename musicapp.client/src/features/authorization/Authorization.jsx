import { NavLink, Outlet } from "react-router-dom";
import Loader from "@/ui/Loader.jsx";
import { useSelector } from "react-redux";
import SettingsSvg from "@/svg/SettingsSvg.jsx";
import { translation } from "@/features/settings/language.js";

function Authorization() {
  const isLoading = useSelector((state) => state.authorization.isLoading);
  return (
    <>
      {isLoading && <Loader />}
      <div className="absolute left-3 bottom-3">
        <NavLink
          className="p-3 main-color border-2 border-gray-700 text-xl rounded-xl
                    hover:bg-inherit transition flex gap-3 items-center"
          to="globalsettings"
        >
          <SettingsSvg h={8} w={8} />
        </NavLink>
      </div>
      <main className="bg-gradient-to-bl gradient-color h-screen flex items-center justify-center">
        <div className="h-2/3 w-1/3 main-color rounded-xl overflow-hidden relative">
          <nav className="shadow-xl flex divide-x-2 divide-gray-700 text-center absolute w-full">
            <NavLink
              className={({ isActive }) => {
                return `w-1/2 hover:hover-color p-3 transition ${isActive && "hover-color"}`;
              }}
              to="login"
            >
              {translation.LogIn}
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return `w-1/2 hover:hover-color p-3 transition ${isActive && "hover-color"}`;
              }}
              to="registration"
            >
              {translation.Registration}
            </NavLink>
          </nav>
          <div className="py-6 px-6 h-full pt-16 text-xl">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export default Authorization;
