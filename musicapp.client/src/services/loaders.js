import {store} from "@/store.js";
import {fetchMusic} from "@/features/music/musicSlice.js";
import {fetchAlbums, setActiveAlbum} from "@/features/album/albumSlice.js";

export async function musicLoader() {
    await store.dispatch(setActiveAlbum(null))
    return store.dispatch(fetchMusic());
}

export async function albumLoader() {
    return store.dispatch(fetchAlbums());
}
