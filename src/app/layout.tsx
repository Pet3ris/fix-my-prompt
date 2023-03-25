import './globals.css'

export const metadata = {
  title: 'Fix My Prompt',
  description: 'Write world class prompts for AI'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
