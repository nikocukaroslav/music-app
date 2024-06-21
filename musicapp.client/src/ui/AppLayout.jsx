import ToolBar from "@/features/menu/ToolBar.jsx";
import Menu from "@/features/menu/Menu.jsx";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import Player from "@/features/music/Player.jsx";
import Loader from "@/ui/Loader.jsx";

function AppLayout() {
    const isLoading = useSelector(state => state.music.isLoading);
    const copied = useSelector(state => state.music.copied);
    const isMenuActive = useSelector((state) => state.menu.menuIsActive);
    const isMusicPlaying = useSelector((state) => state.music.musicUrl);

    return (
        <>
            {
                copied &&
                <span
                    className="absolute bottom-0  bg-gray-900 px-6 py-1 left-2/4 -translate-x-2/4 z-20">Copied to clipboard
                </span>
            }
            {isLoading && <Loader/>}
            <div className="h-screen flex flex-col">
                <ToolBar/>
                <main className="background-color flex flex-grow overflow-hidden">
                    {isMenuActive && <Menu/>}

                    <div className="w-full relative">
                        <div className="overflow-auto h-full">
                            <Outlet/>
                        </div>
                        {isMusicPlaying && <Player/>}
                    </div>
                </main>
            </div>
        </>
    );
}

export default AppLayout;