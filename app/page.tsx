"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.push("/dashboard")
      }
    }

    checkSession()
  }, [router])

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 space-y-8">

        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Smart<span className="text-indigo-600">Bookmark</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Organize your web beautifully and securely.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Login Button */}
        <button
          onClick={signIn}
          className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5"
          >
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.64 2.36 30.2 0 24 0 14.6 0 6.36 5.48 2.52 13.44l8.1 6.3C12.48 13.2 17.76 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24c0-1.6-.14-3.14-.4-4.62H24v9.24h12.66c-.54 2.9-2.2 5.36-4.7 7.02l7.3 5.66C43.98 37.36 46.5 31.2 46.5 24z"/>
            <path fill="#FBBC05" d="M10.62 28.74A14.5 14.5 0 0 1 9.5 24c0-1.66.28-3.26.78-4.74l-8.1-6.3A23.9 23.9 0 0 0 0 24c0 3.86.92 7.5 2.52 10.56l8.1-6.3z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2.04 15.2-5.54l-7.3-5.66c-2.02 1.36-4.6 2.2-7.9 2.2-6.24 0-11.52-3.7-13.38-8.94l-8.1 6.3C6.36 42.52 14.6 48 24 48z"/>
          </svg>
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center">
          Secure login powered by Supabase
        </p>

      </div>
    </div>
  )
}
