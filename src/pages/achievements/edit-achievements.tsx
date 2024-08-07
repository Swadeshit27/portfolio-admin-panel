import achievementService from "@/appwrite/achievements";
import AchievementsForm from "@/components/achievements/AchievementForm";
import { Loading } from "@/components/Loading";
import { AchievementProps } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditAchievements = () => {
    const { id } = useParams<{ id: string }>();
    const [achievement, setAchievement] = useState<AchievementProps | null>(null)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const getAchievementById = async (id: string) => {
        try {
            setLoading(true)
            const res: any = await achievementService.getAchievementById(id)
            if (res) {
                setAchievement(res);
            }
        } catch (error: any) {
            console.log("Error while fetching achievement", error);
            toast.error(error.message);
            navigate('/achievements')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            getAchievementById(id)
        }
    }, [id, navigate])

    if (loading) return <Loading />

    return (
        <>
            {achievement && <AchievementsForm achievements={achievement} />}
        </>
    )
}

export default EditAchievements
