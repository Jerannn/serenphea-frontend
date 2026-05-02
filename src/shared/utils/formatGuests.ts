export const formatGuests = (guests: {
  adults: number;
  children: number;
  infants: number;
}): string | undefined => {
  const totalGuests = guests.adults + guests.children;
  console.log(guests);
  if (totalGuests === 0 && guests.infants === 0) {
    return;
  }

  const parts: string[] = [];

  if (totalGuests > 0) {
    parts.push(`${totalGuests} guest${totalGuests > 1 ? "s" : ""}`);
  }

  if (guests.infants > 0) {
    parts.push(`${guests.infants} infant${guests.infants > 1 ? "s" : ""}`);
  }

  return parts.join(", ");
};
