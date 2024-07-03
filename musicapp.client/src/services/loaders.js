import {store} from "@/store.js";
import {fetchAllMusic, fetchMusic} from "@/features/music/musicSlice.js";
import {fetchAlbums} from "@/features/album/albumSlice.js";

export async function musicLoader() {
    return store.dispatch(fetchMusic());
}

export async function albumLoader() {
    await store.dispatch(fetchAllMusic());
    return store.dispatch(fetchAlbums());
}
