import OptionsButton from "@/ui/OptionsButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeAlbum} from "@/features/album/albumSlice.js";
import {useNavigate} from "react-router-dom";
import SoundSvg from "@/svg/SoundSvg.jsx";
import {useEffect, useState} from "react";
import {randomColor} from "@/helpers.js";
import PlayListSvg from "@/svg/PlayListSvg.jsx";
import {translation} from "@/features/settings/language.js";
import ConfirmDeletingForm from "@/ui/ConfirmDeletingForm.jsx";

function Album({album}) {
    const activeAlbum = useSelector((state) => state.album.activeAlbum);
    const dispatch = useDispatch();
    const [deletingFormActive, setDeletingFormActive] = useState(false);

    const [color, setColor] = useState(
        localStorage.getItem(`color[${album.id}]`) || "",
    );

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

    function handleDeletingFormActive(e) {
        e.stopPropagation();
        setDeletingFormActive(true);
    }

    function handleCancel(e) {
        e.stopPropagation();
        setDeletingFormActive(false);
    }

    function handleDelete(e) {
        e.stopPropagation();
        dispatch(removeAlbum(album));
    }

    return (
        <>
            <li
                onClick={handleSelect}
                className={`w-full max-[764px]:w-auto main-color flex hover:hover-color rounded-md shadow
                transition gap-3 items-center justify-between ${isPlaying ? "hover-color" : "main-color"}
                 relative`}
            >
                <div className="flex gap-3 max-[764px]:gap-1 items-center max-[764px]:flex-col">
                    <div
                        className={`${color}  
                        p-4 max-[764px]:rounded-md max-[764px]:p-5 rounded-l-md`}
                    >
                        {isPlaying ? (
                            <SoundSvg className="icon-color-darker" h="8" w="8"/>
                        ) : (
                            <PlayListSvg className="icon-color-darker" h="8" w="8"/>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 max-[764px]:gap-0 max-[764px]:self-start max-[764px]:p-1">
                        <span
                            className="text-xl max-[764px]:text-lg
                            max-[764px]:max-w-16 max-[764px]:overflow-ellipsis max-[764px]:overflow-hidden ">{album.name}</span>
                        <span className="text-xs info-color">{album.musicList.length}{" "}
                            {translation.Songs}
                        </span>
                    </div>
                </div>
                <div
                    className="flex items-center gap-2 max-[764px]:absolute max-[764px]:top-0  max-[764px]:-right-1">
                    <OptionsButton
                        onDelete={handleDeletingFormActive}
                        isMusic={false}
                        className="top-6 left-5"
                    />
                </div>
            </li>
            {deletingFormActive && (
                <ConfirmDeletingForm onCancel={handleCancel} onDelete={handleDelete}/>
            )}
        </>
    );
}

export default Album;
