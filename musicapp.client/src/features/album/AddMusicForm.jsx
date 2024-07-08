import Button from "@/ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {toggleAddMusicForm, updateAlbum} from "@/features/album/albumSlice.js";
import MusicListForForms from "@/features/album/MusicListForForms.jsx";
import {cleanSelected} from "@/features/music/musicSlice.js";
import {translation} from "@/features/settings/language.js";

function AddMusicForm() {
    const selectedMusic = useSelector(state => state.music.selectedMusic);
    const isMusicInList = useSelector(state => state.album.isMusicInList);

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateAlbum(selectedMusic));
        dispatch(toggleAddMusicForm());
        dispatch(cleanSelected())
    }

    function handleFormActive(e) {
        e.preventDefault();
        dispatch(toggleAddMusicForm());
    }

    return (
        <form
            className="absolute z-20 backdrop-blur-[6px] top-0 left-0 right-0 bottom-0 flex justify-center items-center w-screen"
            onSubmit={handleSubmit}>
            <div className="w-1/3 h-2/3 second-color p-5 rounded-xl flex flex-col shadow-xl">
                <div>
                    <MusicListForForms filter={true}
                                       songStyles="max-w-80 overflow-hidden" logoStyles="p-2"
                                       className="overflow-auto max-h-[55vh] shadow shadow-gray-800"
                                       albumCreating={true}/>
                </div>
                <div className="text-lg mt-auto flex gap-3">
                    <Button onClick={handleFormActive}
                            className="border-2 border-color w-1/2">{translation.Cancel}</Button>
                    {isMusicInList &&
                        <Button
                            className="border-2 border-color main-color hover:bg-gray-700 w-1/2">
                            {translation.Add}</Button>}
                </div>
            </div>
        </form>
    );
}

export default AddMusicForm;