import { InputField } from "../InputField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { infoProps } from "@/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import fileService from "@/appwrite/file";
import { useState } from "react";
import { Loading } from "../Loading";
import { ImgPreview } from "../ImgPreview";
import { TextareaField } from "../TextareaField";
import myInfoService from "@/appwrite/myinfo";

interface ProjectFormProps {
    info?: infoProps;
}


export const InfoForm = ({ info }: ProjectFormProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { handleSubmit, register } = useForm<infoProps>({
        defaultValues: {
            name: info?.name || "",
            homeSubtitles: info?.homeSubtitles || "",
            homeDescription: info?.homeDescription || "",
            homeImg: info?.homeImg || "",
            aboutImg: info?.aboutImg || "",
            aboutDescription: info?.aboutDescription || "",
            resume: info?.resume || "",
            github: info?.github || "",
            linkedin: info?.linkedin || "",
            twitter: info?.twitter || "",
            facebook: info?.facebook || "",
            instagram: info?.instagram || "",
            mobile: info?.mobile || "",
            email: info?.email || "",
            shortAddress: info?.shortAddress || "",
            fullAddress: info?.fullAddress || "",
        }
    });

    const submitForm = async (data: infoProps) => { 
        setLoading(true);
        try {
            const homeImg = (data.homeImg[0]) ? await fileService.uploadFile(data.homeImg[0]) : undefined;
            const aboutImg = (data.aboutImg[0]) ? await fileService.uploadFile(data.aboutImg[0]) : undefined;

            if (info) {
                if (homeImg) {
                    await fileService.deleteFile(info.homeImg);
                }
                if (aboutImg) {
                    await fileService.deleteFile(info.aboutImg);
                }

                const updatedInfo = await myInfoService.updateInfo(info.$id, {
                    ...data,
                    homeImg: homeImg ? homeImg.$id : info.homeImg,
                    aboutImg: aboutImg ? aboutImg.$id : info.aboutImg,
                });

                if (updatedInfo) {
                    toast.success("Information updated successfully");
                }
            } else {
                if (homeImg && aboutImg) {
                    data.homeImg = homeImg.$id
                    data.aboutImg = aboutImg.$id
                    const response = await myInfoService.addInfo(data)
                    if (response) {
                        toast.success("Info added successfully")
                    }
                }
            }
        } catch (error:any) {
            console.error("Error submitting form:", error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            navigate("/");
        }
    };

    return (
        <>
            {!loading ? (
                <Card className="max-w-xl mx-auto p-4">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{info ? "Edit Your Information" : "Add Your Information"}</CardTitle>
                        <CardDescription>Fill out the form to provide more details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
                            <InputField
                                id="name"
                                label="Name"
                                placeholder="Enter your name"
                                register={register}
                            />
                            <div className=" flex">
                                <InputField
                                    id="homeImg"
                                    type="file"
                                    label="Home Image"
                                    register={register}
                                    required={!info}
                                />
                                {info && (
                                    <ImgPreview
                                        imgSrc={info.homeImg}
                                        alt={"home image"}
                                        className=" aspect-video w-20 p-1"
                                    />
                                )}
                            </div>
                            <InputField
                                id="homeSubtitles"
                                label="Home Subtitles"
                                placeholder="Fullstack web developer"
                                register={register}
                            />
                            <TextareaField
                                id="homeDescription"
                                label="Home Description"
                                placeholder="Write something for home section description"
                                register={register}
                            />

                            {/* about page */}
                            <div className=" flex">
                                <InputField
                                    id="aboutImg"
                                    type="file"
                                    label="About Image"
                                    register={register}
                                    required={!info}
                                />
                                {info && (
                                    <ImgPreview
                                        imgSrc={info.aboutImg}
                                        alt={"about image"}
                                        className=" aspect-video w-20 p-1"
                                    />
                                )}
                            </div>
                            <TextareaField
                                id="aboutDescription"
                                label="About's Description"
                                placeholder="Write something for about section description"
                                register={register}
                            />
                            <InputField
                                id="mobile"
                                label="Mobile Number"
                                placeholder="Enter your mobile number"
                                register={register}
                            />
                            <InputField
                                id="email"
                                label="Email Address"
                                placeholder="Enter your email address"
                                register={register}
                            />
                            <InputField
                                id="resume"
                                label="Resume Link"
                                placeholder="Enter your resume link"
                                register={register}
                            />
                            <InputField
                                id="github"
                                label="Github Profile Link"
                                placeholder="Enter your github profile link"
                                register={register}
                            />
                            <InputField
                                id="linkedin"
                                label="Linkedin Profile Link"
                                placeholder="Enter your linkedin profile link"
                                register={register}
                            />
                            <InputField
                                id="twitter"
                                label="Twitter Profile Link"
                                placeholder="Enter your twitter profile link"
                                register={register}
                            />
                            <InputField
                                id="facebook"
                                label="Facebook Profile Link"
                                placeholder="Enter your facebook profile link"
                                register={register}
                            />
                            <InputField
                                id="instagram"
                                label="Instagram Profile Link"
                                placeholder="Enter your Instagram profile link"
                                register={register}
                            />
                            <InputField
                                id="shortAddress"
                                label="Short Address"
                                placeholder="City, State"
                                register={register}
                            />
                            <TextareaField
                                id="fullAddress"
                                label="Full Address"
                                placeholder="Enter your full address"
                                register={register}
                            />
                            <div className=" flex space-x-10 pt-5">
                                <Button onClick={() => navigate("/")} className=" w-full">Cancel</Button>
                                <Button type="submit" variant={"indigo"} className="w-full">{info ? "Update info" : "Add info"}</Button>
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
