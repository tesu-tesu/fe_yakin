import Dashboard from "../pages/guest/Dashboard";
import Donasi from "../pages/guest/Donasi";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminAllProgram from "../pages/admin/AdminAllProgram";
import ProfileAdmin from "../pages/admin/ProfileAdmin";
import CreateProgram from "../pages/admin/CreateProgram"
import EditProgram from "../pages/admin/EditProgram"
import DetailProgram from "../pages/admin/DetailProgram"
import AdminAllProgramUnggulan from "../pages/admin/AdminAllProgramUnggulan"
import CreateProgramUnggulan from "../pages/admin/CreateProgramUnggulan"
import UpdateProgramUnggulan from "../pages/admin/UpdateProgramUnggulan"
import DetailProgramUnggulan from "../pages/admin/DetailProgramUnggulan"
import AllProgram from "../pages/guest/AllProgram";
import AllProgramUnggulan from "../pages/guest/AllProgramUnggulan";
import TentangKami from "../pages/guest/TentangKami";

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
    {
        name: "All Program",
        path: "/all_program",
        component: AllProgram,
        exact: true,
        restricted: true,
        private: false,
    },
    {
        name: "All Program Unggulan",
        path: "/all_program_unggulan",
        component: AllProgramUnggulan,
        exact: true,
        restricted: true,
        private: false,
    },
    {
        name: "Tentang Kami",
        path: "/tentang_kami",
        component: TentangKami,
        exact: true,
        restricted: true,
        private: false,
    },
]

export const PRIVATE_ROUTE = [
    {
        name: "All Program",
        path: "/admin/all_program",
        component: AdminAllProgram,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "Profile Admin",
        path: "/admin/admin_profile",
        component: ProfileAdmin,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "Program",
        path: "/admin/program",
        component: CreateProgram,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "Create Program",
        path: "/admin/create_program",
        component: CreateProgram,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "Edit Program",
        path: "/admin/edit_program",
        component: EditProgram,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "Detail Program",
        path: "/admin/detail_program",
        component: DetailProgram,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "All Program Unggulan",
        path: "/admin/all_program_unggulan",
        component: AdminAllProgramUnggulan,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "Create Program Unggulan",
        path: "/admin/create_program_unggulan",
        component: CreateProgramUnggulan,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "Edit Program Unggulan",
        path: "/admin/edit_program_unggulan",
        component: UpdateProgramUnggulan,
        exact: true,
        restricted: false,
        private: true,
    },   
    {
        name: "Detail Program Unggulan",
        path: "/admin/detail_program_unggulan",
        component: DetailProgramUnggulan,
        exact: true,
        restricted: false,
        private: true,
    },   
]