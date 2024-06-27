import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "@/ui/AppLayout.jsx";
import Home from "@/features/home/Home.jsx";
import Settings from "@/ui/Settings.jsx";
import MusicPage from "@/features/music/MusicPage.jsx";
import {albumLoader, musicLoader} from "@/services/loaders.js";
import AlbumsPage from "@/features/album/AlbumsPage.jsx";


const router = createBrowserRouter([{
    element: <AppLayout/>,
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/Music",
            element: <MusicPage/>,
            loader: musicLoader,
        },
        {
            path: "/Albums/:id?",
            element: <AlbumsPage/>,
            loader: albumLoader,
        },
        {
            path: "/Settings",
            element: <Settings/>
        }
    ]
}])

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
