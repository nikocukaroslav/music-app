import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SearchSvg from "@/svg/SearchSvg.jsx";
import {fetchAllMusic} from "@/features/music/musicSlice.js";
import Input from "@/ui/Input.jsx";
import MusicListForForms from "@/features/album/MusicListForForms.jsx";
import {translation} from "@/features/settings/language.js";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchMode, setSearchMode] = useState(false);
    const [filteredMusic, setFilteredMusic] = useState([]);
    const musicList = useSelector((state) => state.music.allMusic);

    const node = useRef();

    const dispatch = useDispatch();

    function toggleSearchMode() {
        setSearchMode(!searchMode);
    }

    function activateSearchMode() {
        setSearchMode(true);
        dispatch(fetchAllMusic());
    }

    function handleSearch(e) {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        setFilteredMusic(
            musicList.filter((music) =>
                music.name.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        );
    }, [musicList, searchTerm]);

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
        <div
            className="w-80 max-[764px]:w-auto flex content-center gap-3 ml-12 max-[764px]:ml-0 max-[764px]:text-sm"
            ref={node}
        >
            <Input
                placeholder={translation.SearchMusic}
                type="text"
                onChange={handleSearch}
                onClick={activateSearchMode}
            />
            <button onClick={toggleSearchMode}>
                <SearchSvg className="max-[764px]:hidden"/>
            </button>
            {searchMode &&
                searchTerm.length > 0 &&
                (filteredMusic.length > 0 ? (
                    <ul
                        className="absolute flex flex-col rounded-xl main-color shadow-md border-2 border-color-darker
                     top-16 left-2/4 -translate-x-2/4 z-30 w-1/3  max-[1300px]:w-2/3
                         overflow-auto max-h-[50vh]"
                    >
                        <MusicListForForms
                            className="no-scrollbar overflow-auto mt-0 mb-0"
                            songStyles="line-clamp-1"
                            logoStyles="p-2 max-[764px]:p-1 "
                            filteredMusic={filteredMusic}
                        />
                    </ul>
                ) : (
                    <p
                        className="absolute p-3 top-16 left-2/4 rounded-md
                        -translate-x-2/4 z-30 w-1/4 border-2 border-color-darker main-color"
                    >
                        No music found
                    </p>
                ))}
        </div>
    );
}

export default SearchBar;
