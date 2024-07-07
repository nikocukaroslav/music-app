import DotsSvg from "@/svg/DotsSvg.jsx";
import {useEffect, useRef, useState} from "react";
import ShareSvg from "@/svg/ShareSvg.jsx";
import TrashSvg from "@/svg/TrashSvg.jsx";
import {useSelector} from "react-redux";
import CrossSvg from "@/svg/CrossSvg.jsx";
import {translation} from "@/features/settings/language.js";

function OptionsButton({onDelete, onShare, onRemove, className, isMusic = true}) {
    const [active, setActive] = useState(false);
    const isAlbumActive = useSelector(state => state.album.activeAlbum);
    const node = useRef();

    function handleActive(e) {
        e.stopPropagation();
        setActive(!active);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!node.current.contains(e.target)) {
                setActive(false);
            }
        };

        if (active) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [active]);

    return (
        <div className="relative flex" ref={node}>
            <span className="p-1" onClick={handleActive}><DotsSvg/></span>
            {active && <div className={`absolute main-color border-2 border-gray-700
                ${className} w-40 flex flex-col divide-y-2 items-start divide-gray-700 z-10`}>
                <button className="p-1 flex gap-2.5 w-full items-center transition hover:hover-color"
                        onClick={onDelete}>
                    <TrashSvg w={4} h={4} color={"child-color-2"}/>{translation.Delete}
                </button>
                {isAlbumActive && isMusic &&
                    <button className="p-1 flex gap-2.5 w-full items-center transition hover:hover-color"
                            onClick={onRemove}>
                        <CrossSvg className="child-color-2" h={4} w={4}/>{translation.Remove}
                    </button>}
                <button className="p-1 flex gap-2.5 w-full items-center transition hover:hover-color"
                        onClick={onShare}>
                    <ShareSvg/>{translation.Share}
                </button>
            </div>}
        </div>
    );
}

export default OptionsButton;