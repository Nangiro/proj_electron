import { useMemo } from "react"
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import LoginScreen from "./components/LoginScreen"
import Users from "./components/Users"
import AddUser from "./components/AddUser"
import { useAuth } from "./AuthContext"

function ProtectedRoutes() {
    const {auth} = useAuth()

    if(!auth) return <Navigate to={'/login'}/>

    return <Outlet/>

}

export function Routes() {
    const { auth  } = useAuth()

    let AuthRoutes : {}[];

    const PublicRoutes = [
        {
            path: "/",
            element: <LoginScreen/>
        },
        {
            path: "/login",
            element: <LoginScreen/>
        },
        {
            path: "*",
            element: <Navigate to={'/login'}/>
        },
    ]

    AuthRoutes = [
        {
            path: '/',
            element: <ProtectedRoutes/>,
            children: [
                {
                    path: "/",
                    element: <Navigate to={'/users'}/>
                },
                {
                    path: "/users",
                    element: <Users/>
                },
                {
                    path: "/AddUser",
                    element: <AddUser/>
                },
            ]
        }
    ]

    const routes = useMemo(() => createBrowserRouter([
        ...PublicRoutes,
        ...(auth ? AuthRoutes : [])
    ]), [auth])

    return <RouterProvider router={routes}/>
}

export default Routes;