import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SearchSvg from "@/svg/SearchSvg.jsx";
import {fetchMusic} from "@/features/music/musicSlice.js";
import Input from "@/ui/Input.jsx";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchMode, setSearchMode] = useState(false);
    const [filteredMusic, setFilteredMusic] = useState([]);
    const musicList = useSelector(state => state.music.music);

    const node = useRef();

    const dispatch = useDispatch();

    function toggleSearchMode() {
        setSearchMode(!searchMode)
        if (!searchMode)
            dispatch(fetchMusic())
    }

    function handleSearch(e) {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        setFilteredMusic(musicList.filter(music =>
            music.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }, [searchTerm]);


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!node.current.contains(e.target)) {
                setSearchMode(false);
            }
        };

        if (searchMode) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchMode]);

    return (
        <div className="w-80 flex content-center gap-3" ref={node}>
            <Input type="text"
                   onChange={handleSearch}
                   onClick={() => setSearchMode(true)}
            />
            <button onClick={(toggleSearchMode)}><SearchSvg/></button>
            {
                searchMode && searchTerm.length > 0 && (filteredMusic.length > 0 ?
                    <ul className="absolute flex flex-col hover-color top-16 left-2/4 -translate-x-2/4 z-30 w-1/4
                        divide-y-2 divide-gray-900 border-2 border-gray-900 overflow-auto max-h-96">
                        {filteredMusic.map(music => (
                                <li key={music.id} className="p-3 h-full overflow-hidden w-full ">{music.name}</li>
                            )
                        )}
                    </ul> : <p className="absolute p-3 top-16 left-2/4
                        -translate-x-2/4 z-30 w-1/4 border-2 border-gray-900 hover-color">No music
                        found</p>)
            }
        </div>
    );
}

export default SearchBar;