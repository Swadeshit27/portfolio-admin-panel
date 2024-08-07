import skillsService from '@/appwrite/skills';
import { Loading } from '@/components/Loading';
import { SkillForm } from '@/components/skills/SkillForm';
import { SkillProps } from '@/types';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

const EditSkill = () => {
  const { id } = useParams<{id:string}>();
  const [skill, setSkill] = useState<SkillProps | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      skillsService.getSkillsById(id)
        .then((res: any) => {
          if(res) setSkill(res);
        })
        .catch((err: any) => {
          console.log("Error fetching skill : ", err)
          navigate('/skills')
        })
    } else {
      toast.error("Skill id not found")
      navigate('/skills')
    }
  }, [id, navigate])

  return (
    <>
      {skill ? (
        <SkillForm skill={skill} />
      ) :
        <Loading />
      }</>
  )
}

export default EditSkill