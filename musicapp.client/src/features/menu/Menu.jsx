import "../../index.css";
import {NavLink} from "react-router-dom";
import HomeSvg from "@/svg/HomeSvg.jsx";
import MusicSvg from "@/svg/MusicSvg.jsx";
import AlbumSvg from "@/svg/AlbumSvg.jsx";
import SettingsSvg from "@/svg/SettingsSvg.jsx";

function Menu() {
    return (
        <nav
            className="h-full w-72 bg-blue-100 border-r-2 px-1 py-2
            border-r-slate-300 flex flex-col"
        >
            <ul className=" flex flex-col gap-2 h-full">
                <li>
                    <NavLink
                        className="p-3 bg-blue-300 text-xl rounded-xl hover:bg-blue-200 transition flex gap-3 items-center"
                        to="/"
                    >
                        <HomeSvg/>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="p-3 bg-blue-300 text-xl rounded-xl hover:bg-blue-200 transition flex gap-3 items-center"
                        to="/Music"
                    >
                        <MusicSvg/>
                        <span>Music</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="p-3 bg-blue-300 text-xl rounded-xl hover:bg-blue-200 transition flex gap-3 items-center"
                        to="/Albums"
                    >
                        <AlbumSvg/>
                        <span>Albums</span>
                    </NavLink>
                </li>
                <li className="mt-auto ">
                    <NavLink
                        className="p-3 bg-blue-300 text-xl rounded-xl hover:bg-blue-200 transition flex gap-3 items-center"
                        to="/Settings"
                    >
                        <SettingsSvg/>
                        <span>Settings</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
