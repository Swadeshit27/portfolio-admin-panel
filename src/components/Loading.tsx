import { Loader } from "lucide-react"

export const Loading = () => {
    return (
        <div className=' h-screen flex justify-center items-center'>
            <Loader className=" w-10 h-10 animate-spin"/>
        </div>
    )
}