import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader'; 


const Layout = () => {
    return (
        <div className="flex">
            <MobileHeader />
            <Sidebar className="hidden lg:flex" />
            <div className="min-h-screen flex-1 max-lg:pt-20 p-5 bg-gray-200">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
