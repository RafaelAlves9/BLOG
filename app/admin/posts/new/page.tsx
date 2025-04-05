"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PostEditor } from "@/components/post/post-editor";
import { createPost } from "@/lib/firebase/posts";
import { getCategories } from "@/lib/firebase/categories";
import { getTags } from "@/lib/firebase/tags";
import { useFirebase } from "@/lib/firebase/firebase-provider";
import { useToast } from "@/hooks/use-toast";
import type { Category, Tag, Post } from "@/lib/types";

export default function NewPostPage() {
   const router = useRouter();
   const { user, loading } = useFirebase();
   const { toast } = useToast();
   const [categories, setCategories] = useState<Category[]>([]);
   const [tags, setTags] = useState<Tag[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [categoriesData, tagsData] = await Promise.all([
               getCategories(),
               getTags(),
            ]);
            setCategories(categoriesData);
            setTags(tagsData);
         } catch (error) {
            console.error("Error loading data:", error);
            toast({
               title: "Error",
               description: "Could not load categories and tags.",
               variant: "destructive",
            });
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, [toast]);

   useEffect(() => {
      // Check if user is authenticated and is admin
      if (!loading && (!user || user.role !== "admin")) {
         toast({
            title: "Access denied",
            description: "You don't have permission to access this page.",
            variant: "destructive",
         });
         router.push("/");
      }
   }, [user, loading, router, toast]);

   const handleSavePost = async (postData: Partial<Post>) => {
      try {
         if (!user) {
            throw new Error("User not authenticated");
         }

         const newPostData = {
            ...postData,
            author: {
               id: user.id,
               name: user.name,
               photoURL: user.photoURL,
            },
         };

         const postId = await createPost(newPostData as any);

         toast({
            title: "Success",
            description: "Post created successfully!",
         });

         router.push(`/blog/${postData.title?.replace(/\s+/g, "-")}`);
      } catch (error) {
         console.error("Error saving post:", error);
         toast({
            title: "Error",
            description: "Could not create post. Please try again.",
            variant: "destructive",
         });
      }
   };

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
      );
   }

   if (!user || user.role !== "admin") {
      return null; // Redirect already handled in useEffect
   }

   return (
      <>
         <Header />
         <main className="container py-12 bg-[#0f172a] min-h-screen">
            <PostEditor
               onSave={handleSavePost}
               categories={categories}
               tags={tags}
            />
         </main>
         <Footer />
      </>
   );
}
