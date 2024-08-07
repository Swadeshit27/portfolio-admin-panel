import experienceService from "@/appwrite/experience";
import ExperienceForm from "@/components/experience/ExperienceForm";
import { Loading } from "@/components/Loading";
import { ExperienceProps } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


const EditExperience = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<ExperienceProps | null>(null)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true)
      experienceService.getExperienceById(id)
        .then((res: any) => {
          if (res) setExperience(res);
        })
        .catch((err: any) => {
          console.log("Error fetching experience : ", err)
          toast.error(err.message);
          navigate('/experience')
        })
    } else {
      toast.error("Experience is not found")
      navigate('/experience')
    }
    setLoading(false)
  }, [id, navigate])

  if (loading) return <Loading />

  return (
    <>
      {experience &&
        <ExperienceForm experience={experience} />
      }
    </>
  )
}

export default EditExperience
