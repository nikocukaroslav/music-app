import OptionsButton from "@/ui/OptionsButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeAlbum} from "@/features/album/albumSlice.js";
import {useNavigate} from "react-router-dom";
import NewAlbum from "@/svg/NewAlbum.jsx";
import SoundSvg from "@/svg/SoundSvg.jsx";


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
            className={`w-full second-color flex hover:hover-color rounded-md shadow
                transition gap-3 items-center justify-between ${isPlaying ? "hover-color" : "second-color"}
                `}>
            <div className="flex gap-3 items-center">
                <div className={`song-logo-four p-4 rounded-l-md`}>
                    {isPlaying ? <SoundSvg className="child-color-2" h={8} w={8}/> :
                        <NewAlbum className="child-color-2" h={8} w={8}/>}
                </div>
                <div className="flex flex-col">
                    <span>{album.name}</span>
                    <span className="text-sm text-gray-300">1 song</span>
                </div>
            </div>
            <div className="flex items-center gap-2 ">
                <OptionsButton onDelete={handleDelete} isMusic={false} className="top-6 left-5"/>

            </div>
        </li>
    );
}

export default Album;