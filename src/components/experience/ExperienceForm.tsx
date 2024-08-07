
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ExperienceProps } from "@/types"
import fileService from "@/appwrite/file"
import toast from "react-hot-toast"
import { InputField } from "../InputField"
import { TextareaField } from "../TextareaField"
import { SelectField } from "../SelectField"
import { useNavigate } from "react-router-dom"
import { Loading } from "../Loading"
import experienceService from "@/appwrite/experience"

export default function ExperienceForm({ experience }: { experience?: ExperienceProps }) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { handleSubmit, register, control } = useForm<ExperienceProps>({
        defaultValues: {
            title: experience?.title || "",
            duration: experience?.duration || "",
            description: experience?.description || "",
            place: experience?.place || "",
            certificate: experience?.certificate || "",
            offerLetter: experience?.offerLetter || "",
            lor: experience?.lor || "",
            optional: experience?.optional || "",
            category: experience?.category || "",
            techTools: experience?.techTools || "",
            position: experience?.position || "",
        }
    });

    const submitForm = async (data: ExperienceProps) => {
        setLoading(true); 
        try {
            const certificateUrl = (data.certificate[0]) ? await fileService.uploadFile(data?.certificate[0]) : undefined;
            const offerLetterUrl = (data.offerLetter[0]) ? await fileService.uploadFile(data?.offerLetter[0]) : undefined;
            const lorUrl = (data.lor[0]) ? await fileService.uploadFile(data?.lor[0]) : undefined;
            if (experience) {
                if (certificateUrl) await fileService.deleteFile(experience.certificate);
                if (offerLetterUrl) await fileService.deleteFile(experience.offerLetter);
                if (lorUrl) await fileService.deleteFile(experience.lor);

                const updatedExperience = await experienceService.updateExperience(experience.$id, {
                    ...data,
                    certificate: certificateUrl ? certificateUrl.$id : experience.certificate,
                    offerLetter: offerLetterUrl ? offerLetterUrl.$id : experience.offerLetter,
                    lor: lorUrl ? lorUrl.$id : experience.lor
                }); 
                if (updatedExperience) {
                    toast.success("Experience updated successfully");
                }
            } else {
                if (certificateUrl) data.certificate = certificateUrl.$id;
                if (offerLetterUrl) data.offerLetter = offerLetterUrl.$id;
                if (lorUrl) data.lor = lorUrl.$id;
                const response = await experienceService.addExperience(data);
                if (response) {
                    toast.success("Experience added successfully")
                }
            }
        } catch (error: any) {
            console.error("Error submitting form:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
            navigate("/experience");
        }
    }

    if (loading) return <Loading />

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Add New Experience</CardTitle>
                <CardDescription>
                    Fill out the form to add a new job, internship, or other experience to your profile.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit(submitForm)} >
                    <InputField
                        id="title"
                        label="Company/Organization/event name"
                        placeholder="Abc Pvt Ltd / Smart India Hackathon"
                        register={register}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            id="position"
                            label="Role"
                            placeholder="Full Stack Developer / Team Lead"
                            register={register}
                        />
                        <SelectField
                            id="category"
                            label="choose the category"
                            options={["Internship", "Job", "OpenSource", "Hackathon", "PartTime", "other"]}
                            control={control}
                        />
                    </div>
                    <TextareaField
                        id="description"
                        label="Description"
                        placeholder="Brief description of your experience"
                        register={register}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            id="duration"
                            label="Duration"
                            placeholder="13th May 2024 - 13th June 2024"
                            register={register}
                        />
                        <InputField
                            id="place"
                            label="Place"
                            placeholder="Enter the location like city, state / remote"
                            register={register}
                        />
                    </div>
                    <InputField
                        id="certificate"
                        label="Upload Certificate"
                        type="file"
                        register={register}
                    />
                    <InputField
                        id="offerLetter"
                        label="Offer Letter / Joining Letter"
                        type="file"
                        register={register}
                    />
                    <InputField
                        id="lor"
                        label="Letter of Recommendation (LOR)"
                        type="file"
                        register={register}
                    />
                    <TextareaField
                        id="optional"
                        label="Optional Fields"
                        placeholder="Add any additional information"
                        register={register}
                    />
                    <div className=" flex space-x-10 pt-5">
                        <Button
                            onClick={() => navigate("/experience")}
                            className=" w-full"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant={"indigo"}
                            className="w-full">
                            {experience ? "Update experience" : "Add experience"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}