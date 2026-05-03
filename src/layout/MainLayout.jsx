import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ handleOpenCart }) => {
    return (
        <>
            <Navbar handleOpenCart={handleOpenCart} />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
