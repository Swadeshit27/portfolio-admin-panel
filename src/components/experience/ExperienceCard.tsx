import { Card } from "@/components/ui/card"
import { ExperienceProps } from "@/types"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { EditAndDelete } from "../EditAndDelete"

type ExperienceCardProps = ExperienceProps & { OnDelete: (id: string) => void }

export default function ExperienceCard({
    $id,
    title,
    duration,
    description,
    place,
    certificate,
    offerLetter,
    lor,
    optional,
    category,
    techTools,
    position,
    OnDelete
}: ExperienceCardProps) {
    const navigate = useNavigate()
    return (
        <Card className="w-full max-w-2xl p-8 grid gap-8">
            <div className="grid gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                        <BriefcaseIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{title}</h2>
                        {position && <p className="text-muted-foreground">{position}</p>}
                    </div>
                </div>
                <div className="text-muted-foreground">
                    {description}
                </div>
            </div>
            <div className="grid gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-md p-3 flex items-center justify-center">
                        <BriefcaseIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-semibold">Category</p>
                        <p className="text-muted-foreground">{category}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-md p-3 flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-semibold">Timeline</p>
                        <p className="text-muted-foreground">{duration}</p>
                    </div>
                </div>
                {certificate &&
                    <div className="flex items-center gap-4">
                        <div className="bg-muted rounded-md p-3 flex items-center justify-center">
                            <AwardIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-semibold">Certificates</p>
                            <Button variant="outline" size="sm" onClick={() => navigate(certificate)} >
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    </div>
                }
                {offerLetter &&
                    <div className="flex items-center gap-4">
                        <div className="bg-muted rounded-md p-3 flex items-center justify-center">
                            <MailOpenIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-semibold">Offer Letter</p>
                            <Button variant="outline" size="sm" onClick={() => navigate(offerLetter)} >
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    </div>
                }
                {lor &&
                    <div className="flex items-center gap-4">
                        <div className="bg-muted rounded-md p-3 flex items-center justify-center">
                            <MailOpenIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-semibold">Offer Letter</p>
                            <Button variant="outline" size="sm" onClick={() => navigate(lor)} >
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    </div>
                }
                {place &&
                    <div className="flex items-center gap-2">
                        <LocateIcon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{place}</span>
                    </div>
                }
                {techTools &&
                    <div className="flex items-center gap-2">
                        <BoxIcon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{techTools}</span>
                    </div>
                }
                {optional &&
                    <div className="text-muted-foreground">
                        {optional}
                    </div>
                }
                <EditAndDelete
                    $id={$id}
                    path='/experience/edit'
                    onDelete={OnDelete}
                    alertTitle='Are you sure you want to delete this experience ?'
                    className="justify-end"
                />
            </div> 
        </Card >
    )
}

function DownloadIcon(props: any) {
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
    )
}

function BoxIcon(props: any) {
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
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    )
}


function LocateIcon(props: any) {
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
            <line x1="2" x2="5" y1="12" y2="12" />
            <line x1="19" x2="22" y1="12" y2="12" />
            <line x1="12" x2="12" y1="2" y2="5" />
            <line x1="12" x2="12" y1="19" y2="22" />
            <circle cx="12" cy="12" r="7" />
        </svg>
    )
}

function CalendarIcon(props: any) {
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
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
        </svg>
    )
}

function AwardIcon(props: any) {
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
            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
            <circle cx="12" cy="8" r="6" />
        </svg>
    )
}


function BriefcaseIcon(props: any) {
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
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
    )
}

function MailOpenIcon(props: any) {
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
            <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
            <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
        </svg>
    )
}