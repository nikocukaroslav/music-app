import OptionsButton from "@/ui/OptionsButton.jsx";
import PlaySvg from "@/svg/PlaySvg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAndFilterMusic, removeAlbum} from "@/features/album/albumSlice.js";
import PauseSvg from "@/svg/PauseSvg.jsx";

function Album({album}) {
    const activeAlbum = useSelector(state => state.album.activeAlbum)
    const dispatch = useDispatch();

    const isPlaying = activeAlbum ? album.id === activeAlbum.id : false;


    function handleSelect(album) {
        dispatch(fetchAndFilterMusic(album))
    }

    function handleDelete(e) {
        e.stopPropagation();
        dispatch(removeAlbum(album.id))
    }

    return (
        <li onClick={() => handleSelect(album)}
            className={`py-2 px-1 w-full second-color flex hover:hover-color
                transition gap-3 items-center justify-between ${isPlaying ? "hover-color" : "second-color"}
                `}>
            <div className="flex items-center gap-2 ">
                <OptionsButton onDelete={handleDelete} className="top-6 left-5"/>
                <span>{album.name}</span>
            </div>
            {isPlaying ? < PauseSvg/> : <PlaySvg/>}
        </li>
    );
}

export default Album;