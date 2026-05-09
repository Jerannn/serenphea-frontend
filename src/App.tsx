import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast:
              "group flex items-center gap-3 bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/5 rounded-2xl p-4 text-sm font-medium text-foreground transition-all duration-300",
            description: "text-muted-foreground font-normal",
            actionButton:
              "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 transition-colors",
            cancelButton:
              "bg-muted text-muted-foreground hover:bg-muted/80 rounded-md px-3 py-1.5 transition-colors",
            success: "group-[.toaster]:border-primary/30 [&_svg]:text-primary",
            error: "group-[.toaster]:border-destructive/30 [&_svg]:text-destructive",
            warning: "group-[.toaster]:border-accent/30 [&_svg]:text-accent",
            info: "group-[.toaster]:border-blue-500/30 [&_svg]:text-blue-500",
          },
        }}
      />
    </>
  );
}

export default App;
