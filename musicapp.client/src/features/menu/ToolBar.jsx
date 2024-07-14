import MenuSvg from "@/svg/MenuSvg.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "@/features/menu/menuSlice.js";
import SearchBar from "@/features/menu/SearchBar.jsx";
import { NavLink } from "react-router-dom";
import LogoutSvg from "@/svg/LogoutSvg.jsx";
import CrossSvg from "@/svg/CrossSvg.jsx";

function ToolBar() {
  const login = useSelector((state) => state.authorization.login);
  const menuIsActive = useSelector((state) => state.menu.menuIsActive);
  const dispatch = useDispatch();

  function handleMenuActive() {
    dispatch(toggleMenu());
  }

  return (
    <div
      className="flex justify-between main-color p-5 w-full relative
        toolbar-shadow z-10"
    >
      <button onClick={handleMenuActive}>
        {!menuIsActive ? (
          <MenuSvg h="8" w="8" />
        ) : (
          <div className="h-8 w-8 flex items-center justify-center">
            <CrossSvg className="svg-6 icon-color" />
          </div>
        )}
      </button>
      <SearchBar />
      <div className="self-center flex gap-3 items-center">
        <span className="max-[764px]:hidden">{login}</span>
        <NavLink to="/authorization/login">
          <LogoutSvg h="8" w="8" />
        </NavLink>
      </div>
    </div>
  );
}

export default ToolBar;
