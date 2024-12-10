import Navbar from '@/components/Navbar'

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  )
}

