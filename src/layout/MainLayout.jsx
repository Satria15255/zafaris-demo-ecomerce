import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
