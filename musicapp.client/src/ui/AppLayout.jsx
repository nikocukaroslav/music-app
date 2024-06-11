import ToolBar from "@/features/menu/ToolBar.jsx";
import Menu from "@/features/menu/Menu.jsx";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

function AppLayout() {
    const isActive = useSelector((state) => state.menu.menuIsActive)

    return (
        <div className="h-screen flex flex-col">
            <ToolBar/>
            <main className="bg-slate-100 flex flex-grow">
                {isActive && <Menu/>}
                <Outlet/>
            </main>
        </div>
    );
}

export default AppLayout;