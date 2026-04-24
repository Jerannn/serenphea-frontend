import { MapPin, Calendar, Users, Search } from "lucide-react";

export default function Hero() {
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

          {/* Check-in */}
          <div className="md:col-span-1">
            <label className="block text-sm mb-2">Check-in</label>
            <div className="flex items-center gap-2 px-4 py-3 border border-border rounded-xl bg-[#F7F5F2]">
              <Calendar className="text-[#6B7D75]" size={18} />
              <input
                type="text"
                placeholder="Add dates"
                className="flex-1 bg-transparent outline-none placeholder:text-[#6B7D75]"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="md:col-span-1">
            <label className="block text-sm mb-2">Guests</label>
            <div className="flex items-center gap-2 px-4 py-3 border border-border rounded-xl bg-[#F7F5F2]">
              <Users className="text-[#6B7D75]" size={18} />
              <input
                type="text"
                placeholder="Add guests"
                className="flex-1 bg-transparent outline-none placeholder:text-[#6B7D75]"
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex items-end">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 font-medium bg-[#C6A85C] text-[#1A3A31] hover:bg-[#B89A4F] px-10 py-4 text-lg w-full">
              <Search size={20} />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
