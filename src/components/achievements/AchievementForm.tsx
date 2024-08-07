
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AchievementProps } from "@/types"
import { InputField } from "../InputField"
import { TextareaField } from "../TextareaField"
import { ImgPreview } from "../ImgPreview"
import { Loading } from "../Loading"
import fileService from "@/appwrite/file"
import achievementService from "@/appwrite/achievements"
import toast from "react-hot-toast"

export default function AchievementsForm({ achievements }: { achievements?: AchievementProps }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { handleSubmit, register } = useForm<AchievementProps>({
        defaultValues: {
            title: achievements?.title || "",
            description: achievements?.description || "",
            attachment: achievements?.attachment || "",
            fileLink: achievements?.fileLink || "",
        }
    });

    const submitForm = async (data: AchievementProps) => {
        setLoading(true); 
        try {
            const file = (data.attachment[0]) ? await fileService.uploadFile(data?.attachment[0]) : undefined;
            if (achievements) {
                if (file) {
                    await fileService.deleteFile(achievements.attachment);
                }
                const updatedAchievements = await achievementService.updateAchievement(achievements.$id, {
                    ...data,
                    attachment: file ? file.$id : achievements.attachment,
                }); 
                if (updatedAchievements) {
                    toast.success("Achievements updated successfully");
                }
            } else {
                if (file) {
                    data.attachment = file.$id
                    const response = await achievementService.addAchievement(data);
                    if (response) {
                        toast.success("Achievements added successfully")
                    }
                }
            }
        } catch (error:any) {
            console.error("Error submitting form:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
            navigate("/achievements");
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <Card className="max-w-xl mx-auto p-6 ">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add your achievements</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
                    <InputField
                        id="title"
                        label="Achievement Title"
                        placeholder="Enter a title"
                        register={register}
                    />
                    <div className="flex">
                        <InputField
                            id="attachment"
                            type="file"
                            label="Attachment"
                            register={register}
                        />
                        {achievements && (
                            <ImgPreview
                                imgSrc={achievements.attachment}
                                alt={achievements.title}
                                className=" aspect-square w-20 p-1"
                            />
                        )}
                    </div>
                    <InputField
                        id="fileLink"
                        label="File Link"
                        placeholder="https://example.com/file.pdf"
                        register={register}
                    />
                    <TextareaField
                        id="description"
                        label="Description"
                        placeholder="Enter a description"
                        register={register}
                    />
                    <div className=" flex space-x-10 pt-5">
                        <Button onClick={() => navigate("/achievements")} className=" w-full">Cancel</Button>
                        <Button type="submit" variant={"indigo"} className="w-full">{achievements ? "Update Achievement" : "Add Achievement"}</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}