import AdminLayout from "../Layouts/AdminLayout"
import DefaultLayout from "../Layouts/DefaultLayout"
import Attendance from "../components/Attendance"
import Class from "../components/Class"
import Dashboard from "../components/Dashboard"
import GLV from "../components/GLV"
import LoginForm from "../components/LoginForm"
import NotFound from "../components/NotFound"
import Score from "../components/Score"
import Student from "../components/Student"
import Home from "../pages/Home"
const privateRoutes = [
    {
      path: "/dashboard",
      element: <Dashboard />,
      layout: AdminLayout,
      roles: [5150,1984]
    },
    {
      path: "/glv",
      element: <GLV />,
      layout: AdminLayout,
      roles: [5150]
    },
    {
      path: "/students",
      element: <Student />,
      layout: AdminLayout,
      roles: [5150, 1984]
    },
    {
      path: "/score",
      element: <Score />,
      layout: AdminLayout,
      roles: [5150, 1984]
    },
    {
      path: "/classes",
      element: <Class />,
      layout: AdminLayout,
      roles: [5150]
    },
    {
      path: "/attendance",
      element: <Attendance />,
      layout: AdminLayout,
      roles: [5150,1984]
    },
    {
      path: '*',
      element: <NotFound/>,
      layout: DefaultLayout,
      roles: [5150,1984]
    }
    
  ];
const publicRoutes = [
    {
        path: '/',
        element: <Home/>,
        layout: DefaultLayout
    },
    {
        path: '/login',
        element: <LoginForm/>,
        layout: DefaultLayout
    },
    {
        path: '*',
        element: <NotFound/>,
        layout: DefaultLayout
    }
]

export {
    publicRoutes,
    privateRoutes
}