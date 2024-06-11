import MenuSvg from "@/svg/MenuSvg.jsx";
import SearchSvg from "@/svg/SearchSvg.jsx";
import {useDispatch} from "react-redux";
import {toggleMenu} from "@/features/menu/menuSlice.js";

function ToolBar() {
    const dispatch = useDispatch();

    function handleMenu() {

        dispatch(toggleMenu())
    }

    return (
        <div className="flex justify-between border-b-2 border-slate-300 bg-blue-100 p-5 w-full">
            <button onClick={handleMenu}><MenuSvg/></button>
            <div className="w-80 flex content-center gap-3">
                <input className="p-1 bg-slate-50 outline-blue-400 rounded w-full" type="text"/>
                <button><SearchSvg/></button>
            </div>
            <span className="content-center">nikoc</span>
        </div>
    );
}

export default ToolBar;