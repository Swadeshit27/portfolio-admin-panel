import { useNavigate } from "react-router-dom";
import { FilePenIcon, Trash } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface editAndDeleteProps {
    path: string;
    $id: string;
    alertTitle: string;
    alertDescription?: string;
    className?: string;
    onDelete: (id: string) => void;
}

export const EditAndDelete = ({
    $id,
    path,
    alertTitle,
    alertDescription = "This action cannot be undone. Once you delete this project, all associated data will be permanently removed.",
    onDelete,
    className
}: editAndDeleteProps) => {
    const navigate = useNavigate()
    return (
        <div className={cn("flex space-x-3", className)}>
            <FilePenIcon
                className=" text-green-500 cursor-pointer"
                size={18} onClick={() => navigate(`${path}/${$id}`)} />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Trash className=" text-red-500 cursor-pointer" size={18} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                        <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete($id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
