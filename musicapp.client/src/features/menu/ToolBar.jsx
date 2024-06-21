import MenuSvg from "@/svg/MenuSvg.jsx";
import {useDispatch} from "react-redux";
import {toggleMenu} from "@/features/menu/menuSlice.js";
import SearchBar from "@/features/menu/SearchBar.jsx";

function ToolBar() {
    const dispatch = useDispatch();

    function handleMenuActive() {
        dispatch(toggleMenu())
    }

    return (
        <div className="flex justify-between second-color p-5 w-full relative">
            <button onClick={handleMenuActive}><MenuSvg/></button>
            <SearchBar/>
            <span className="content-center">nikoc</span>
        </div>
    );
}

export default ToolBar;