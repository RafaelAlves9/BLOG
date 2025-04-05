import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Eye, Twitter, Linkedin, Share2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommentForm } from "@/components/post/comment-form";
import { CommentList } from "@/components/post/comment-list";
import {
   getPostBySlug,
   getMostViewedPosts,
   incrementViewCount,
} from "@/lib/firebase/posts";
import { formatDate, getReadingTime } from "@/lib/utils";
import { PostCard } from "@/components/post/post-card";

interface BlogPostPageProps {
   params: {
      slug: string;
   };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
   const post = await getPostBySlug(params.slug?.replaceAll("-", " "));

   if (!post) {
      notFound();
   }

   // Increment view counter
   await incrementViewCount(post.id);

   // Fetch related posts
   const relatedPosts = await getMostViewedPosts(3);

   return (
      <>
         <Header />
         <main className="bg-[#0f172a] pb-16">
            {/* Hero Section */}
            <section className="relative py-16 bg-[#111827]">
               <div className="absolute inset-0 overflow-hidden opacity-20">
                  <div className="h-[600px] w-100 bg-black"></div>
                  {/* <Image
                     src={
                        post.featuredImage ||
                        "/placeholder.svg?height=600&width=1200"
                     }
                     alt="Background"
                     fill
                     className="object-cover"
                     priority
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#111827] to-transparent"></div>
               </div>

               <div className="container relative z-10">
                  <div className="max-w-3xl mx-auto text-center">
                     <div className="flex justify-center gap-2 mb-4">
                        {post.categories.map((category) => (
                           <Link
                              key={category}
                              href={`/blog?category=${category}`}
                           >
                              <Badge className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400">
                                 #{category.toLowerCase()}
                              </Badge>
                           </Link>
                        ))}
                     </div>
                     <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        {post.title}
                     </h1>
                     <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                           <Calendar className="h-4 w-4" />
                           <span>
                              {formatDate(post.publishedAt || post.createdAt)}
                           </span>
                        </div>
                        <div className="flex items-center gap-1">
                           <Clock className="h-4 w-4" />
                           <span>{getReadingTime(post.content)} min read</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <Eye className="h-4 w-4" />
                           <span>{post.viewCount} views</span>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Author */}
            <div className="container max-w-3xl -mt-8 mb-8 relative z-10">
               <div className="flex items-center gap-4 bg-[#1a2236] p-4 rounded-lg border border-gray-800">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                     <Image
                        src={
                           post.author.photoURL ||
                           `/placeholder.svg?height=48&width=48`
                        }
                        alt={post.author.name}
                        fill
                        className="object-cover"
                     />
                  </div>
                  <div>
                     <div className="font-medium text-white">
                        {post.author.name}
                     </div>
                     <div className="text-sm text-gray-400">
                        Posted on{" "}
                        {formatDate(post.publishedAt || post.createdAt)}
                     </div>
                  </div>
               </div>
            </div>

            {/* Content */}
            <div className="container max-w-3xl">
               <article className="prose prose-invert lg:prose-lg mx-auto">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
               </article>

               {/* Tags */}
               <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                     <Link key={tag} href={`/blog?tag=${tag}`}>
                        <Badge
                           variant="outline"
                           className="border-gray-700 text-cyan-400 hover:bg-gray-800"
                        >
                           #{tag.toLowerCase()}
                        </Badge>
                     </Link>
                  ))}
               </div>

               {/* Share */}
               <div className="mt-8 pt-8 border-t border-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                     <h3 className="font-medium text-white">
                        Share this article
                     </h3>
                     <div className="flex gap-2">
                        <Button
                           variant="outline"
                           size="icon"
                           className="rounded-full border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                           <Twitter className="h-4 w-4" />
                           <span className="sr-only">Share on Twitter</span>
                        </Button>
                        <Button
                           variant="outline"
                           size="icon"
                           className="rounded-full border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                           <Linkedin className="h-4 w-4" />
                           <span className="sr-only">Share on LinkedIn</span>
                        </Button>
                        <Button
                           variant="outline"
                           size="icon"
                           className="rounded-full border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                           <Share2 className="h-4 w-4" />
                           <span className="sr-only">Copy link</span>
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Comments */}
            <div className="container max-w-3xl mt-12">
               <div className="border-t border-gray-800 pt-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">
                     Comments
                  </h2>
                  <CommentForm postId={post.id} />
                  <div className="mt-8">
                     <CommentList postId={post.id} refreshTrigger={0} />
                  </div>
               </div>
            </div>

            {/* Related Posts */}
            <section className="mt-16 py-12 bg-[#111827]">
               <div className="container">
                  <h2 className="text-2xl font-bold mb-8 text-white">
                     Recommended Posts
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {relatedPosts
                        .filter((relatedPost) => relatedPost.id !== post.id)
                        .slice(0, 3)
                        .map((relatedPost) => (
                           <PostCard key={relatedPost.id} post={relatedPost} />
                        ))}
                  </div>
               </div>
            </section>
         </main>
         <Footer />
      </>
   );
}
