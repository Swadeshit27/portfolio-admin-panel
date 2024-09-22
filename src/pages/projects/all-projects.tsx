import projectService from "@/appwrite/projects";
import { ProjectCard } from "@/components/Projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { projectProps } from "@/types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Loading } from "@/components/Loading";
import fileService from "@/appwrite/file";

const AllProjects: React.FC = () => {
    const [projects, setProjects] = useState<projectProps[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        projectService.getAllProject()
            .then((response: any) => {
                if (response) {
                    setProjects(response.documents.reverse());
                }
            })
            .catch((err) => {
                console.log("Error while getting all projects", err);
                toast.error(err.message);
            })
            .finally(() => setLoading(false))
    }, []);

    const handleDeleteProject = async (id: string) => {
        try {
            setLoading(true);
            const project = projects.find(project => project.$id === id);
            if (project?.imgSrc) fileService.deleteFile(project.imgSrc);
            await projectService.deleteProject(id);
            toast.success("Project deleted successfully");
            setProjects(projects.filter(project => project.$id !== id));
        } catch (error: any) {
            console.log("Error while deleting project", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!loading ? (
                <div className="flex flex-col">
                    <Link to="/projects/add">
                        <Button variant="indigo" className="float-right mb-6">Add Project</Button>
                    </Link>
                    <div className="space-y-8">
                        {(projects.length !== 0) ? projects.map(project => (
                            <ProjectCard
                                key={project.$id}
                                {...project}
                                onDelete={handleDeleteProject}
                            />
                        )) : (
                            <h1 className=" mt-10 text-center text-2xl text-slate-500">No Projects Found</h1>
                        )}
                    </div>
                </div>
            ) :
                <Loading />
            }
        </>
    );
};

export default AllProjects;
