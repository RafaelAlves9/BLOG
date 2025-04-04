import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PostCard } from "@/components/post/post-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPosts } from "@/lib/firebase/posts"
import { getTags } from "@/lib/firebase/tags"
import { Search } from "lucide-react"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const tag = typeof searchParams.tag === "string" ? searchParams.tag : undefined
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined

  // Fetch posts with filters
  const { posts } = await getPosts(12, null, category, tag, search)
  const tags = await getTags()

  return (
    <>
      <Header />
      <main className="bg-[#0f172a] min-h-screen">
        <section className="py-12">
          <div className="container">
            <h1 className="text-3xl font-bold mb-8 text-white">Filter Posts</h1>

            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by topic..."
                  defaultValue={search}
                  className="pl-10 bg-[#1a2236] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <Link href="/blog">
                <Button
                  variant={!tag ? "default" : "outline"}
                  size="sm"
                  className={
                    !tag
                      ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                >
                  All
                </Button>
              </Link>
              {tags.slice(0, 4).map((t) => (
                <Link key={t.id} href={`/blog?tag=${t.name}`}>
                  <Button
                    variant={tag === t.name ? "default" : "outline"}
                    size="sm"
                    className={
                      tag === t.name
                        ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                        : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  >
                    #{t.name.toLowerCase()}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium mb-2 text-white">No posts found</h3>
                  <p className="text-gray-400 mb-4">We couldn't find any posts with the selected filters.</p>
                  <Link href="/blog">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      View All Posts
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {posts.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Load More Posts
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

