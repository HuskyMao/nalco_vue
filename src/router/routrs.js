
import Home from "@/views/Home";
import LoginPage from "../views/LoginPage";
export default [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: LoginPage
    }
]
