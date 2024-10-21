import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>File Upload System</title>
        <link href="/styles/globals.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
