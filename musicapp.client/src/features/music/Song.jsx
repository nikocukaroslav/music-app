import PlaySvg from "@/svg/PlaySvg.jsx";
import DotsSvg from "@/svg/DotsSvg.jsx";

function Song() {
    return (
        <ul className="flex flex-col gap-1 ">
            <li
                className="flex justify-between second-color rounded m-2
                p-2 content-center items-center hover:hover-color transition">
                <PlaySvg/>
                <span>asdadasdads</span>
                <DotsSvg/>
            </li>

        </ul>
    );
}

export default Song;