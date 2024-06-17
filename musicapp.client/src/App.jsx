import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "@/ui/AppLayout.jsx";
import Home from "@/features/home/Home.jsx";
import Albums from "@/features/album/Albums.jsx";
import Settings from "@/ui/Settings.jsx";
import MusicPage from "@/features/music/MusicPage.jsx";
import {musicLoader} from "@/services/loaders.js";


const router = createBrowserRouter([{
    element: <AppLayout/>,
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/Music",
            loader: musicLoader,
            element: <MusicPage/>
        },
        {
            path: "Albums",
            element: <Albums/>
        },
        {
            path: "Settings",
            element: <Settings/>
        }
    ]
}])

function App() {
    return (<RouterProvider router={router}/>);
}

export default App;
