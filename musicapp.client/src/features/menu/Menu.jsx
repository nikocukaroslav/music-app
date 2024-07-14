import "../../index.css";
import { NavLink } from "react-router-dom";
import MusicSvg from "@/svg/MusicSvg.jsx";
import AlbumSvg from "@/svg/AlbumSvg.jsx";
import SettingsSvg from "@/svg/SettingsSvg.jsx";
import { translation } from "@/features/settings/language.js";

function Menu() {
  return (
    <nav
      className="h-full w-1/6 min-w-52 py-1 main-color  max-[764px]:min-w-[unset] max-[764px]:w-fit
             flex flex-col menu-shadow "
    >
      <ul className="flex flex-col gap-1 h-full">
        <li>
          <NavLink
            className={({ isActive }) => {
              return `p-3 text-xl hover:hover-color transition flex gap-3 items-center 
                            ${isActive && "hover-color"}`;
            }}
            to="/music"
          >
            <MusicSvg className="max-[764px]:h-8 max-[764px]:w-8 icon-color" />
            <span className="max-[764px]:hidden">{translation.Music}</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return `p-3 text-xl hover:hover-color transition flex gap-3 items-center 
                            ${isActive && "hover-color"}`;
            }}
            to="/albums"
          >
            <AlbumSvg className="max-[764px]:h-8 max-[764px]:w-8 icon-color" />
            <span className="max-[764px]:hidden">{translation.Albums}</span>
          </NavLink>
        </li>
        <li className="">
          <NavLink
            className={({ isActive }) => {
              return `p-3 text-xl hover:hover-color transition flex gap-3 items-center 
                            ${isActive && "hover-color"}`;
            }}
            to="/settings"
          >
            <SettingsSvg className="max-[764px]:h-8 max-[764px]:w-8 icon-color" />
            <span className="max-[764px]:hidden">{translation.Settings}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
