import './globals.css'

export const metadata = {
  title: 'Polyglot Benchmark Dashboard',
  description: 'Interactive dashboard for code translation benchmark results',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
