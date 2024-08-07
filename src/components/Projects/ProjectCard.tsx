import React from 'react';
import { Link } from "react-router-dom";
import { projectProps } from "@/types";
import { Card, CardContent } from '../ui/card';
import fileService from '@/appwrite/file';
import { EditAndDelete } from '../EditAndDelete';

export const ProjectCard: React.FC<projectProps & { onDelete: (id: string) => void }> = ({
  $id,
  imgSrc,
  title,
  description,
  isBest,
  tags,
  category,
  githubLink,
  demoLink,
  onDelete,
}) => {
  return (
    <div className="flex flex-col gap-y-8" key={$id}>
      <Card className="max-lg:max-w-lg mx-auto w-full relative">
        <CardContent className="p-4 text-sm sm:text-base">
          <div className="flex max-lg:flex-col gap-x-5">
            <img
              src={String(fileService.getFilePreview(imgSrc as string))}
              alt="project-image"
              className="w-full lg:w-[23rem] sm:h-64 rounded-md object-contain"
            />
            <div className="flex flex-col space-y-2 flex-1">
              <div className=' w-full flex justify-between items-center'>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 max-lg:mt-3 capitalize">{title}</h1>
                <EditAndDelete
                  $id={$id}
                  path='/projects/edit'
                  onDelete={onDelete}
                  alertTitle='Are you sure you want to delete this project?'
                />
              </div>
              <p className="text-justify">{description}</p>
              <div className="space-x-10 font-semibold">
                <span>Best: {isBest ? "Yes" : "No"}</span>
                <span>Category: {category}</span>
              </div>
              <p><b>Tools: </b>{tags}</p>
            </div>
          </div>
          <div className="mt-2">
            <div>
              <span className="font-semibold">Github Link: </span>
              <Link to={githubLink} className="text-blue-700 hover:underline max-sm:underline">{githubLink}</Link>
            </div>
            <div>
              <span className="font-semibold">Demo Link: </span>
              <Link to={demoLink} className="text-blue-700 hover:underline max-sm:underline">{demoLink}</Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
