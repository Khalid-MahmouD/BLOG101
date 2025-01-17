import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Bounce } from "react-toastify"

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />

        </>
    )
}

export default MainLayout
