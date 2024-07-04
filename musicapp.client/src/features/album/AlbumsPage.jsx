import AlbumList from "@/features/album/AlbumList.jsx";
import Playlist from "@/features/album/Playlist.jsx";
import AddAlbumButton from "@/features/album/AddAlbumButton.jsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getAlbum} from "@/services/apiMusicApp.js";
import {fetchAndFilterMusic} from "@/features/album/albumSlice.js";
import {useDispatch} from "react-redux";

function AlbumsPage() {
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {
        async function fetchAlbum() {
            const album = await getAlbum(id)
            dispatch(fetchAndFilterMusic(album));
        }

        id && fetchAlbum()
    }, [id, dispatch]);


    return (
        <>
            <section className="flex gap-4">
                <div className="w-1/6 m-2 ">
                    <AddAlbumButton/>
                    <AlbumList/>
                </div>
                <div className="w-5/6">
                    <Playlist/>
                </div>
            </section>
        </>
    );
}

export default AlbumsPage;