"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import BookmarkList from "@/components/BookmarkList"
import toast, { Toaster } from "react-hot-toast"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/")
      } else {
        setUser(session.user)
      }

      setLoading(false)
    }

    checkSession()
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    toast.success("Logged out successfully 👋")
    router.push("/")
  }

  if (loading) return null
  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm border-r flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 border-b">
            <h1 className="text-xl font-bold text-gray-800">
              Smart<span className="text-indigo-600">Bookmark</span>
            </h1>
          </div>

          <nav className="p-6 space-y-4 text-sm">
            <p className="text-gray-500 uppercase tracking-wide text-xs">
              Dashboard
            </p>
            <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-medium">
              My Bookmarks
            </div>
          </nav>
        </div>

        <div className="p-6 border-t">
          <p className="text-xs text-gray-500 mb-3 truncate">
            {user.email}
          </p>
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome back 👋
            </h2>
            <p className="text-gray-500 mt-2">
              Manage and organize your bookmarks professionally.
            </p>
          </div>

          <BookmarkList user={user} />
        </div>
      </main>
    </div>
  )
}
