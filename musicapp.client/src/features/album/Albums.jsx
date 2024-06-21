import PlaySvg from "@/svg/PlaySvg.jsx";
import AlbumToolbar from "@/features/album/AlbumToolbar.jsx";
import MusicList from "@/features/music/MusicList.jsx";

function Albums() {
    return (
        <section className="flex gap-3">
            <div className="w-1/6">
                <AlbumToolbar/>
                <ul className="p-2   flex flex-col gap-2">
                    <li className="py-2 px-5 w-full second-color flex   gap-3 items-center justify-between">
                        <span>Music</span>
                        <div><PlaySvg/></div>
                    </li>
                    <li className="py-2 px-5  second-color flex w-full  gap-3 items-center justify-between">
                        <span>wewew</span>
                        <div><PlaySvg/></div>
                    </li>
                </ul>
            </div>
            <div className="w-5/6">

                <MusicList/>
            </div>
        </section>
    );
}

export default Albums;