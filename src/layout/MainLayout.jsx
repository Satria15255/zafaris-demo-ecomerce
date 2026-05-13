import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ handleOpenCart, onToggleSidebar }) => {
    return (
        <>
            <Navbar handleOpenCart={handleOpenCart} onToggleSidebar={onToggleSidebar} />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
