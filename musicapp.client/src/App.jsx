import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "@/ui/AppLayout.jsx";
import Home from "@/features/home/Home.jsx";
import Settings from "@/features/settings/Settings.jsx";
import MusicPage from "@/features/music/MusicPage.jsx";
import {albumLoader, musicLoader} from "@/services/loaders.js";
import AlbumsPage from "@/features/album/AlbumsPage.jsx";
import Login from "@/features/user/Login.jsx";
import Authorisation from "@/features/user/Authorisation.jsx";
import Registration from "@/features/user/Registration.jsx";


const router = createBrowserRouter([
    {
        path: "/Authorisation",
        element: <Authorisation/>,
        children: [
            {
                element: <Login/>,
                path: "Login"
            },
            {
                element: <Registration/>,
                path: "Registration"
            }
        ]
    },
    {
        path: "/",
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
                path: "Albums/:id?",
                element: <AlbumsPage/>,
                loader: albumLoader,
            },
            {
                path: "Settings",
                element: <Settings/>
            }
        ]
    }
])


function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
