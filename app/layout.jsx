import "./globals.css";

export const metadata = {
  title: "Save My Bill | Free Internet & Mobile Bill Check",
  description: "PEI internet and mobile bill savings MVP"
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
