import Logo from "@/assets/logo.png";

export default function Spinner() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <img
        src={Logo}
        alt="Serenphea Logo's"
        className="w-7 h-7 animate-spin"
        loading="lazy"
      />
      <span className="ml-2 text-sm">Loading...</span>
    </div>
  );
}
