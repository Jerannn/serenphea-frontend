import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Search,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { format, startOfDay } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Field, FieldLabel } from "./ui/field";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Hero() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  console.log(dateRange);

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
    <div className="flex flex-col items-center bg-linear-to-br from-primary to-foreground py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-primary-foreground">
        Discover Tranquil Escapes
      </h1>
      <p className="text-lg text-primary-foreground/90">
        Luxury meets calm in every journey
      </p>

      <div className="max-w-4xl mx-auto mt-12 bg-card border border-border rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="md:col-span-1">
            <label className="block text-sm mb-2">Location</label>
            <div className="flex items-center gap-2 px-4 py-3 border border-border rounded-xl bg-[#F7F5F2]">
              <MapPin className="text-[#6B7D75]" size={18} />
              <input
                type="text"
                placeholder="Where to?"
                className="flex-1 bg-transparent outline-none placeholder:text-[#6B7D75]"
              />
            </div>
          </div>

          {/* When */}
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
                    Choose your check-in and check-out dates to see availability
                    and pricing.
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

          {/* Guests */}
          <div className="md:col-span-1">
            <Popover>
              <PopoverTrigger asChild>
                <Field className="max-w-sm">
                  <FieldLabel htmlFor="inline-start-input">Guests</FieldLabel>
                  <InputGroup className="max-w-xs h-12 bg-primary-foreground border-border">
                    <InputGroupInput
                      placeholder="Add dates"
                      className="h-full cursor-pointer"
                      readOnly
                    />
                    <InputGroupAddon>
                      <Users />
                    </InputGroupAddon>

                    <InputGroupAddon
                      align="inline-end"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => setDateRange(undefined)}
                      className="mr-1 p-1 hover:bg-muted rounded-full cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </PopoverTrigger>

              <PopoverContent className="w-full mt-3">
                <PopoverHeader className="px-3 pt-3 max-w-xs">
                  <PopoverTitle>Add guests</PopoverTitle>
                  <PopoverDescription>
                    Select the number of guests. Infants don’t count toward
                    occupancy limits.
                  </PopoverDescription>
                </PopoverHeader>

                <Card className="ring-0 p-0">
                  <CardContent className="p-0">
                    <Item>
                      <ItemContent>
                        <ItemTitle>Adults</ItemTitle>
                        <ItemDescription>Ages 13 or above</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full"
                        >
                          <Minus />
                        </Button>
                        <span>2</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full"
                        >
                          <Plus />
                        </Button>
                      </ItemActions>
                    </Item>
                    <Separator />
                    <Item>
                      <ItemContent>
                        <ItemTitle>Children</ItemTitle>
                        <ItemDescription>Ages 2 to 12</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full"
                        >
                          <Minus />
                        </Button>
                        <span>2</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full"
                        >
                          <Plus />
                        </Button>
                      </ItemActions>
                    </Item>
                    <Separator />
                    <Item>
                      <ItemContent>
                        <ItemTitle>Infants</ItemTitle>
                        <ItemDescription>Under 2</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full"
                        >
                          <Minus />
                        </Button>
                        <span>2</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full"
                        >
                          <Plus />
                        </Button>
                      </ItemActions>
                    </Item>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>

          {/* Button */}
          <div className="flex items-end mb-0.5">
            <Button className="h-12 px-10 py-4 text-lg w-full rounded-xl transition-all duration-300 font-medium bg-accent text-foreground">
              <Search size={20} />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* MOBILE */
}
{
  /* <div className="md:col-span-1">
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

            <Card className="w-full p-0 m-0 mt-3">
              <CardContent className="p-0">
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
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div> */
}
