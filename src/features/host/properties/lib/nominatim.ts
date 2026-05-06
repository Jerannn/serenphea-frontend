/**
 * OpenStreetMap Nominatim (search + reverse).
 * https://nominatim.org/release-docs/develop/api/Overview/
 *
 * Public endpoint: debounce in the UI, cap concurrency, and prefer a backend proxy
 * with caching for production traffic (see OSMF usage policy).
 */

const SEARCH_URL = "https://nominatim.openstreetmap.org/search";
const REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";

export type StructuredAddress = {
  houseNumber?: string;
  road?: string;
  neighbourhood?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  countryCode?: string;
};

export type PlaceResult = {
  id: string;
  lat: number;
  lng: number;
  displayName: string;
  structured: StructuredAddress;
};

type RawPlace = {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address?: Record<string, string>;
};

type RawReverse = RawPlace & { error?: string };

function pickAddressField(
  raw: Record<string, string> | undefined,
  ...keys: string[]
): string | undefined {
  if (!raw) return undefined;
  for (const k of keys) {
    const v = raw[k];
    if (v != null && String(v).trim() !== "") return String(v).trim();
  }
  return undefined;
}

export function normalizeStructured(
  raw: Record<string, string> | undefined
): StructuredAddress {
  if (!raw) return {};
  return {
    houseNumber: pickAddressField(raw, "house_number"),
    road: pickAddressField(raw, "road", "pedestrian", "footway", "path"),
    neighbourhood: pickAddressField(
      raw,
      "neighbourhood",
      "suburb",
      "quarter",
      "hamlet"
    ),
    city: pickAddressField(
      raw,
      "city",
      "town",
      "village",
      "municipality",
      "city_district",
      "county"
    ),
    state: pickAddressField(raw, "state", "region", "state_district"),
    postcode: pickAddressField(raw, "postcode"),
    country: pickAddressField(raw, "country"),
    countryCode: raw.country_code
      ? String(raw.country_code).toUpperCase()
      : undefined,
  };
}

export function structuredToEditableLines(s: StructuredAddress): {
  street: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
} {
  const street = [s.houseNumber, s.road].filter(Boolean).join(" ").trim();
  return {
    street,
    city: s.city ?? "",
    region: s.state ?? "",
    postcode: s.postcode ?? "",
    country: s.country ?? "",
  };
}

function parsePlaceRow(row: RawPlace, index: number): PlaceResult | null {
  const lat = Number.parseFloat(row.lat);
  const lng = Number.parseFloat(row.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return {
    id: `${row.place_id}-${index}`,
    lat,
    lng,
    displayName: row.display_name,
    structured: normalizeStructured(row.address),
  };
}

async function nominatimFetch(
  url: string,
  signal?: AbortSignal
): Promise<Response> {
  return fetch(url, {
    signal,
    headers: {
      Accept: "application/json",
      "Accept-Language": "en",
    },
  });
}

export async function searchPlaces(
  query: string,
  options: { limit?: number; signal?: AbortSignal } = {}
): Promise<PlaceResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return [];

  const limit = options.limit ?? 8;
  const params = new URLSearchParams({
    q: trimmed,
    format: "json",
    limit: String(limit),
    addressdetails: "1",
  });

  const res = await nominatimFetch(
    `${SEARCH_URL}?${params.toString()}`,
    options.signal
  );
  if (!res.ok) return [];

  const data = (await res.json()) as RawPlace[];
  if (!Array.isArray(data)) return [];

  const out: PlaceResult[] = [];
  data.forEach((row, index) => {
    const place = parsePlaceRow(row, index);
    if (place) out.push(place);
  });
  return out;
}

export async function reverseGeocode(
  lat: number,
  lng: number,
  signal?: AbortSignal
): Promise<PlaceResult | null> {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lng),
    format: "json",
    addressdetails: "1",
  });

  const res = await nominatimFetch(
    `${REVERSE_URL}?${params.toString()}`,
    signal
  );
  if (!res.ok) return null;

  const row = (await res.json()) as RawReverse;
  if (row?.error || row.place_id == null) return null;

  return parsePlaceRow(row, 0);
}
