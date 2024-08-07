import { InputField } from "../InputField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loading } from "../Loading";
import educationService from "@/appwrite/education";
import { TextareaField } from "../TextareaField";
import { educationProps } from "@/types";

interface EducationFormProps {
    education?: educationProps;
}

export const EducationForm = ({ education }: EducationFormProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { handleSubmit, register } = useForm<educationProps>({
        defaultValues: {
            course: education?.course || "",
            duration: education?.duration || "",
            description: education?.description || "",
            result: education?.result || "",
            institute: education?.institute || "",
            marks: education?.marks || "",
        }
    });

    const submitForm = async (data: educationProps) => {
        setLoading(true);
        try {
            if (education) {
                const updatedEducationDetails = await educationService.updateEducation(education?.$id, { ...data });
                if (updatedEducationDetails) {
                    toast.success("Education details updated successfully");
                }
            } else {
                const response = await educationService.addEducation(data);
                if (response) {
                    toast.success("Education details added successfully")
                }
            }
        } catch (error: any) {
            console.error("Error submitting form:", error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            navigate("/education");
        }
    };

    return (
        <>
            {!loading ? (
                <Card className="max-w-xl mx-auto p-4">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Add New Education Details</CardTitle>
                        <CardDescription>Fill out the form to add a new education details to your portfolio.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
                            <InputField
                                id="course"
                                label="Course"
                                placeholder="B.tech in ECE"
                                register={register}
                            />
                            <InputField
                                id="institute"
                                label="Institute Name"
                                placeholder="Enter your institute name"
                                register={register}
                            />
                            <InputField
                                id="duration"
                                label="Duration"
                                placeholder="2021-2025"
                                register={register}
                            />
                            <InputField
                                id="marks"
                                label="Marks"
                                placeholder="643 out of 700 or 9.5 CGPA"
                                register={register}
                            />
                            <InputField
                                id="result"
                                label="Result Link"
                                placeholder="Enter your result link"
                                register={register}
                            />
                            <TextareaField
                                id="description"
                                label="Course Description"
                                placeholder="write about your course"
                                register={register}
                            />
                            <div className=" flex space-x-10 pt-5">
                                <Button onClick={() => navigate("/education")} className=" w-full">Cancel</Button>
                                <Button type="submit" variant={"indigo"} className="w-full">{education ? "Update Education Details" : "Add Education Details"}</Button>
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
