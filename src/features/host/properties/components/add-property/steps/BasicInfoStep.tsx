import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Home,
  Building2,
  Hotel,
  Warehouse,
  TreePine,
  Mountain,
  Waves,
  Tent,
  Caravan,
  Ship,
} from "lucide-react";
import { useState } from "react";

const propertyTypeIcons = {
  house: Home,
  apartment: Building2,
  condo: Building2,
  townhouse: Building2,
  duplex: Building2,

  villa: Home,
  cabin: TreePine,
  cottage: Home,
  bungalow: Home,
  chalet: Mountain,
  beach_house: Waves,

  hotel: Hotel,
  boutique_hotel: Hotel,
  hostel: Hotel,
  guesthouse: Home,
  bed_and_breakfast: Home,
  resort: Hotel,

  loft: Warehouse,
  studio: Building2,
  tiny_home: Home,
  treehouse: TreePine,
  boat: Ship,
  camper_rv: Caravan,
  dome: Home,
  farm_stay: Home,

  private_room: Home,
  shared_room: Home,

  campground: Tent,
  glamping: Tent,
  tent: Tent,

  serviced_apartment: Building2,
  aparthotel: Building2,
};

const initialPropertyTypes = [
  // 🏠 Residential
  {
    id: "11111111-1111-1111-1111-111111111111",
    key: "house",
    type: "House",
    description: "A standalone residential home",
  },
  {
    id: "11111111-1111-1111-1111-111111111112",
    key: "apartment",
    type: "Apartment",
    description: "A private unit within a building",
  },
  {
    id: "11111111-1111-1111-1111-111111111113",
    key: "condo",
    type: "Condominium",
    description: "A privately owned unit in a complex",
  },
  {
    id: "11111111-1111-1111-1111-111111111114",
    key: "townhouse",
    type: "Townhouse",
    description: "A multi-floor home sharing walls with others",
  },
  {
    id: "11111111-1111-1111-1111-111111111115",
    key: "duplex",
    type: "Duplex",
    description: "A building divided into two separate homes",
  },

  // 🏝️ Vacation & Luxury
  {
    id: "22222222-2222-2222-2222-222222222221",
    key: "villa",
    type: "Villa",
    description: "A luxury residence, often with outdoor space",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    key: "cabin",
    type: "Cabin",
    description: "A rustic retreat, usually in nature",
  },
  {
    id: "22222222-2222-2222-2222-222222222223",
    key: "cottage",
    type: "Cottage",
    description: "A small, cozy countryside home",
  },
  {
    id: "22222222-2222-2222-2222-222222222224",
    key: "bungalow",
    type: "Bungalow",
    description: "A single-story house, often with a veranda",
  },
  {
    id: "22222222-2222-2222-2222-222222222225",
    key: "chalet",
    type: "Chalet",
    description: "A wooden mountain home, often near ski resorts",
  },
  {
    id: "22222222-2222-2222-2222-222222222226",
    key: "beach_house",
    type: "Beach House",
    description: "A home located near the beach",
  },

  // 🏨 Hospitality
  {
    id: "33333333-3333-3333-3333-333333333331",
    key: "hotel",
    type: "Hotel",
    description: "A professionally managed lodging with rooms",
  },
  {
    id: "33333333-3333-3333-3333-333333333332",
    key: "boutique_hotel",
    type: "Boutique Hotel",
    description: "A small, stylish hotel with unique design",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    key: "hostel",
    type: "Hostel",
    description: "Budget-friendly shared accommodations",
  },
  {
    id: "33333333-3333-3333-3333-333333333334",
    key: "guesthouse",
    type: "Guesthouse",
    description: "A small lodging, often owner-occupied",
  },
  {
    id: "33333333-3333-3333-3333-333333333335",
    key: "bed_and_breakfast",
    type: "Bed & Breakfast",
    description: "Accommodation with breakfast included",
  },
  {
    id: "33333333-3333-3333-3333-333333333336",
    key: "resort",
    type: "Resort",
    description: "A full-service property with amenities and activities",
  },

  // 🏙️ Unique Stays
  {
    id: "44444444-4444-4444-4444-444444444441",
    key: "loft",
    type: "Loft",
    description: "An open-plan living space, often industrial-style",
  },
  {
    id: "44444444-4444-4444-4444-444444444442",
    key: "studio",
    type: "Studio",
    description: "A compact space combining living and sleeping areas",
  },
  {
    id: "44444444-4444-4444-4444-444444444443",
    key: "tiny_home",
    type: "Tiny Home",
    description: "A very small, minimalist house",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    key: "treehouse",
    type: "Treehouse",
    description: "A structure built among trees",
  },
  {
    id: "44444444-4444-4444-4444-444444444445",
    key: "boat",
    type: "Boat",
    description: "A stay on a boat or houseboat",
  },
  {
    id: "44444444-4444-4444-4444-444444444446",
    key: "camper_rv",
    type: "Camper / RV",
    description: "A mobile home or recreational vehicle",
  },
  {
    id: "44444444-4444-4444-4444-444444444447",
    key: "dome",
    type: "Dome",
    description: "A rounded structure, often eco-friendly",
  },
  {
    id: "44444444-4444-4444-4444-444444444448",
    key: "farm_stay",
    type: "Farm Stay",
    description: "Accommodation on a working farm",
  },

  // 🏢 Shared Spaces
  {
    id: "55555555-5555-5555-5555-555555555551",
    key: "private_room",
    type: "Private Room",
    description: "A private room within a shared property",
  },
  {
    id: "55555555-5555-5555-5555-555555555552",
    key: "shared_room",
    type: "Shared Room",
    description: "A shared sleeping space with others",
  },

  // 🏕️ Outdoor
  {
    id: "66666666-6666-6666-6666-666666666661",
    key: "campground",
    type: "Campground",
    description: "An outdoor area for camping",
  },
  {
    id: "66666666-6666-6666-6666-666666666662",
    key: "glamping",
    type: "Glamping",
    description: "Luxury camping with amenities",
  },
  {
    id: "66666666-6666-6666-6666-666666666663",
    key: "tent",
    type: "Tent",
    description: "A simple outdoor shelter for camping",
  },

  // 🏢 Commercial / Extended Stay
  {
    id: "77777777-7777-7777-7777-777777777771",
    key: "serviced_apartment",
    type: "Serviced Apartment",
    description: "Furnished apartment with hotel-like services",
  },
  {
    id: "77777777-7777-7777-7777-777777777772",
    key: "aparthotel",
    type: "Aparthotel",
    description: "A hybrid of apartment and hotel",
  },
];

