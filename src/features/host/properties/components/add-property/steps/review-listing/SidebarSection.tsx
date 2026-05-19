import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import usePropertyStepper from "@/features/host/properties/hooks/usePropertyStepper";
import { formatTime } from "@/features/host/properties/lib/utils";
import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  Globe,
  Loader2,
  Star,
} from "lucide-react";
import { useNavigation, useSubmit } from "react-router-dom";

export default function SidebarSection() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isPublishing = navigation.state === "submitting";

  const { pricing, bookingSettings, status } = usePropertyStore(
    (state) => state.property,
  );
  const { goToSpecificStep } = usePropertyStepper();

  const onSubmit = () => {
    submit(null, { method: "post" });
  };

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

              <div className="flex flex-col gap-3">
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
                  <div className="grid grid-cols-2 divide-x divide-border/50 border-b border-border/50">
                    <div className="p-3 hover:bg-muted/20 transition-colors">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Check-in
                      </div>
                      <div className="font-medium text-sm flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {formatTime(bookingSettings?.checkInTime)}
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/20 transition-colors">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Check-out
                      </div>
                      <div className="font-medium text-sm flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {formatTime(bookingSettings?.checkOutTime)}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border/50">
                    <div className="p-3 hover:bg-muted/20 transition-colors">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Min nights
                      </div>
                      <div className="font-medium text-sm flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {bookingSettings?.minNights || 1}{" "}
                        {bookingSettings?.minNights === 1 ? "night" : "nights"}
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/20 transition-colors">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Max nights
                      </div>
                      <div className="font-medium text-sm flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {bookingSettings?.maxNights || 1}{" "}
                        {bookingSettings?.maxNights === 1 ? "night" : "nights"}
                      </div>
                    </div>
                  </div>
                </div>

                {pricing?.cleaningFee ? (
                  <div className="flex items-center justify-between p-3 border border-border/50 rounded-xl bg-card shadow-sm hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-primary/10 rounded-md">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">Cleaning fee</span>
                    </div>
                    <span className="font-semibold text-sm">
                      ${pricing.cleaningFee}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
          <div className="bg-muted/30 p-6 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground mb-4">
              You can still edit details after publishing.
            </p>
            <Button
              className="w-full text-base font-semibold py-6 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              onClick={onSubmit}
            >
              {isPublishing ? "Publishing..." : "Publish Property"}
              {isPublishing ? (
                <Loader2 className="w-4 h-4 ml-1 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 ml-1" />
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
