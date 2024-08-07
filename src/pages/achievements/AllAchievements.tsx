import achievementService from "@/appwrite/achievements"
import fileService from "@/appwrite/file"
import AchievementCard from "@/components/achievements/AchievementCard"
import { Loading } from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { AchievementProps } from "@/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"


function AllAchievements() {

    const [achievements, setAchievements] = useState<AchievementProps[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        achievementService.getAllAchievements()
            .then((res: any) => {
                setAchievements(res.documents)
            })
            .catch(error => {
                console.log("Failed to get achievements", error);
                toast.error(error.message)
            })
            .finally(() => setLoading(false))
    }, [])


    const deleteAchievementById = async (id: string) => {
        try {
            const res = await achievementService.deleteAchievement(id)
            if (res) {
                toast.success("Achievement deleted successfully");
                const achievement = achievements.find(skill => skill.$id === id);
                if (achievement?.attachment) await fileService.deleteFile(achievement.attachment);
                setAchievements(achievements.filter(skill => skill.$id !== id));
            }
        } catch (error: any) {
            console.log("Error while deleting achievement", error);
            toast.error(error.message);
        }
    }

    if (loading) return <Loading />
    
    return (
        <>
            <div className="flex flex-col">
                <Link to="/achievements/add">
                    <Button variant="indigo" className="float-right mb-6">Add Achievement</Button>
                </Link>
                {(achievements.length !== 0) ? (
                    <div className="grid  lg:grid-cols-2 gap-5">
                        {achievements.map(achievement => (
                            <AchievementCard
                                key={achievement.$id}
                                {...achievement}
                                onDelete={deleteAchievementById}
                            />
                        ))}
                    </div>
                ) :
                    <h1 className=" w-full mt-10 text-center text-2xl text-slate-500">No achievements are Found</h1>
                }
            </div>
        </>
    )
}

export default AllAchievements
