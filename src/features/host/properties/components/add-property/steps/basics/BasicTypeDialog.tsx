import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, type Control } from "react-hook-form";
import PropertyTypeList from "../../PropertyTypeList";
import type {
  CreatePropertyInput,
  PropertyType,
} from "@/features/host/properties/types";

type BasicTypeDialogProps = {
  propertyTypes: PropertyType[];
  control: Control<CreatePropertyInput>;
};
export default function BasicTypeDialog({
  propertyTypes,
  control,
}: BasicTypeDialogProps) {
  return (
    <div className="flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="link" size="sm">
            See more
          </Button>
        </DialogTrigger>

        <DialogContent className="flex max-h-[85vh] w-full max-w-lg flex-col">
          <DialogHeader>
            <DialogTitle>Property Types</DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>

          <Controller
            name="propertyTypeId"
            control={control}
            render={({ field }) => (
              <PropertyTypeList
                items={propertyTypes}
                selectedType={field.value}
                onChange={field.onChange}
                className="flex-1 space-y-2 overflow-y-auto pr-2"
              />
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
