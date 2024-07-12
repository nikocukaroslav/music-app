import "../../index.css";
import { NavLink } from "react-router-dom";
import MusicSvg from "@/svg/MusicSvg.jsx";
import AlbumSvg from "@/svg/AlbumSvg.jsx";
import SettingsSvg from "@/svg/SettingsSvg.jsx";
import { translation } from "@/features/settings/language.js";

function Menu() {
  return (
    <nav
      className="h-full w-1/6 py-1 main-color
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
            <MusicSvg />
            <span>{translation.Music}</span>
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
            <AlbumSvg />
            <span>{translation.Albums}</span>
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
            <SettingsSvg />
            <span>{translation.Settings}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
