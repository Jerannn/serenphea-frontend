import DatePicker from "./DatePicker";
import GuestSelector from "./GuestSelector";
import Location from "./Location";

export default function SearchBar() {
  return (
    <>
      {/* Location */}
      <Location />

      {/* When */}
      <DatePicker />

      {/* Guests */}
      <GuestSelector />
    </>
  );
}
