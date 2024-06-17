import {store} from "@/store.js";
import {fetchMusic} from "@/features/music/musicSlice.js";

export async function musicLoader() {
    return store.dispatch(fetchMusic());
}