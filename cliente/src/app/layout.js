import './global.css'

export const metadata = {
  title: 'User Register',
  description: 'Project for PTAC Class',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}