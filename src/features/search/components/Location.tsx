import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Country, State, City } from "country-state-city";
import { MapPin, X } from "lucide-react";
import { useMemo, useState } from "react";

type Location = {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  countryCode: string;
  stateCode?: string;
};

const ALL_LOCATIONS: Location[] = [
  ...Country.getAllCountries().map((c) => ({
    id: `country-${c.isoCode}`,
    name: c.name,
    type: "country",
    latitude: Number(c.latitude),
    longitude: Number(c.longitude),
    countryCode: c.isoCode,
  })),
  ...State.getAllStates().map((s) => ({
    id: `state-${s.countryCode}-${s.isoCode}`,
    name: s.name,
    type: "state",
    latitude: Number(s.latitude),
    longitude: Number(s.longitude),
    countryCode: s.countryCode,
    stateCode: s.isoCode,
  })),
  ...City.getAllCities().map((c) => ({
    id: `city-${c.countryCode}-${c.stateCode ?? "na"}-${c.name}`,
    name: c.name,
    type: "city",
    latitude: Number(c.latitude),
    longitude: Number(c.longitude),
    countryCode: c.countryCode,
    stateCode: c.stateCode,
  })),
];

const defaultLocation = {
  id: "",
  name: "",
  type: "country",
  latitude: 0,
  longitude: 0,
  stateCode: "",
  countryCode: "",
};

export default function LocationInput() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<Location>(defaultLocation);

  const filtered = useMemo(() => {
    if (!query) return ALL_LOCATIONS.slice(0, 10);

    return ALL_LOCATIONS.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    ).slice(0, 20);
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Field className="max-w-sm">
          <FieldLabel htmlFor="inline-start-input">Location</FieldLabel>
          <InputGroup className="max-w-xs h-12 bg-primary-foreground border-border">
            <InputGroupInput
              value={location.name}
              placeholder="Add dates"
              className="h-full cursor-pointer"
              readOnly
            />
            <InputGroupAddon>
              <MapPin />
            </InputGroupAddon>

            {location.name && (
              <InputGroupAddon
                align="inline-end"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setLocation(defaultLocation)}
                className="mr-1 p-1 hover:bg-muted rounded-full cursor-pointer"
              >
                <X className="h-4 w-4" />
              </InputGroupAddon>
            )}
          </InputGroup>
        </Field>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type a command or search..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>

            <CommandGroup heading="Suggestions">
              {filtered.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => {
                    setLocation(item);
                    setQuery("");
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {item.type}
                  </span>

                  <CommandShortcut>
                    <img
                      src={`https://flagcdn.com/16x12/${item.countryCode.toLowerCase()}.png`}
                      loading="lazy"
                      decoding="async"
                      width="16"
                      height="12"
                      alt={item.name}
                    />
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
