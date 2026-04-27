import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, startOfDay } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

export default function DatePicker() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const chosenDateRange = useMemo(() => {
    const from = dateRange?.from && format(dateRange?.from, "MMM dd");
    const to = dateRange?.to && format(dateRange?.to, "MMM dd");
    return [from, to].filter(Boolean).join(" - ");
  }, [dateRange]);

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return;

    if (range.from && range.to && range.from.getTime() === range.to.getTime()) {
      setDateRange({ from: range.from, to: undefined });
      return;
    }

    setDateRange(range);
  };

  return (
    <div className="md:col-span-1">
      <Popover onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger asChild>
          <Field className="max-w-sm">
            <FieldLabel htmlFor="inline-start-input">When</FieldLabel>
            <InputGroup className="max-w-xs h-12 bg-primary-foreground border-border">
              <InputGroupInput
                placeholder="Add dates"
                className="h-full cursor-pointer"
                value={chosenDateRange}
                readOnly
              />
              <InputGroupAddon>
                <CalendarIcon />
              </InputGroupAddon>
              {dateRange && (
                <InputGroupAddon
                  align="inline-end"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setDateRange(undefined)}
                  className="mr-1 p-1 hover:bg-muted rounded-full cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </InputGroupAddon>
              )}
            </InputGroup>
          </Field>
        </PopoverTrigger>
        <PopoverContent className="w-full mt-3">
          <PopoverHeader className="px-3 pt-3 max-w-sm">
            <PopoverTitle>Select your dates</PopoverTitle>
            <PopoverDescription>
              Choose your check-in and check-out dates to see availability and
              pricing.
            </PopoverDescription>
          </PopoverHeader>
          {isOpen && (
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleSelect}
              numberOfMonths={2}
              disabled={{ before: startOfDay(new Date()) }}
              showOutsideDays={false}
              classNames={{
                today: "",
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
