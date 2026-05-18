import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionWrapper from "./SectionWrapper";
import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";

export default function PhotosSection() {
  const images = usePropertyStore((state) => state.property.images);

  return (
    <SectionWrapper title="Photos" step={3}>
      <Carousel className="w-full max-w-48 sm:max-w-max">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.id} className="basis-1/2 lg:basis-1/2">
              <Card className="p-0">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <img
                    src={image.url}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionWrapper>
  );
}
