import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BoltIcon, BookOpenIcon, BriefcaseIcon, Cog, Power, TrophyIcon, UserIcon } from 'lucide-react';
import authService from '@/appwrite/auth';
import toast from 'react-hot-toast';

type Props = {
    className?: string;
};

type Item = {
    name: string;
    path: string;
    icon: React.ReactElement;
};

const NavItems: Item[] = [
    {
        name: "Myinfo",
        path: "/",
        icon: <UserIcon className="h-5 w-5" />
    },
    {
        name: "Education",
        path: "/education",
        icon: <BookOpenIcon className="h-5 w-5" />
    },
    {
        name: "Project",
        path: "/projects",
        icon: <BriefcaseIcon className="h-5 w-5" />
    },
    {
        name: "Skills",
        path: "/skills",
        icon: <BoltIcon className="h-5 w-5" />

    },
    {
        name: "Achievements",
        path: "/achievements",
        icon: <TrophyIcon className="h-5 w-5" />

    },
    {
        name: "Experience",
        path: "/experience",
        icon: <Cog size={22} />,
    },
];

export const Sidebar = ({ className }: Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = '/' + location.pathname.split('/')[1];

    const LogOut = async () => {
        await authService.logout();
        sessionStorage.setItem('isLoggedIn', 'false');
        toast.success("Logout successful")
        navigate('/login');
    }

    return (
        <div className={cn('h-screen lg:w-[280px] lg:sticky left-0 top-0  border-r-2 border-slate-200 flex-col',
            className
        )}>
            <div className="flex h-14 items-center justify-center border-b p-6">
                <Link to="/" className="flex items-center gap-2 font-semibold text-gray-600">
                    <UserIcon className="h-6 w-6" />
                    <span className="">Swadesh Pal, Admin</span>
                </Link>
            </div>
            <nav className="flex flex-1 flex-col space-y-5 p-6">
                {NavItems.map(item => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`${path === item.path ? 'text-blue-600' : 'text-slate-700'} flex items-center gap-4 rounded-md px-3 py-2 text-lg font-medium hover:text-blue-600 transition-colors hover:bg-muted`}
                    >
                        {item.icon}
                        {item.name}
                    </Link>))}
                <div
                    onClick={LogOut}
                    className='lg:flex hidden items-center gap-4 rounded-md px-3 py-2 text-lg font-medium text-foreground text-rose-500 transition-colors hover:bg-muted cursor-pointer'
                >
                    <Power className='w-5 h-5' />
                    Logout
                </div>
            </nav>
        </div>
    );
};
