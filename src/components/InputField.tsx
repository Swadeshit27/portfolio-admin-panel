import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    register: any;
    required?: boolean;
}

export function InputField({ id, label, placeholder, type = "text", register, required = true }: InputFieldProps) {
    return (
        <div className="flex flex-1 flex-col space-y-2">
            <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
            <Input
                id={id}
                type={type}
                accept={(type === "file") ? "image/png, image/jpg, image/jpeg, image/gif" : undefined}
                placeholder={placeholder}
                {...register(id, { required: {required} })}
            />
        </div>
    );
}
