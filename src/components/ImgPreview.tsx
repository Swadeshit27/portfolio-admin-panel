import fileService from '@/appwrite/file'

interface imgPreviewProps {
    imgSrc: string;
    alt: string;
    className?: string;
}

export const ImgPreview = ({
    imgSrc,
    alt,
    className,
}: imgPreviewProps) => {
    return (
        <div className={`${className} ml-5 border-2 border-slate-400 border-dashed rounded-lg`}>
            <img
                src={String(fileService.getFilePreview(imgSrc))}
                alt={alt}
                className="w-full h-full object-contain"
            />
        </div>
    )
}
