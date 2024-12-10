import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">
          Dashboard
        </Link>
        <div>
          <Button variant="ghost" asChild>
            <Link href="/">Logout</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

