import MenuSvg from "@/svg/MenuSvg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {toggleMenu} from "@/features/menu/menuSlice.js";
import SearchBar from "@/features/menu/SearchBar.jsx";
import {NavLink} from "react-router-dom";
import LogoutSvg from "@/svg/LogoutSvg.jsx";
import CrossSvg from "@/svg/CrossSvg.jsx";

function ToolBar() {
    const login = useSelector(state => state.authorization.login)
    const menuIsActive = useSelector(state => state.menu.menuIsActive)
    const dispatch = useDispatch();

    function handleMenuActive() {
        dispatch(toggleMenu())
    }

    return (
        <div className="flex justify-between second-color p-5 w-full relative
        shadow-[0_2px_6px_0_rgba(0,0,0,0.7)] shadow-gray-800 z-10">
            <button onClick={handleMenuActive}>{!menuIsActive ? <MenuSvg/> :
                <div className="h-8 w-8 flex items-center justify-center">
                    <CrossSvg className="child-color" h={6} w={6}/>
                </div>}
            </button>
            <SearchBar/>
            <div className="self-center flex gap-3 items-center">
                <span>{login}</span>
                <NavLink to="/Authorization/Login"><LogoutSvg/></NavLink>
            </div>
        </div>
    );
}

export default ToolBar;