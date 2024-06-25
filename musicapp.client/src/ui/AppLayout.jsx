import ToolBar from "@/features/menu/ToolBar.jsx";
import Menu from "@/features/menu/Menu.jsx";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import Player from "@/features/music/Player.jsx";
import Loader from "@/ui/Loader.jsx";
import Copied from "@/ui/Copied.jsx";
import NewAlbumForm from "@/features/album/NewAlbumForm.jsx";

function AppLayout() {
    const isLoadingMusic = useSelector(state => state.music.isLoading);
    const isLoadingAlbum = useSelector(state => state.album.isLoading);
    const copied = useSelector(state => state.music.copied);
    const isMenuActive = useSelector((state) => state.menu.menuIsActive);
    const isMusicPlaying = useSelector((state) => state.music.musicUrl);
    const isCreateAlbumFormActive = useSelector((state) => state.album.isCreateAlbumFormActive);

    return (
        <>
            {
                isCreateAlbumFormActive &&
                <NewAlbumForm/>
            }
            {
                copied && <Copied/>
            }
            {(isLoadingMusic || isLoadingAlbum) && <Loader/>}
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