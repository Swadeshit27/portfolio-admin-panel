import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EditProjectCardProps {
    editLink: string;
    $id: string;
    onDelete: ($id: string) => void;
}

export const EditAndDeleteConformation: React.FC<EditProjectCardProps> = ({ $id, editLink, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            <EllipsisVertical
                onClick={() => { setShowMenu(!showMenu) }}
                className="absolute top-4 right-4 cursor-pointer"
                size={20}
            />
            {showMenu && (
                <div className="w-20 p-3 flex flex-col space-y-2 bg-white shadow-md rounded-md absolute top-5 right-10">
                    <a
                        className="hover:text-blue-600 cursor-pointer font-semibold"
                        onClick={() => navigate(`${editLink}/${$id}`)}
                    >
                        Edit
                    </a>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <a className="hover:text-blue-600 cursor-pointer font-semibold">
                                Delete
                            </a>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. Once you delete this project, all associated data will be permanently removed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setShowMenu(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete($id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>
    );
};
