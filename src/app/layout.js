import "./globals.css"

export const metadata = {
  title: "iPlayMusic",
  description: "Brians Spotify App",
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
  )
}