export default function BasicInfoStep() {
  const [propertyTypes, setPropertyType] = useState(initialPropertyTypes);
  const [selectedType, setSelectedType] = useState("");

  const propertyTypeSlice = propertyTypes.slice(0, 6);

  return (
    <div className="container mx-auto px-4 lg:px-20 py-12">
      <h1 className="text-3xl font-serif font-bold ">
        Let's start with the basics
      </h1>
      <p className="text-muted-foreground mb-8">
        Tell us about your property so guests can find it easily
      </p>

      <form>
        <FieldGroup>
          <Field>
            <FieldLabel>What type of property is this?</FieldLabel>
            <RadioGroup
              value={selectedType}
              onValueChange={setSelectedType}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {propertyTypeSlice.map(({ id, key, type, description }) => {
                const Icon =
                  propertyTypeIcons[
                    key.toLowerCase() as keyof typeof propertyTypeIcons
                  ] || Hotel;

                return (
                  <FieldLabel
                    htmlFor={id}
                    key={id}
                    className={`transition ${
                      selectedType === id ? "bg-muted" : "bg-white"
                    }`}
                  >
                    <Field
                      orientation="horizontal"
                      style={{ alignItems: "center" }}
                    >
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <FieldContent className="gap-0">
                        <FieldTitle className="font-semibold text-card-foreground">
                          {type}
                        </FieldTitle>
                        <FieldDescription className="text-xs text-muted-foreground">
                          {description}
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem
                        value={id}
                        id={id}
                        className="border-border bg-background"
                      />
                    </Field>
                  </FieldLabel>
                );
              })}
            </RadioGroup>
          </Field>

          {/* title */}
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              placeholder="e.g., Cozy beachfront apartment with ocean views"
              id="title"
              className="border-border"
            />
            <FieldDescription>0/100 characters</FieldDescription>
          </Field>

          {/* description */}
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              placeholder="Describe what makes your property special. Include details about the space, nearby attractions, and what guests can expect..."
              id="description"
              className="border-border"
            />
            <FieldDescription>
              0/500 characters • Be descriptive and highlight unique features
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
