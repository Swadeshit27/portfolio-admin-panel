import myInfoService from '@/appwrite/myinfo';
import { Loading } from '@/components/Loading';
import { InfoForm } from '@/components/myInfo/InfoForm';
import { infoProps } from '@/types';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

const EditInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [info, setInfo] = useState<infoProps | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      myInfoService.getInfoById(id)
        .then((res: any) => {
          if (res) setInfo(res);
        })
        .catch((err: any) => {
          console.log("Error fetching info : ", err)
          navigate('/')
        })
    } else {
      toast.error("Info id not found")
      navigate('/')
    }
  }, [id, navigate])

  return (
    <>
      {info ? (
        <InfoForm info={info} />
      ) :
        <Loading />
      }</>
  )
}

export default EditInfo