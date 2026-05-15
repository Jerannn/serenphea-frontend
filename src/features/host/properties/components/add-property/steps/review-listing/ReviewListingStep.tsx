import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import SectionWrapper from "./SectionWrapper";

export default function ReviewListingStep() {
  const images = usePropertyStore((state) => state.property.images);
  return (
    <div className="container mx-auto px-4 py-12 lg:px-20">
      <h1 className="font-serif text-3xl font-bold">Review and publish</h1>
      <p className="mb-8 text-muted-foreground">
        Review your listing before publishing. You can edit any section below.
      </p>

      {/* PHOTOS */}
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
    </div>
  );
}
