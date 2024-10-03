
import { useCallback, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Linkedin, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Link } from 'react-router-dom'
import { EditAndDelete } from '@/components/EditAndDelete'
import { ReviewProps } from '@/types'
import reviewService from '@/appwrite/reviews'
import toast from 'react-hot-toast'
import { Loading } from '@/components/Loading'
import fileService from '@/appwrite/file'

export default function AllReviews() {
    const [reviews, setReviews] = useState<ReviewProps[]>([])
    const [loading, setLoading] = useState(false)

    const handleDelete = useCallback(async (reviews: ReviewProps) => {
        try {
            setLoading(true)
            await fileService.deleteFile(reviews.photo);
            await reviewService.deleteReview(reviews.$id);
            toast.success("Review deleted successfully")
        } catch (error: any) {
            console.log("Error while deleting review", error);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const handleApprove = useCallback(async (reviews: ReviewProps) => {
        try {
            setLoading(true)
            reviews.isVerified = !reviews.isVerified;
            await reviewService.updateReview(reviews.$id, reviews);
            toast.success("Review approved successfully")
        } catch (error: any) {
            console.log("Error while approving review", error);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        reviewService.getAllReviews()
            .then((res: any) => {
                console.log("Reviews", res.documents)
                setReviews(res.documents.reverse())
            })
            .catch(error => {
                console.log("Failed to get reviews", error);
                toast.error(error.message)
            })
            .finally(() => setLoading(false))
    }, [handleDelete, handleApprove])



    if (loading) {
        return <Loading />
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Testimonials</h1>
            <div className="grid gap-4  lg:grid-cols-2">
                {reviews.map(review => (
                    <Card key={review.$id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Avatar className='w-12 h-12'>
                                        <AvatarImage
                                            src={String(fileService.getFilePreview(review.photo))}
                                            alt="Avatar"
                                            className='w-full h-full object-cover rounded-full'
                                        />
                                        <AvatarFallback>
                                            {review.name.split(' ').map((name, index) => index < 2 && name[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className='flex items-center gap-4'>
                                            <CardTitle className='text-lg font-semibold'>{review.name}</CardTitle>
                                            <Link to={review.linkedin}>
                                                <Linkedin
                                                    size={18}
                                                    className='text-blue-500 cursor-pointer hover:text-blue-700'
                                                />
                                            </Link>
                                        </div>
                                        <CardDescription>{review.position}, {review.company}</CardDescription>
                                    </div>
                                </div>
                                <Badge variant={review.isVerified ? "default" : "secondary"}>
                                    {review.isVerified ? "Approved" : "Pending"}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">{review.review}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="icon" onClick={() => handleApprove(review)} >
                                {
                                    !review.isVerified ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />
                                }
                                
                            </Button>
                            <EditAndDelete
                                $id={''}
                                path="/reviews"
                                alertTitle="Are you sure you want to delete this review details?"
                                onDelete={() => handleDelete(review)}
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}