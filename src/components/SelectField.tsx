import { Label } from "@/components/ui/label"
import { Controller } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface selectFieldProps {
    id: string;
    label: string;
    placeholder?: string;
    control: any;
    options: string[];
}

export function SelectField({ id, label, placeholder = "Select", options, control }: selectFieldProps) {
    return (
        <div className="flex flex-col space-y-3 w-full pb-0">
            <Label htmlFor={id}>{label} :</Label>
            <Controller
                name={id}
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id={id}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {options.map(item => (
                                <SelectItem value={item} className=" capitalize" key={item}>{item}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    )
}