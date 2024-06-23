import PlaySvg from "@/svg/PlaySvg.jsx";
import OptionsButton from "@/ui/OptionsButton.jsx";

function AlbumList() {
    return (
        <ul className="mt-4 flex flex-col gap-2">
            <li className="py-2 px-1 w-full second-color flex   gap-3 items-center justify-between">
                <div className="flex items-center gap-2 ">
                    <button><OptionsButton/></button>
                    <span>Music</span>
                </div>
                <div><PlaySvg/></div>
            </li>
        </ul>
    );
}

export default AlbumList;