import fileService from "@/appwrite/file"
import { Card, CardContent } from "@/components/ui/card"
import { SkillProps } from "@/types"
import React from "react"
import { EditAndDelete } from "../EditAndDelete"

export const SkillCard: React.FC<SkillProps & { onDelete: (id: string) => void }> = ({
    $id,
    icon,
    name,
    category,
    onDelete
}) => {
    return (
            <Card className="w-40 sm:w-48 overflow-hidden shadow-sm hover:shadow-lg">
                <CardContent className="p-2 h-36">
                    <img
                        src={String(fileService.getFilePreview(icon))}
                        alt="Skill Image"
                        width={100}
                        height={100}
                        className="object-contain w-full h-full aspect-square rounded-lg" />
                </CardContent>
                <div className="bg-gray-100 p-2 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <p className="text-sm text-muted-foreground">{category}</p>
                    </div>
                    <EditAndDelete
                        $id={$id}
                        path="/skills/edit"
                        alertTitle="Are you sure you want to delete this skill?"
                        onDelete={onDelete}
                    />
                </div>
            </Card>
    )
}