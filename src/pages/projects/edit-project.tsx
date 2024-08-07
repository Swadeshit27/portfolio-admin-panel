import projectService from "@/appwrite/projects";
import { Loading } from "@/components/Loading";
import { ProjectForm } from "@/components/Projects/ProjectForm";
import { projectProps } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<projectProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      projectService.getProjectById(id)
        .then((res: any) => {
          if (res) setProject(res);
        })
        .catch((err: any) => {
          console.log("Error fetching project:", err);
          navigate('/projects');
        });
    } else {
      toast.error("Project id not found")
      navigate('/projects');
    }
  }, [id, navigate]);

  return (
    <div>
      {project ? (
        <ProjectForm project={project} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default EditProject;
