import ToolBar from "@/features/menu/ToolBar.jsx";
import Menu from "@/features/menu/Menu.jsx";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import Player from "@/features/music/Player.jsx";

function AppLayout() {
    const isActive = useSelector((state) => state.menu.menuIsActive)

    return (
        <div className="h-screen flex flex-col">
            <ToolBar/>
            <main className="background-color flex flex-grow w-full">
                {isActive && <Menu/>}
                <div className="w-full relative">
                    <Outlet/>
                    <Player/>
                </div>
            </main>
        </div>
    );
}

export default AppLayout;