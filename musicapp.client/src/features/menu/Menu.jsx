import "../../index.css";
import {NavLink} from "react-router-dom";
import MusicSvg from "@/svg/MusicSvg.jsx";
import AlbumSvg from "@/svg/AlbumSvg.jsx";
import SettingsSvg from "@/svg/SettingsSvg.jsx";
import {translation} from "@/features/settings/language.js";

function Menu() {
    return (
        <nav
            className="h-full w-1/6 py-1 second-color
             flex flex-col shadow-[0_0_12px_0_rgba(0,0,0,0.7)] shadow-gray-800"
        >
            <ul className="flex flex-col gap-1 h-full">
                {/*<li>
                    <NavLink
                        className={({isActive}) =>
                            !isActive ? "p-3 second-color text-xl rounded-xl hover:hover-color transition flex gap-3 items-center"
                                : " p-3 text-xl rounded-xl hover:hover-color transition flex gap-3 items-center hover-color"}
                        to="/"
                    >
                        <HomeSvg/>
                        <span>Home</span>
                    </NavLink>
                </li>*/}
                <li>
                    <NavLink
                        className={({isActive}) => {
                            return `p-3 text-xl hover:hover-color transition flex gap-3 items-center 
                            ${isActive && "hover-color"}`
                        }
                        }
                        to="/Music"
                    >
                        <MusicSvg/>
                        <span>{translation.Music}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({isActive}) => {
                            return `p-3 text-xl hover:hover-color transition flex gap-3 items-center 
                            ${isActive && "hover-color"}`
                        }
                        }
                        to="/Albums"
                    >
                        <AlbumSvg/>
                        <span>{translation.Albums}</span>
                    </NavLink>
                </li>
                <li className="">
                    <NavLink
                        className={({isActive}) => {
                            return `p-3 text-xl hover:hover-color transition flex gap-3 items-center 
                            ${isActive && "hover-color"}`
                        }
                        }
                        to="/Settings"
                    >
                        <SettingsSvg/>
                        <span>{translation.Settings}</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
