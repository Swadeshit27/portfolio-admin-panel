
import { Card, CardFooter } from "@/components/ui/card"
import { AchievementProps } from "@/types"
import { Link } from "react-router-dom"
import { EditAndDelete } from "../EditAndDelete"

type AchievementCardProps = AchievementProps & { onDelete: (id: string) => void };

export default function AchievementCard({
    $id, title, description, attachment, fileLink, onDelete
}: AchievementCardProps) {

    return (
        <Card className="w-full  p-6 grid gap-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>
            {attachment &&
                <Link to={attachment} className="flex items-center gap-4">
                    <div className="bg-muted rounded-md p-3 flex items-center justify-center">
                        <FileIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground">attachment</div>
                </Link>
            }
            {fileLink &&
                <Link to={fileLink} className="flex items-center gap-4">
                    <div className="bg-muted rounded-md p-3 flex items-center justify-center">
                        <FileIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground">file link</div>
                </Link>
            }
            <CardFooter>
                <EditAndDelete
                    $id={$id}
                    path='/achievements/edit'
                    onDelete={onDelete}
                    alertTitle='Are you sure you want to delete this achievement ?'
                />
            </CardFooter>
        </Card>
    )
}

function FileIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    )
}