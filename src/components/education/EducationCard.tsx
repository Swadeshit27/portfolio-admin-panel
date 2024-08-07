import { Card } from "@/components/ui/card"
import { educationProps } from "@/types"
import React from "react"
import { EditAndDelete } from "../EditAndDelete"
import { GraduationCapIcon } from "lucide-react"

export const EducationCard: React.FC<educationProps & { onDelete: (id: string) => void }> = ({
    $id,
    course,
    duration,
    description,
    onDelete
}) => {
    return (
        <Card className="w-full  mx-auto p-6 grid gap-6">
            <div className="flex items-center gap-4">
                <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <GraduationCapIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{course}</h3>
            </div>
            <div className="text-muted-foreground">{description}</div>
            <div className="w-full flex justify-between">
                <div className="text-sm text-muted-foreground">{duration}</div>
                <EditAndDelete
                    $id={$id}
                    path="/education/edit"
                    alertTitle="Are you sure you want to delete this education details?"
                    onDelete={onDelete}
                />
            </div>
        </Card>
    )
}