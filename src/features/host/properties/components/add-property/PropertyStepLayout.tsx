import { type ReactNode } from "react";

type PropertyStepLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function PropertyStepLayout({
  title,
  description,
  children,
}: PropertyStepLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-12 lg:px-20">
      <h1 className="font-serif text-3xl font-bold">{title}</h1>
      <p className="mb-8 text-muted-foreground">{description}</p>

      {children}
    </div>
  );
}
