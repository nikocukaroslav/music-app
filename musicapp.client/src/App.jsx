import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "@/ui/AppLayout.jsx";
import Settings from "@/features/settings/Settings.jsx";
import MusicPage from "@/features/music/MusicPage.jsx";
import {albumLoader, musicLoader} from "@/services/loaders.js";
import AlbumsPage from "@/features/album/AlbumsPage.jsx";
import Login from "@/features/authorization/Login.jsx";
import Authorization from "@/features/authorization/Authorization.jsx";
import Registration from "@/features/authorization/Registration.jsx";
import ProtectedRoute from "@/features/authorization/ProtectedRoute.jsx";


const router = createBrowserRouter([
    {
        path: "/Authorization",
        element: <Authorization/>,
        children: [
            {
                element: <Login/>,
                path: "Login"
            },
            {
                element: <Registration/>,
                path: "Registration"
            },
            {
                element: <Settings global={true}/>,
                path: "GlobalSettings"
            }
        ]
    },
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/Music",
                element:
                    <ProtectedRoute>
                        <MusicPage/>
                    </ProtectedRoute>,
                loader: musicLoader,
            },
            {
                path: "Albums/:id?",
                element:
                    <ProtectedRoute>
                        <AlbumsPage/>
                    </ProtectedRoute>,
                loader: albumLoader,
            },
            {
                path: "Settings",
                element:
                    <ProtectedRoute>
                        <Settings/>
                    </ProtectedRoute>,
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
