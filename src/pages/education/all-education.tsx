import educationService from '@/appwrite/education'
import { Loading } from '@/components/Loading'
import { EducationCard } from '@/components/education/EducationCard'
import { Button } from '@/components/ui/button'
import { educationProps } from '@/types'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const AllEducation = () => {
  const [allEducation, setAllEducation] = useState<educationProps[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    educationService.getAllEducation()
      .then((res: any) => {
        setAllEducation(res.documents)
      })
      .catch(error => {
        console.log("Failed to get all education details", error);
        toast.error(error.message)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleDeleteEducation = (id: string) => {
    deleteEducationById(id)
  }

  const deleteEducationById = (id: string) => {
    educationService.deleteEducation(id)
      .then((res) => {
        if (res) {
          toast.success("Education details deleted successfully")
          setAllEducation(allEducation.filter(skill => skill.$id !== id))
        }
      })
      .catch((err) => {
        console.log("Error while deleting skill", err);
        toast.error(err.message)
      })
  }

  return (
    <>
      {!loading ? (
        <div className="flex flex-col">
          <Link to="/education/add">
            <Button variant="indigo" className="float-right mb-6">Add Education Details</Button>
          </Link>
          <div >
            {allEducation.length !== 0 ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {allEducation.map(skill => (
                  <EducationCard
                    key={skill.$id}
                    {...skill}
                    onDelete={handleDeleteEducation}
                  />
                ))}
              </div>
            ) : (
              <h1 className=" mt-10 text-center text-2xl text-slate-500">No Education Details are Found</h1>
            )}
          </div>
        </div>
      ) :
        <Loading />
      }
    </>
  )
}

export default AllEducation