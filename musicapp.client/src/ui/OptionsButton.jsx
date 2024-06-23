import DotsSvg from "@/svg/DotsSvg.jsx";
import {useEffect, useRef, useState} from "react";
import ShareSvg from "@/svg/ShareSvg.jsx";
import TrashSvg from "@/svg/TrashSvg.jsx";

function OptionsButton({onDelete, onShare}) {
    const [active, setActive] = useState(false);
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
            {active && <div className="absolute main-color border-2 border-gray-700
            right-5 top-6 w-40 flex flex-col divide-y-2 items-start divide-gray-700 z-10">
                <button className="p-1 flex gap-2.5 w-full items-center transition hover:hover-color"
                        onClick={onDelete}>
                    <TrashSvg w={4} h={4} color={"child-color-2"}/>Delete
                </button>
                <button className="p-1 flex gap-2.5 w-full items-center transition hover:hover-color"
                        onClick={onShare}>
                    <ShareSvg/>Share
                </button>
            </div>}
        </div>
    );
}

export default OptionsButton;