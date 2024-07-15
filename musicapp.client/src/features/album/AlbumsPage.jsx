import AlbumList from "@/features/album/AlbumList.jsx";
import Playlist from "@/features/album/Playlist.jsx";
import AddAlbumButton from "@/features/album/AddAlbumButton.jsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getAlbum} from "@/services/apiMusicApp.js";
import {fetchAndFilterMusic} from "@/features/album/albumSlice.js";
import {useDispatch, useSelector} from "react-redux";

function AlbumsPage() {
    const albums = useSelector((state) => state.album.albums);

    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {
        async function fetchAlbum() {
            const album = await getAlbum(id);
            dispatch(fetchAndFilterMusic(album));
        }

        id && fetchAlbum();
    }, [id, dispatch]);

    return (
        <>
            <section className="flex gap-6 mx-4 my-3 w-full max-[1150px]:flex-col">
                <div
                    className="w-1/6 min-w-64 max-[1150px]:w-full max-[1150px]:flex max-[1150px]:gap-3">
                    <AddAlbumButton/>
                    <AlbumList/>
                </div>
                {albums.length > 0 && (
                    <div className="w-5/6 max-[1150px]:w-full">
                        <Playlist/>
                    </div>
                )}
            </section>
        </>
    );
}

export default AlbumsPage;
