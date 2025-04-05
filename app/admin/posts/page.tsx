"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getPosts, deletePost } from "@/lib/firebase/posts"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { useToast } from "@/hooks/use-toast"
import { formatDate } from "@/lib/utils"
import type { Post } from "@/lib/types"
import { Edit, Trash2, MoreVertical, Plus, Search, Eye } from "lucide-react"

export default function AdminPostsPage() {
  const router = useRouter()
  const { user, loading } = useFirebase()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!loading && (!user || user.role !== "admin")) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [user, loading, router, toast])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { posts } = await getPosts(100, null, undefined, undefined, searchQuery)
        setPosts(posts)
      } catch (error) {
        console.error("Error fetching posts:", error)
        toast({
          title: "Error",
          description: "Could not load posts.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [searchQuery, toast])

  const handleDeletePost = async () => {
    if (!postToDelete) return

    try {
      await deletePost(postToDelete.id)
      setPosts(posts.filter((post) => post.id !== postToDelete.id))
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: "Could not delete post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setPostToDelete(null)
    }
  }

  if (loading || isLoading) {
    return (
      <>
        <Header />
        <main className="container py-12 bg-[#0f172a] min-h-screen">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!user || user.role !== "admin") {
    return null // Redirect already handled in useEffect
  }

  return (
    <>
      <Header />
      <main className="container py-12 bg-[#0f172a] min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Manage Posts</h1>
          <Link href="/admin/posts/new">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1a2236] border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="rounded-md border border-gray-800 bg-[#1a2236]">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-[#1a2236]">
                <TableHead className="text-gray-300">Title</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Categories</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Views</TableHead>
                <TableHead className="w-[100px] text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <TableRow key={post.id} className="border-gray-800 hover:bg-[#111827]">
                    <TableCell className="font-medium text-white">{post.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={post.status === "published" ? "default" : "outline"}
                        className={
                          post.status === "published"
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "border-gray-700 text-gray-400"
                        }
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.categories.slice(0, 2).map((category) => (
                          <Badge key={category} variant="secondary" className="bg-[#1e293b] text-cyan-400 text-xs">
                            {category}
                          </Badge>
                        ))}
                        {post.categories.length > 2 && (
                          <Badge variant="outline" className="text-xs border-gray-700 text-gray-400">
                            +{post.categories.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400">{formatDate(post.publishedAt || post.createdAt)}</TableCell>
                    <TableCell className="text-gray-400">{post.viewCount}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1a2236] border-gray-800">
                          <DropdownMenuItem
                            asChild
                            className="text-gray-300 hover:text-white focus:text-white focus:bg-gray-800"
                          >
                            <Link href={`/blog/${post.slug.replaceAll(" ", "-")}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            asChild
                            className="text-gray-300 hover:text-white focus:text-white focus:bg-gray-800"
                          >
                            <Link href={`/admin/posts/edit/${post.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-400 focus:text-red-400 hover:text-red-300 focus:bg-gray-800"
                            onClick={() => setPostToDelete(post)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-gray-800">
                  <TableCell colSpan={6} className="h-24 text-center text-gray-400">
                    No posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />

      <AlertDialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent className="bg-[#1a2236] border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete the post "{postToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

