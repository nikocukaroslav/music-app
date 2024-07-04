import "../../index.css";
import {NavLink} from "react-router-dom";
import HomeSvg from "@/svg/HomeSvg.jsx";
import MusicSvg from "@/svg/MusicSvg.jsx";
import AlbumSvg from "@/svg/AlbumSvg.jsx";
import SettingsSvg from "@/svg/SettingsSvg.jsx";
import {$Albums, $Music, $Settings} from "@/features/settings/language.js";

function Menu() {
    return (
        <nav
            className="h-full w-1/6 main-color px-1 py-2
             flex flex-col shadow-[0_0_12px_0_rgba(0,0,0,1)] shadow-gray-800"
        >
            <ul className=" flex flex-col gap-2 h-full">
                <li>
                    <NavLink
                        className={({isActive}) =>
                            !isActive ? "p-3 second-color text-xl rounded-xl hover:hover-color transition flex gap-3 items-center"
                                : " p-3 text-xl rounded-xl hover:hover-color transition flex gap-3 items-center hover-color"}
                        to="/"
                    >
                        <HomeSvg/>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({isActive}) =>
                            !isActive ? "p-3 second-color text-xl rounded-xl hover:hover-color transition flex gap-3 items-center"
                                : " p-3 text-xl rounded-xl hover:hover-color transition flex gap-3 items-center hover-color"}
                        to="/Music"
                    >
                        <MusicSvg/>
                        <span>{$Music}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({isActive}) =>
                            !isActive ? "p-3 second-color text-xl rounded-xl hover:hover-color transition flex gap-3 items-center"
                                : " p-3 text-xl rounded-xl hover:hover-color transition flex gap-3 items-center hover-color"}
                        to="/Albums"
                    >
                        <AlbumSvg/>
                        <span>{$Albums}</span>
                    </NavLink>
                </li>
                <li className="mt-auto ">
                    <NavLink
                        className={({isActive}) =>
                            !isActive ? "p-3 second-color text-xl rounded-xl hover:hover-color transition flex gap-3 items-center"
                                : " p-3 text-xl rounded-xl hover:hover-color transition flex gap-3 items-center hover-color"}
                        to="/Settings"
                    >
                        <SettingsSvg/>
                        <span>{$Settings}</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
