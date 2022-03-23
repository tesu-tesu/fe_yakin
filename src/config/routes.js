import Dashboard from "../pages/guest/Dashboard";
import Donasi from "../pages/guest/Donasi";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import ProfileAdmin from "../pages/admin/ProfileAdmin";


export const APP_ROUTE = [
    {
        name: "Login",
        path: "/login",
        component: Login,
        exact: true,
        restricted: true,
        private: false,
    },
    {
        name: "Register",
        path: "/register",
        component: Register,
        exact: true,
        restricted: true,
        private: false,
    },
    {
        name: "Dashboard",
        path: "/",
        component: Dashboard,
        exact: true,
        restricted: true,
        private: false,
    },
    {
        name: "Donasi",
        path: "/donasi",
        component: Donasi,
        exact: true,
        restricted: true,
        private: false,
    },
]

export const PRIVATE_ROUTE = [
    {
        name: "Admin Dashboard",
        path: "/admin_dashboard",
        component: DashboardAdmin,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "Profile Admin",
        path: "/admin_profile",
        component: ProfileAdmin,
        exact: true,
        restricted: false,
        private: true,
    },   
]