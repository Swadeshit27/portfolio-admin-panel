import { Label } from "@/components/ui/label" 
import { Textarea } from "@/components/ui/textarea";

interface textareaFieldProps {
    id: string;
    label: string;
    placeholder?: string;
    cols?: number;
    register: any;
}

export function TextareaField({ id, label, placeholder, cols, register }: textareaFieldProps) {
    return (
        <div className="flex flex-col space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Textarea
                id={id}
                cols={cols}
                placeholder={placeholder}
                {...register(`${id}`)}
            />
        </div>
    )
}