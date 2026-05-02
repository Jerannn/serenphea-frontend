import { Users, X, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldLabel } from "@/components/ui/field";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { formatGuests } from "@/shared/utils/formatGuests";

const defaultGuests = { adults: 0, children: 0, infants: 0 };

export default function GuestSelector() {
  const [guests, setGuests] = useState(defaultGuests);
  const isAdultDecrementDisabled = guests.children > 0 || guests.infants > 0;
  const selectedGuest = formatGuests(guests);

  const incrementGuest = (guestType: "adults" | "children" | "infants") => {
    setGuests((prevGuests) => {
      return {
        ...prevGuests,
        [guestType]: prevGuests[guestType] + 1,
        ...(guestType === "infants" &&
          prevGuests.adults === 0 && { adults: prevGuests.adults + 1 }),
        ...(guestType === "children" &&
          prevGuests.adults === 0 && { adults: prevGuests.adults + 1 }),
      };
    });
  };

  const decrementGuest = (guestType: "adults" | "children" | "infants") => {
    setGuests((prevGuests) => {
      if (prevGuests[guestType] <= 0) return prevGuests;

      return {
        ...prevGuests,
        [guestType]: prevGuests[guestType] - 1,
      };
    });
  };

  return (
    <div className="md:col-span-1">
      <Popover>
        <PopoverTrigger asChild>
          <Field className="max-w-sm">
            <FieldLabel htmlFor="inline-start-input">Guests</FieldLabel>
            <InputGroup className="max-w-xs h-12 bg-primary-foreground border-border">
              <InputGroupInput
                value={selectedGuest || ""}
                placeholder="Add dates"
                className="h-full cursor-pointer"
                readOnly
              />
              <InputGroupAddon>
                <Users />
              </InputGroupAddon>

              {guests.adults > 0 && (
                <InputGroupAddon
                  align="inline-end"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setGuests(defaultGuests)}
                  className="mr-1 p-1 hover:bg-muted rounded-full cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </InputGroupAddon>
              )}
            </InputGroup>
          </Field>
        </PopoverTrigger>

        <PopoverContent className="w-full mt-3">
          <PopoverHeader className="px-3 pt-3 max-w-xs">
            <PopoverTitle>Add guests</PopoverTitle>
            <PopoverDescription>
              Select the number of guests. Infants don’t count toward occupancy
              limits.
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
                    className={`w-8 h-8 rounded-full ${
                      (isAdultDecrementDisabled || guests.adults === 0) &&
                      "pointer-events-none bg-muted/70 cursor-not-allowed"
                    }`}
                    onClick={() => decrementGuest("adults")}
                  >
                    <Minus />
                  </Button>
                  <span>{guests.adults}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 rounded-full"
                    name="test"
                    onClick={() => incrementGuest("adults")}
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
                    className={`w-8 h-8 rounded-full ${
                      guests.children === 0 &&
                      "pointer-events-none bg-muted/70 cursor-not-allowed"
                    }`}
                    onClick={() => decrementGuest("children")}
                  >
                    <Minus />
                  </Button>
                  <span>{guests.children}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 rounded-full"
                    onClick={() => incrementGuest("children")}
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
                    className={`w-8 h-8 rounded-full ${
                      guests.infants === 0 &&
                      "pointer-events-none bg-muted/70 cursor-not-allowed"
                    }`}
                    onClick={() => decrementGuest("infants")}
                  >
                    <Minus />
                  </Button>
                  <span>{guests.infants}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 rounded-full"
                    onClick={() => incrementGuest("infants")}
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
  );
}
