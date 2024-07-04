import {store} from "@/store.js";
import {fetchAllMusic, fetchMusic, resetSelectMode} from "@/features/music/musicSlice.js";
import {fetchAlbums, setActiveAlbum} from "@/features/album/albumSlice.js";

export async function musicLoader() {
    store.dispatch(resetSelectMode())
    await store.dispatch(setActiveAlbum(null))
    return store.dispatch(fetchMusic());
}

export async function albumLoader() {
    store.dispatch(resetSelectMode())
    await store.dispatch(fetchAllMusic());
    return store.dispatch(fetchAlbums());
}
