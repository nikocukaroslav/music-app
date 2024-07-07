import OptionsButton from "@/ui/OptionsButton.jsx";
import PlaySvg from "@/svg/PlaySvg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeAlbum} from "@/features/album/albumSlice.js";
import PauseSvg from "@/svg/PauseSvg.jsx";
import {useNavigate} from "react-router-dom";


function Album({album}) {
    const activeAlbum = useSelector(state => state.album.activeAlbum)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isPlaying = activeAlbum ? album.id === activeAlbum.id : false;

    async function handleSelect() {
        navigate(`/Albums/${album.id}`);
    }

    function handleDelete(e) {
        e.stopPropagation();
        dispatch(removeAlbum(album))
    }

    return (
        <li onClick={handleSelect}
            className={`py-2 px-1 w-full second-color flex hover:hover-color
                transition gap-3 items-center justify-between ${isPlaying ? "hover-color" : "second-color"}
                `}>
            <div className="flex items-center gap-2 ">
                <OptionsButton onDelete={handleDelete} isMusic={false} className="top-6 left-5"/>
                <span>{album.name}</span>
            </div>
            {isPlaying ? < PauseSvg/> : <PlaySvg/>}
        </li>
    );
}

export default Album;