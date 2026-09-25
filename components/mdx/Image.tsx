import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface MDXImageProps extends ImageProps {
    className?: string;
}

export default function MDXImage({ src, alt, className, ...props }: MDXImageProps) {
    return (
        <div className="pt-2 pb-3 flex justify-center items-center">
            <Image
                src={src}
                alt={alt}
                className={cn("rounded-lg w-full h-auto", className)}
                {...props}
            />
        </div>
    )
}