import fileService from '@/appwrite/file'
import myInfoService from '@/appwrite/myinfo'
import { Loading } from '@/components/Loading'
import { InfoCard } from '@/components/myInfo/InfoCard'
import { Button } from '@/components/ui/button'
import { infoProps } from '@/types'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const AllInfo = () => {
  const [allInfo, setAllInfo] = useState<infoProps[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    myInfoService.getAllInfo()
      .then((res: any) => {
        setAllInfo(res.documents)
      })
      .catch(error => {
        console.log("Failed to get allInfo", error);
        toast.error(error.message)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleDeleteInfo = async (id: string) => {
    try {
      setLoading(true)
      const info = allInfo.find(info => info.$id === id);
      if (info?.homeImg) fileService.deleteFile(info.homeImg);
      if (info?.aboutImg) fileService.deleteFile(info.aboutImg);
      await myInfoService.deleteInfo(id);
      toast.success("Information deleted successfully")
      setAllInfo(allInfo.filter(info => info.$id !== id))
    } catch (error: any) {
      console.log("Error while deleting information", error);
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!loading ? (
        <div className="flex flex-col">
          {!allInfo && <Link to="/add">
            <Button variant="indigo" className="float-right mb-6">Add Information</Button>
          </Link>}
          <div>
            {(allInfo.length !== 0) ? allInfo.map(info => (
              <InfoCard
                key={info.$id}
                {...info}
                onDelete={handleDeleteInfo}
              />
            )) : (
              <h1 className=" w-full mt-10 text-center text-2xl text-slate-500">No Information are Available</h1>
            )}
          </div>
        </div>
      ) :
        <Loading />
      }
    </>
  )
}

export default AllInfo