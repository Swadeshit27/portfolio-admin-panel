
import educationService from '@/appwrite/education';
import { EducationForm } from '@/components/education/EducationForm';
import { Loading } from '@/components/Loading';
import { educationProps } from '@/types';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

const EditEducation = () => {
  const { id } = useParams<{ id: string }>();
  const [education, setEducation] = useState<educationProps | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      educationService.getEducationById(id)
        .then((res: any) => {
          if (res) setEducation(res);
        })
        .catch((err: any) => {
          console.log("Error fetching education : ", err)
          navigate('/skills')
        })
    } else {
      toast.error("education id not found")
      navigate('/skills')
    }
  }, [id, navigate])

  return (
    <>
      {education ? (
        <EducationForm education={education} />
      ) :
        <Loading />
      }</>
  )
}

export default EditEducation
