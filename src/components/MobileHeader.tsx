import { Menu, Power } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import toast from "react-hot-toast"; 
import authService from '@/appwrite/auth'; 
import { useNavigate } from "react-router-dom";

export const MobileHeader = () => {
    const navigate = useNavigate();

    const LogOut = async () => {
        await authService.logout();
        sessionStorage.setItem('isLoggedIn', 'false');
        toast.success("Logout successful")
        navigate('/login');
    }

    return (
        <nav className="fixed top-0 w-full px-8 py-4 bg-white text-white flex justify-between items-center  z-50 lg:hidden">
            <Sheet>
                <div className=" w-full flex justify-between items-center">
                    <SheetTrigger >
                        <Menu className="text-black" />
                    </SheetTrigger>
                    <Power onClick={LogOut} className=" h-5 w-5 text-rose-600 cursor-pointer" />
                </div>

                <SheetContent className="z-[100] p-0" side="left">
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </nav>
    );
};
