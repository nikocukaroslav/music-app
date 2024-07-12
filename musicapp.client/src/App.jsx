import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/ui/AppLayout.jsx";
import Settings from "@/features/settings/Settings.jsx";
import MusicPage from "@/features/music/MusicPage.jsx";
import { albumLoader, musicLoader } from "@/services/loaders.js";
import AlbumsPage from "@/features/album/AlbumsPage.jsx";
import Login from "@/features/authorization/Login.jsx";
import Authorization from "@/features/authorization/Authorization.jsx";
import Registration from "@/features/authorization/Registration.jsx";
import ProtectedRoute from "@/features/authorization/ProtectedRoute.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/authorization",
    element: <Authorization />,
    children: [
      {
        element: <Login />,
        path: "login",
      },
      {
        element: <Registration />,
        path: "registration",
      },
      {
        element: <Settings global={true} />,
        path: "globalSettings",
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/music",
        element: (
          <ProtectedRoute>
            <MusicPage />
          </ProtectedRoute>
        ),
        loader: musicLoader,
      },
      {
        path: "/albums/:id?",
        element: (
          <ProtectedRoute>
            <AlbumsPage />
          </ProtectedRoute>
        ),
        loader: albumLoader,
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const theme = useSelector((state) => state.settings.theme);

  useEffect(() => {
    import(`./themes/${theme}.css`);
  }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
