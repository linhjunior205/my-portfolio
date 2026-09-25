import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Carousel as LibCarousel } from "@/components/ui/carousel";
import Image from "next/image";

export interface CarouselProps {
    images: string[];
}

export function Carousel({ images }: CarouselProps) {
    return (
        <LibCarousel className="w-full">
            <CarouselContent>
                {images.map((src, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <div className="relative aspect-video w-full">
                                <Image 
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                />
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </LibCarousel>
    )
}
