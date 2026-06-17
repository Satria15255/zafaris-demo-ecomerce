import Navbar from "../components/client/Navbar";
import Footer from "../components/client/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ handleOpenCart, onToggleSidebar }) => {
    return (
        <>
            <Navbar
                handleOpenCart={handleOpenCart}
                onToggleSidebar={onToggleSidebar}
            />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
