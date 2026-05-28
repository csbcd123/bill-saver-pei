import "./globals.css";

export const metadata = {
  title: "Bill Saver｜PEI 手机宽带账单免费体检",
  description: "PEI internet and mobile bill savings MVP"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
