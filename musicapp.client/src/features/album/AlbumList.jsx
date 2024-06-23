import PlaySvg from "@/svg/PlaySvg.jsx";
import OptionsButton from "@/ui/OptionsButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setActiveAlbum} from "@/features/album/albumSlice.js";

function AlbumList() {
    const albums = useSelector(state => state.album.albums)

    const dispatch = useDispatch();

    return (
        <ul className="mt-4 flex flex-col gap-2">
            {albums.map((album) => {
                    return (
                        <li key={album.id}
                            onClick={() => dispatch(setActiveAlbum(album))}
                            className="py-2 px-1 w-full second-color flex hover:hover-color
                             transition gap-3 items-center justify-between">
                            <div className="flex items-center gap-2 ">
                                <button><OptionsButton/></button>
                                <span>{album.name}</span>
                            </div>
                            <div><PlaySvg/></div>
                        </li>
                    )
                }
            )}
        </ul>
    );
}

export default AlbumList;