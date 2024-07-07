import ToolBar from "@/features/menu/ToolBar.jsx";
import Menu from "@/features/menu/Menu.jsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Player from "@/features/music/Player.jsx";
import Loader from "@/ui/Loader.jsx";
import Copied from "@/ui/Copied.jsx";
import NewAlbumForm from "@/features/album/NewAlbumForm.jsx";
import AddMusicForm from "@/features/album/AddMusicForm.jsx";
import {useEffect} from "react";

function AppLayout() {
    const isLoadingMusic = useSelector(state => state.music.isLoading);
    const isLoadingAlbum = useSelector(state => state.album.isLoading);
    const copied = useSelector(state => state.music.copied);
    const isMenuActive = useSelector((state) => state.menu.menuIsActive);
    const isMusicPlaying = useSelector((state) => state.music.musicUrl);
    const isCreateAlbumFormActive = useSelector((state) => state.album.isCreateAlbumFormActive);
    const isAddMusicFormActive = useSelector((state) => state.album.isAddMusicFormActive);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/Music");
        }
    }, [location, navigate]);

    return (
        <>
            {
                isCreateAlbumFormActive &&
                <NewAlbumForm/>
            }
            {
                isAddMusicFormActive &&
                <AddMusicForm/>
            }
            {
                copied && <Copied/>
            }
            {(isLoadingMusic || isLoadingAlbum) && <Loader/>}
            <div className="h-screen flex flex-col">
                <ToolBar/>
                <main className="background-color flex flex-grow overflow-hidden">
                    {isMenuActive && <Menu/>}
                    <Outlet/>
                </main>
                {isMusicPlaying && <Player/>}
            </div>
        </>
    );
}

export default AppLayout;