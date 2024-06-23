import {addAlbum} from "@/services/apiMusicApp.js";
import Button from "@/ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {toggleCreateAlbumForm} from "@/features/album/albumSlice.js";
import MusicList from "@/features/music/MusicList.jsx";
import {useState} from "react";
import {generateGUID} from "@/helpers.js";

function NewAlbumForm() {
    const [albumName, setAlbumName] = useState("");
    const createdDate = Date.now();
    const musicList = useSelector(state => state.music.selectedMusic)
    const dispatch = useDispatch();

    function handleFormActive() {
        dispatch(toggleCreateAlbumForm())
    }

    async function handleAddAlbum(e) {
        e.preventDefault()
        const newAlbum = {
            id: generateGUID(),
            name: albumName,
            createdDate: createdDate,
        }
        console.log(newAlbum)
        await addAlbum(newAlbum)
    }

    return (
        <form
            className="absolute z-10 backdrop-blur-[6px] top-0 left-0 right-0 bottom-0 flex justify-center items-center"
            onSubmit={handleAddAlbum}>
            <div className="w-1/3 h-2/3 second-color p-5 rounded-xl flex flex-col shadow-xl">
                <label className="text-xl flex flex-col gap-3">Album name
                    <input type="text"
                           onChange={(e) => setAlbumName(e.target.value)}
                           className="p-1 background-color outline outline-gray-600 text-gray-100 rounded w-full"/>
                </label>
                <div className="mb-2">

                    <MusicList songStyles=" overflow-hidden max-w-72"
                               className="mb-0 overflow-auto shadow shadow-gray-800"
                               albumCreating={true}/>
                </div>
                <div className="text-lg mt-auto flex gap-3 w-full">
                    <Button onClick={handleFormActive}>Cancel</Button>
                    <Button>Add</Button>
                </div>
            </div>

        </form>
    );
}

export default NewAlbumForm;