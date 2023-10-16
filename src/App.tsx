import { createContext } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import MessageBoard from "./MessageBoard";
import AllPosts from "./AllPosts";
import { Welcome } from "./Welcome";
import PostView from "./PostView";
import { SupashipUserInfo, useSession } from "./use-session";
import { welcomeLoader } from "./welcomeLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MessageBoard />,
        children: [
          {
            path: ":pageNumber",
            element: <AllPosts />,
          },
          {
            path: "post/:postId",
            element: <PostView />,
          },
        ],
      },
      {
        path: "welcome",
        element: <Welcome />,
        loader: welcomeLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

export const UserContext = createContext<SupashipUserInfo>({
  session: null,
  profile: null,
});

function Layout() {
  const supashipUserInfo = useSession();
  return (
    <>
      <UserContext.Provider value={supashipUserInfo}>
        <NavBar />
        <Outlet />
      </UserContext.Provider>
    </>
  );
}
