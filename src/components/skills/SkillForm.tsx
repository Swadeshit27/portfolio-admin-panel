import { InputField } from "../InputField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SelectField } from "../SelectField";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { SkillProps } from "@/types";
import skillsService from "@/appwrite/skills";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import fileService from "@/appwrite/file";
import { useState } from "react";
import { Loading } from "../Loading";
import { ImgPreview } from "../ImgPreview";
import { TextareaField } from "../TextareaField";

interface SkillFormProps {
    skill?: SkillProps;
}

export const SkillForm = ({ skill }: SkillFormProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { handleSubmit, register, control } = useForm<SkillProps>({
        defaultValues: {
            name: skill?.name || "",
            category: skill?.category || "",
            details: skill?.details || "",
        }
    });

    const submitForm = async (data: SkillProps) => {
        setLoading(true);
        try {
            const file = (data.icon[0]) ? await fileService.uploadFile(data?.icon[0]) : undefined;

            if (skill) {
                if (file) {
                    await fileService.deleteFile(skill.icon);
                }
                const updatedSkill = await skillsService.updateSkill(skill.$id, {
                    ...data,
                    icon: file ? file.$id : skill.icon,
                });
                if (updatedSkill) {
                    toast.success("Skill updated successfully");
                }
            } else {
                if (file) {
                    data.icon = file.$id
                    const response = await skillsService.addSkill(data);
                    if (response) {
                        toast.success("Skill added successfully")
                    }
                }
            }
        } catch (error: any) {
            console.error("Error submitting form:", error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            navigate("/skills");
        }
    };

    return (
        <>
            {!loading ? (
                <Card className="max-w-xl mx-auto p-4">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Add a New Skill</CardTitle>
                        <CardDescription>Fill out the form to add a new skill to your portfolio.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
                            <InputField
                                id="name"
                                label="Skill Name"
                                placeholder="e.g. React.js"
                                register={register}
                            />
                            <div className=" flex">
                                <InputField
                                    id="icon"
                                    type="file"
                                    label="Skill Icon"
                                    register={register}
                                    required={skill ? false : true}
                                />
                                {skill && (
                                    <ImgPreview
                                        imgSrc={skill.icon}
                                        alt={skill.name}
                                        className=" aspect-square w-20 p-1"
                                    />
                                )}
                            </div>
                            <SelectField
                                id="category"
                                label="Skill Category"
                                placeholder="Select a category"
                                control={control}
                                options={["Frontend", "Backend", "Language", "ReactNative", "Tools", "SoftSkills", "others"]}
                            />
                            <TextareaField
                                id="details"
                                label="Skill Details"
                                placeholder="Describe your skill"
                                register={register}
                            />
                            <div className=" flex space-x-10 pt-5">
                                <Button onClick={() => navigate("/skills")} className=" w-full">Cancel</Button>
                                <Button type="submit" variant={"indigo"} className="w-full">{skill ? "Update Skill" : "Add Skill"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) :
                <Loading />
            }
        </>
    );
};
