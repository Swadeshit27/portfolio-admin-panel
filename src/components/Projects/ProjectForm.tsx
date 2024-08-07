import { InputField } from "../InputField";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { SelectField } from "../SelectField";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { projectProps } from "@/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import fileService from "@/appwrite/file";
import { useState } from "react";
import { Loading } from "../Loading";
import { ImgPreview } from "../ImgPreview";
import projectService from "@/appwrite/projects";
import { TextareaField } from "../TextareaField";

interface ProjectFormProps {
    project?: projectProps;
}

export const ProjectForm = ({ project }: ProjectFormProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register, control } = useForm<projectProps>({
        defaultValues: {
            title: project?.title || "",
            description: project?.description || "",
            best: project?.best ? "Yes" : "No",
            tags: project?.tags || "",
            category: project?.category || "",
            githubLink: project?.githubLink || "",
            demoLink: project?.demoLink || "",
        },
    });

    const submitForm = async (data: projectProps) => { 
        setLoading(true);
        try {
            data.best = data.best === "Yes" ? true : false;
            console.log(data);
            const file = data.imgSrc[0]
                ? await fileService.uploadFile(data?.imgSrc[0])
                : undefined;

            if (project) {
                if (file) {
                    await fileService.deleteFile(project.imgSrc);
                }
                const updatedProject = await projectService.updateProject(
                    project.$id,
                    {
                        ...data,
                        imgSrc: file ? file.$id : project.imgSrc,
                    }
                );

                if (updatedProject) {
                    toast.success("Project updated successfully");
                }
            } else {
                if (file) {
                    data.imgSrc = file.$id;
                    const response = await projectService.addProject(data);
                    if (response) {
                        toast.success("Project added successfully");
                    }
                }
            }
        } catch (error: any) {
            console.error("Error submitting form:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
            navigate("/projects");
        }
    };

    return (
        <>
            {!loading ? (
                <Card className="max-w-xl mx-auto p-4">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">
                            {project ? "Edit Project" : "Add New Project"}
                        </CardTitle>
                        <CardDescription>
                            Fill out the form to add a new project.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
                            <InputField
                                id="title"
                                label="Project Title"
                                placeholder="e.g. Portfolio website"
                                register={register}
                            />
                            <div className=" flex">
                                <InputField
                                    id="imgSrc"
                                    type="file"
                                    label="project imgSrc"
                                    register={register}
                                    required={!project}
                                />
                                {project && (
                                    <ImgPreview
                                        imgSrc={project.imgSrc}
                                        alt={project.title}
                                        className=" aspect-video w-20 p-1"
                                    />
                                )}
                            </div>
                            <div className=" flex gap-x-5">
                                <SelectField
                                    id="best"
                                    label="Best Project"
                                    placeholder="No"
                                    control={control}
                                    options={["Yes", "No"]}
                                />
                                <SelectField
                                    id="category"
                                    label="project Category"
                                    placeholder="Select a category"
                                    control={control}
                                    options={[
                                        "Fullstack",
                                        "Frontend",
                                        "Backend",
                                        "ReactNative",
                                        "UI/UX",
                                        "CollegeRelated",
                                        "Other",
                                    ]}
                                />
                            </div>
                            <InputField
                                id="demoLink"
                                label="Demo Link"
                                placeholder="example.com"
                                register={register}
                            />
                            <InputField
                                id="githubLink"
                                label="Github Link"
                                placeholder="example.com"
                                register={register}
                            />
                            <TextareaField
                                id="description"
                                label="Project Description"
                                placeholder="write about your project"
                                register={register}
                            />
                            <TextareaField
                                id="tags"
                                label="Tags"
                                placeholder="#reactjs , #nextjs (write similarly separate by coma)"
                                register={register}
                            />
                            <div className=" flex space-x-10 pt-5">
                                <Button
                                    onClick={() => navigate("/projects")}
                                    className=" w-full"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant={"indigo"} className="w-full">
                                    {project ? "Update Project" : "Add Project"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Loading />
            )}
        </>
    );
};
