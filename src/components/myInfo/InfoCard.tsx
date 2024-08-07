import React from 'react';
import { Link } from "react-router-dom";
import { infoProps } from "@/types";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import fileService from '@/appwrite/file'; 
import {
    FacebookIcon,
    FileIcon,
    FilePenIcon,
    Github,
    InstagramIcon,
    LinkedinIcon,
    Trash2,
    Twitter
} from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export const InfoCard: React.FC<infoProps & { onDelete: (id: string) => void }> = ({
    $id,
    name,
    homeSubtitles,
    homeDescription,
    homeImg,
    aboutImg,
    aboutDescription,
    resume,
    github,
    linkedin,
    twitter,
    facebook,
    instagram,
    mobile,
    email,
    shortAddress,
    fullAddress,
    onDelete,
}) => {
    return (
        <div key={$id}>
            <Card className="w-full max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden">
                <CardHeader className='bg-[#f1f3f5] p-6'>
                    <p className='text-center text-xs underline font-semibold text-muted-foreground mb-5'>For Home Section</p>
                    <div className="flex flex-col md:flex-row justify-center md:justify-between  items-start gap-8">
                        <div className="w-full grid gap-2">
                            <h2 className="text-3xl font-bold capitalize">{name}</h2>
                            <p className="text-muted-foreground font-semibold capitalize">{homeSubtitles}</p>
                            <p className=' text-muted-foreground text-justify'>{homeDescription}</p>
                        </div>
                        <div className=' w-[250px] h-[250px] border border-slate-300 mx-auto rounded-md'>
                            <img
                                src={String(fileService.getFilePreview(homeImg as string))}
                                alt="About Image"
                                className="h-full w-full aspect-square object-contain rounded-md"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className=' space-y-5 py-6'>
                    <p className='text-center text-xs underline font-semibold text-muted-foreground mb-2'>For About Section</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <img
                            src={String(fileService.getFilePreview(aboutImg))}
                            alt="About Image"
                            className="w-[200px] h-[200px] mx-auto border border-slate-300 aspect-square object-contain rounded-full "
                        />
                        <p className=' md:col-span-2 text-muted-foreground text-justify'>{aboutDescription}</p>
                    </div>
                    <div className="flex gap-10 pt-3">
                        <h3 className="text-lg font-semibold">Resume </h3>
                        <Link target='__blank' to={resume} className="text-primary hover:text-blue-600 flex items-center gap-1 max-sm:text-blue-600" >
                            <FileIcon className="w-5 h-5 mr-1" />
                            Download Resume
                        </Link>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Contact Me</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-md font-semibold">Mobile</h4>
                                <p className="text-muted-foreground">{mobile}</p>
                            </div>
                            <div>
                                <h4 className="text-md font-semibold">Email</h4>
                                <p className="text-muted-foreground">{email}</p>
                            </div>
                            <div>
                                <h4 className="text-md font-semibold">Address</h4>
                                <p className="text-muted-foreground">{shortAddress}</p>
                                <p className="text-muted-foreground">{fullAddress}</p>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex sm:flex-row flex-col gap-8">
                        <h3 className="text-lg font-semibold">Connect with Me</h3>
                        <div className="flex flex-wrap items-center gap-x-8">
                            <Link to={github} className="text-primary hover:text-blue-600">
                                <Github  className="w-5 h-5 mr-1" />
                            </Link>
                            <Link to={linkedin} className="text-primary hover:text-blue-600">
                                <LinkedinIcon className="w-5 h-5 mr-1" />
                            </Link>
                            <Link to={twitter} className="text-primary hover:text-blue-600">
                                <Twitter className="w-5 h-5 mr-1" />
                            </Link>
                            <Link to={facebook} className="text-primary hover:text-blue-600">
                                <FacebookIcon className="w-5 h-5 mr-1" />
                            </Link>
                            <Link to={instagram} className="text-primary hover:text-blue-600">
                                <InstagramIcon className="w-5 h-5 mr-1" />
                            </Link>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='space-x-10 mt-5'>
                    <Link to={`/edit/${$id}`} className=' w-full'>
                        <Button variant={"indigo"} className='w-full'>
                            Edit
                            <FilePenIcon size={15} className='ml-2' />
                        </Button>
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={"destructive"} className=' w-full'>Delete<Trash2 size={15} className=' ml-2' /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to delete this Information?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone. Once you delete this project, all associated data will be permanently removed.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete($id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    );
};
