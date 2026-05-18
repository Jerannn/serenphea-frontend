import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import usePropertyStepper from "@/features/host/properties/hooks/usePropertyStepper";
import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import { Calendar, Clock, Edit3, Globe, Star } from "lucide-react";

export default function SidebarSection() {
  const { pricing, bookingSettings, status } = usePropertyStore(
    (state) => state.property,
  );
  const { goToSpecificStep } = usePropertyStepper();
  return (
    <div className="md:col-span-1">
      <div className="sticky top-24">
        <Card className="border border-border/50 shadow-lg rounded-2xl overflow-hidden bg-card py-0 gap-0">
          <CardContent className="p-6">
            <div className="flex items-end justify-between mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">
                  ${pricing?.basePrice || 0}
                </span>
                <span className="text-muted-foreground font-medium">
                  / night
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToSpecificStep(4)}
                className="text-primary hover:bg-primary/10 -mr-2"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Status
                </span>
                <span className="font-semibold capitalize text-primary">
                  {status || "Draft"}
                </span>
              </div>

              <Separator className="bg-border/50" />

              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <div className="flex flex-col items-center justify-between border border-border/50 rounded-lg p-2 bg-muted/50">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="font-medium flex items-center gap-2 ">
                    <Clock className="h-4 w-4" />
                    {bookingSettings?.checkInTime || "Flexible"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-between  border border-border/50 rounded-lg p-2 bg-muted/50">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="font-medium flex items-center gap-2 ">
                    <Clock className="h-4 w-4" />
                    {bookingSettings?.checkOutTime || "Flexible"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-between  border border-border/50 rounded-lg p-2 bg-muted/50">
                  <span className="text-muted-foreground">Min nights</span>
                  <span className="font-medium flex items-center gap-2 ">
                    <Calendar className="h-4 w-4" />
                    {bookingSettings?.minNights || 1} nights
                  </span>
                </div>

                <div className="flex flex-col items-center justify-between border border-border/50 rounded-lg p-2 bg-muted/50">
                  <span className="text-muted-foreground">Max nights</span>
                  <span className="font-medium flex items-center gap-2 ">
                    <Calendar className="h-4 w-4" />
                    {bookingSettings?.maxNights || 1} nights
                  </span>
                </div>

                {pricing?.cleaningFee ? (
                  <div className="flex items-center justify-between gap-2 col-span-2 border border-border/50 rounded-lg p-2 bg-muted/50">
                    <span className="text-muted-foreground">Cleaning fee</span>
                    <span className="font-medium flex items-center gap-2 ">
                      <Star className="h-4 w-4" />${pricing.cleaningFee}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
          <div className="bg-muted/30 p-6 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              You can still edit details after publishing.
            </p>
            {/* <Button className="w-full text-base font-semibold py-6 shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
              Publish Listing
            </Button> */}
          </div>
        </Card>
      </div>
    </div>
  );
}
