import { useNavigation } from "react-router-dom";

export default function NavigationProgress() {
  const navigation = useNavigation();
  const active = navigation.state === "loading";

  return (
    <div
      className="pointer-events-none fixed top-0 right-0 left-0 z-100 h-1 overflow-hidden bg-border/40"
      role="progressbar"
      aria-hidden={!active}
      aria-valuetext={active ? "Loading page" : undefined}
    >
      <div
        className="h-full w-1/3 max-w-40 bg-primary shadow-[0_0_10px_hsl(var(--primary))] motion-safe:transition-opacity"
        style={{
          opacity: active ? 1 : 0,
          animation: active
            ? "rr-nav-progress 1.1s ease-in-out infinite"
            : undefined,
        }}
      />
    </div>
  );
}
