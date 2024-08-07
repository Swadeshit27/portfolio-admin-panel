import experienceService from "@/appwrite/experience"
import fileService from "@/appwrite/file"
import ExperienceCard from "@/components/experience/ExperienceCard"
import { Loading } from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { ExperienceProps } from "@/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"



const AllExperience = () => {
    const [allExperiences, setAllExperiences] = useState<ExperienceProps[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        experienceService.getAllExperience()
            .then((res: any) => {
                setAllExperiences(res.documents)
            })
            .catch(error => {
                console.log("Failed to get all experience details", error);
                toast.error(error.message)
            })
            .finally(() => setLoading(false))
    }, [])


    const deleteExperienceById = async (id: string) => {
        try {
            setLoading(true)
            const experience = await experienceService.getExperienceById(id)
            if (experience) {
                if (experience.certificate) await fileService.deleteFile(experience.certificate)
                if (experience.offerLetter) await fileService.deleteFile(experience.offerLetter)
                if (experience.lor) await fileService.deleteFile(experience.lor)
            }
            await experienceService.deleteExperience(id);
            toast.success("Experience deleted successfully");
            setAllExperiences(allExperiences.filter(skill => skill.$id !== id))
        } catch (error: any) {
            console.log("Error while deleting experience", error);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loading />

    return (
        <section>
            <div>
                <Link to="/experience/add">
                    <Button variant="indigo" className="float-right mb-6">Add Experience</Button>
                </Link>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
                {
                    allExperiences.length > 0 ? allExperiences.map((experience) => (
                        <ExperienceCard
                            key={experience.$id}
                            {...experience}
                            OnDelete={deleteExperienceById}
                        />
                    )) : <h2 className="text-center">No experience details found</h2>
                }
            </div>
        </section>
    )
}

export default AllExperience
