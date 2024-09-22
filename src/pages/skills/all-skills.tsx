import fileService from '@/appwrite/file'
import skillsService from '@/appwrite/skills'
import { Loading } from '@/components/Loading'
import { SkillCard } from '@/components/skills/SkillCard'
import { Button } from '@/components/ui/button'
import { SkillProps } from '@/types'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const AllSkills = () => {
  const [skills, setSkills] = useState<SkillProps[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    skillsService.getAllSkills()
      .then((res: any) => { 
        setSkills(res.documents.reverse())
      })
      .catch(error => console.log("Failed to get skills", error))
      .finally(() => setLoading(false))
  }, [])


  const handleDeleteSkill = async (id: string) => {
    try {
      const skill = skills.find(skill => skill.$id === id);
      if (skill?.icon) await fileService.deleteFile(skill.icon);
      await skillsService.deleteSkill(id);
      toast.success("Skill deleted successfully");
      setSkills(skills.filter(skill => skill.$id !== id));
    } catch (error: any) {
      console.log("Error while deleting skill", error);
      toast.error(error.message)
    }
  }

  if (loading) return <Loading />

  return (
    <>
      <div className="flex flex-col">
        <Link to="/skills/add">
          <Button variant="indigo" className="float-right mb-6">Add Skill</Button>
        </Link>
        {(skills.length !== 0) ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {skills.map(skill => (
              <SkillCard
                key={skill.$id}
                {...skill}
                onDelete={handleDeleteSkill}
              />
            ))}
          </div>
        ) :
          <h1 className=" w-full mt-10 text-center text-2xl text-slate-500">No Skills are Found</h1>
        }
      </div>

    </>
  )
}

export default AllSkills