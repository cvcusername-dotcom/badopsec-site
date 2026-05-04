import type { Metadata } from "next";
import "../SRC/Application/globals.css";

export const metadata: Metadata = {
  title: "BadOpsec - Recherche Informée",
  description:
    "Accédez à des informations publiques via notre API. Recherchez, analysez et obtenez des données en temps réel avec BadOpsec.",
  icons: {
    icon: "https://ext.same-assets.com/3329413445/606803464.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
