import OptionsButton from "@/ui/OptionsButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeAlbum} from "@/features/album/albumSlice.js";
import {useNavigate} from "react-router-dom";
import SoundSvg from "@/svg/SoundSvg.jsx";
import {useEffect, useState} from "react";
import {randomColor} from "@/helpers.js";
import PlayListSvg from "@/svg/PlayListSvg.jsx";


function Album({album}) {
    const activeAlbum = useSelector(state => state.album.activeAlbum)
    const dispatch = useDispatch();
    const [color, setColor] = useState(localStorage.getItem(`color[${album.id}]`) || "");

    const navigate = useNavigate();

    useEffect(() => {
        if (!color) {
            const newColor = randomColor();
            setColor(newColor);
        }
    }, [color]);

    useEffect(() => {
        if (color) {
            localStorage.setItem(`color[${album.id}]`, color);
        }
    }, [color, album.id]);


    const isPlaying = activeAlbum ? album.id === activeAlbum.id : false;

    async function handleSelect() {
        navigate(`/albums/${album.id}`);
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
                <div className={`${color}  p-4 rounded-l-md`}>
                    {isPlaying ? <SoundSvg className="child-color-2" h={8} w={8}/> :
                        <PlayListSvg className="child-color-2" h={8} w={8}/>}
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xl">{album.name}</span>
                    <span className="text-sm text-gray-300">{album.musicList.length} songs</span>
                </div>
            </div>
            <div className="flex items-center gap-2 ">
                <OptionsButton onDelete={handleDelete} isMusic={false} className="top-6 left-5"/>
            </div>
        </li>
    );
}

export default Album;