import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PostCard } from "@/components/post/post-card";
import {
   getFeaturedPosts,
   getRecentPosts,
   getMostViewedPosts,
} from "@/lib/firebase/posts";
import { Github, Twitter, Linkedin } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedText } from "@/components/ui/animated-text";
import { PageTransition } from "@/components/ui/page-transition";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselPrevious,
   CarouselNext,
} from "@/components/ui/carousel";

export default async function Home() {
   // Fetch data for the home page
   const featuredPosts = await getFeaturedPosts(3);
   const recentPosts = await getRecentPosts(2);
   const popularPosts = await getMostViewedPosts(3);

   return (
      <>
         <Header />
         <PageTransition>
            <main className="bg-[#0f172a] text-white">
               {/* Hero Section */}
               <section className="py-16 md:py-24 overflow-hidden">
                  <div className="container">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                           <ScrollReveal>
                              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                 <AnimatedGradientText
                                    text="Welcome to the Future of Tech Blogging"
                                    duration={8}
                                 />
                              </h1>
                           </ScrollReveal>

                           <ScrollReveal delay={0.2}>
                              <p className="text-lg md:text-xl text-gray-300">
                                 Exploring the cutting edge of technology with
                                 in-depth articles, tutorials, and insights from
                                 industry experts.
                              </p>
                           </ScrollReveal>

                           <ScrollReveal delay={0.4}>
                              <div className="flex flex-wrap gap-4">
                                 <Link href="/blog">
                                    <Button
                                       size="lg"
                                       className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                                    >
                                       Start Reading
                                    </Button>
                                 </Link>
                                 <Link href="/subscribe">
                                    <Button
                                       size="lg"
                                       variant="outline"
                                       className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
                                    >
                                       Subscribe
                                    </Button>
                                 </Link>
                              </div>
                           </ScrollReveal>
                        </div>

                        <ParallaxSection speed={0.2} direction="up">
                           <div className="relative">
                              <div className="relative h-64 w-64 md:h-80 md:w-80 mx-auto overflow-hidden rounded-full border-4 border-cyan-400/20 animate-pulse">
                                 <Image
                                    src="/placeholder.svg?height=320&width=320"
                                    alt="John Developer"
                                    fill
                                    className="object-cover"
                                    priority
                                 />
                              </div>
                              <div className="text-center mt-6">
                                 <h2 className="text-xl font-bold">
                                    John Developer
                                 </h2>
                                 <p className="text-gray-400">
                                    Senior Software Engineer & Tech Writer
                                 </p>
                                 <div className="flex justify-center mt-4 space-x-4">
                                    <Link
                                       href="https://github.com"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                       <Github className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform" />
                                    </Link>
                                    <Link
                                       href="https://twitter.com"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                       <Twitter className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform" />
                                    </Link>
                                    <Link
                                       href="https://linkedin.com"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                       <Linkedin className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform" />
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </ParallaxSection>
                     </div>
                  </div>
               </section>

               {/* Featured Posts */}
               <section className="py-16 bg-[#111827]">
                  <div className="container">
                     <ScrollReveal>
                        <h2 className="text-3xl font-bold mb-8 text-white">
                           <AnimatedText
                              text="Featured Posts"
                              className="inline-block"
                           />
                        </h2>
                     </ScrollReveal>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredPosts.map((post, index) => (
                           <ScrollReveal key={post.id} delay={0.1 * index}>
                              <PostCard post={post} variant="featured" />
                           </ScrollReveal>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Recent Posts */}
               <section className="py-16 bg-[#111827]">
                  <div className="container">
                     <ScrollReveal>
                        <h2 className="text-3xl font-bold mb-8 text-white">
                           <AnimatedText
                              text="Recent Posts"
                              className="inline-block"
                           />
                        </h2>
                     </ScrollReveal>

                     <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {recentPosts.map((post, index) => (
                           <ScrollReveal key={post.id} delay={0.1 * index}>
                              <div className="bg-[#1a2236] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors duration-300 hover:shadow-lg hover:shadow-cyan-500/5 group">
                                 <div className="flex items-center gap-2 mb-4">
                                    <div className="text-xs uppercase font-medium text-gray-400">
                                       {post.categories[0] || "JavaScript"}
                                    </div>
                                 </div>
                                 <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                    <Link href={`/blog/${post.slug?.replaceAll(" ", "-")}`}>
                                       {post.title}
                                    </Link>
                                 </h3>
                                 <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                    {post.excerpt}
                                 </p>
                                 <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>{post.viewCount} views</span>
                                    <button className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                       {index === 0
                                          ? 234
                                          : index === 1
                                          ? 186
                                          : 167}{" "}
                                       ♥
                                    </button>
                                 </div>
                              </div>
                           </ScrollReveal>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Most Popular */}
               <section className="py-16 bg-[#111827]">
                  <div className="container">
                     <ScrollReveal>
                        <h2 className="text-3xl font-bold mb-8 text-white">
                           <AnimatedText
                              text="Most Popular"
                              className="inline-block"
                           />
                        </h2>
                     </ScrollReveal>

                     <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {popularPosts.map((post, index) => (
                           <ScrollReveal key={post.id} delay={0.1 * index}>
                              <div className="bg-[#1a2236] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors duration-300 hover:shadow-lg hover:shadow-cyan-500/5 group">
                                 <div className="flex items-center gap-2 mb-4">
                                    <div className="text-xs uppercase font-medium text-gray-400">
                                       {post.categories[0] || "JavaScript"}
                                    </div>
                                 </div>
                                 <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                    <Link href={`/blog/${post.slug.replaceAll(" ", "-")}`}>
                                       {post.title}
                                    </Link>
                                 </h3>
                                 <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                    {post.excerpt}
                                 </p>
                                 <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>{post.viewCount} views</span>
                                    <button className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                       {index === 0
                                          ? 234
                                          : index === 1
                                          ? 186
                                          : 167}{" "}
                                       ♥
                                    </button>
                                 </div>
                              </div>
                           </ScrollReveal>
                        ))}
                     </div>
                  </div>
               </section>
            </main>
         </PageTransition>
         <Footer />
      </>
   );
}
