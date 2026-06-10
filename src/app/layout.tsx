import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA Habitats — Arquitectura de Alta Gama y Construcción Integrada",
  description:
    "Estudio técnico-arquitectónico especializado en proyectos residenciales, corporativos y sostenibles de alta gama. Arquitectura que trasciende, construcción que perdura.",
  keywords: [
    "arquitectura de lujo",
    "construcción premium",
    "diseño arquitectónico",
    "proyectos residenciales",
    "arquitectura sostenible",
    "AURA Habitats",
  ],
  openGraph: {
    title: "AURA Habitats — Arquitectura de Alta Gama",
    description:
      "Estudio técnico-arquitectónico de alta gama y construcción integrada internacional.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-stone-950 text-stone-100 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
