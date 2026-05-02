import { Search } from "lucide-react";
import { Button } from "./ui/button";
import SearchBar from "@/features/search/components/SearchBar";

export default function Hero() {
  return (
    <div className="flex flex-col items-center bg-linear-to-br from-primary to-foreground py-16 md:py-24 px-4">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-primary-foreground text-center">
        Discover Tranquil Escapes
      </h1>
      <p className="text-lg text-primary-foreground/90">
        Luxury meets calm in every journey
      </p>

      <div className="max-w-4xl mx-auto mt-12 bg-card border border-border rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Bar */}
          <SearchBar />

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
