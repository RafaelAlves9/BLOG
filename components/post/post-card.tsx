import Link from "next/link"
import Image from "next/image"
import { Calendar, Eye } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Post } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface PostCardProps {
  post: Post
  variant?: "default" | "featured" | "compact" | "latest"
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  if (variant === "featured") {
    return (
      <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-[#1a2236] transition-all hover:border-gray-700">
        <div className="absolute top-2 right-2 z-10 bg-purple-600 px-2 py-1 text-xs font-medium text-white rounded">
          Featured
        </div>
        <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">View post: {post.title}</span>
        </Link>
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.featuredImage || `/placeholder.svg?height=400&width=600`}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            priority
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors text-white">{post.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={post.author.photoURL || `/placeholder.svg?height=24&width=24`}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs text-gray-400">{post.author.name}</span>
            </div>
            <span className="text-xs text-gray-500">{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className="group flex gap-4 items-start">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={post.featuredImage || `/placeholder.svg?height=64&width=64`}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-medium group-hover:text-cyan-400 transition-colors line-clamp-2 text-white">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "latest") {
    return (
      <div className="group overflow-hidden rounded-lg border border-gray-800 bg-[#1a2236] transition-all hover:border-gray-700">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={post.featuredImage || `/placeholder.svg?height=300&width=500`}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-4 space-y-2">
            <div className="text-xs text-cyan-400 uppercase mb-1">{post.categories[0] || "General"}</div>
            <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors text-white">
              {post.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-800 bg-[#1a2236] transition-all hover:border-gray-700">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={post.featuredImage || `/placeholder.svg?height=300&width=500`}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {post.categories.slice(0, 2).map((category) => (
            <Link key={category} href={`/blog?category=${category}`}>
              <Badge variant="secondary" className="bg-[#1e293b] hover:bg-[#1e293b]/80 text-cyan-400">
                #{category.toLowerCase()}
              </Badge>
            </Link>
          ))}
        </div>
        <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors text-white">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{post.viewCount} views</span>
          </div>
        </div>
      </div>
    </div>
  )
}

