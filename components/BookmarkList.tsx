"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast"
import BookmarkForm from "./BookmarkForm"

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [sortOrder, setSortOrder] = useState("desc")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editUrl, setEditUrl] = useState("")

  // 🔹 Fetch Bookmarks
  const fetchBookmarks = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: sortOrder === "asc" })

    if (!error && data) {
      setBookmarks(data)
    }
  }

  // 🔹 Update
  const updateBookmark = async (id: string) => {
    const { error } = await supabase
      .from("bookmarks")
      .update({ title: editTitle, url: editUrl })
      .eq("id", id)

    if (error) {
      toast.error("Failed to update ❌")
    } else {
      toast.success("Bookmark updated ✏️")
      setEditingId(null)
      fetchBookmarks()
    }
  }

  // 🔹 Delete
  const deleteBookmark = async (id: string) => {
    const previous = bookmarks
    setBookmarks((prev) => prev.filter((b) => b.id !== id))

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error("Failed to delete ❌")
      setBookmarks(previous)
    } else {
      toast.success("Bookmark deleted 🗑️")
    }
  }

  // 🔹 Initial Fetch
  useEffect(() => {
    if (!user) return
    fetchBookmarks()
  }, [user, sortOrder])

  // 🔹 Realtime (Stable Version)
 useEffect(() => {
  if (!user) return

  let channel: any

  const setupRealtime = async () => {
    await fetchBookmarks()

    channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe((status) => {
        console.log("Realtime status:", status)
      })
  }

  setupRealtime()

  return () => {
    if (channel) {
      supabase.removeChannel(channel)
    }
  }
}, [user])
// ❗ Only depend on user (NOT sortOrder)

  return (
    <div className="space-y-8">

      {/* Add Form */}
      <BookmarkForm user={user} />

      {/* Sorting */}
      <div className="flex justify-end">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Bookmark Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start">

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`}
                    alt="favicon"
                    className="w-6 h-6"
                  />
                </div>

                <div>
                  {editingId === bookmark.id ? (
                    <div className="space-y-3">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg text-sm"
                      />
                      <input
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg text-sm"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateBookmark(bookmark.id)}
                          className="text-indigo-600 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-gray-500 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {bookmark.title}
                      </h3>

                      <a
                        href={
                          bookmark.url.startsWith("http")
                            ? bookmark.url
                            : `https://${bookmark.url}`
                        }
                        target="_blank"
                        className="text-sm text-gray-500 hover:text-indigo-600 transition"
                      >
                        {bookmark.url}
                      </a>
                    </>
                  )}
                </div>
              </div>

              {editingId !== bookmark.id && (
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setEditingId(bookmark.id)
                      setEditTitle(bookmark.title)
                      setEditUrl(bookmark.url)
                    }}
                    className="text-indigo-600 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBookmark(bookmark.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
