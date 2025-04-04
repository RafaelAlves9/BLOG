"use client";

import type React from "react";

import { useState } from "react";
import { useFirebase } from "@/lib/firebase/firebase-provider";
import { addComment } from "@/lib/firebase/comments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CommentFormProps {
   postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
   const { user } = useFirebase();
   const { toast } = useToast();
   const [content, setContent] = useState("");
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!content.trim()) {
         toast({
            title: "Error",
            description: "Comment cannot be empty.",
            variant: "destructive",
         });
         return;
      }

      if (!user && (!name.trim() || !email.trim())) {
         toast({
            title: "Error",
            description: "Name and email are required.",
            variant: "destructive",
         });
         return;
      }

      setIsSubmitting(true);

      try {
         await addComment({
            postId,
            author: user
               ? {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    photoURL: user.photoURL,
                 }
               : {
                    name,
                    email,
                 },
            content,
         });

         setContent("");
         if (!user) {
            // Save name and email in localStorage for future use
            localStorage.setItem("commenter_name", name);
            localStorage.setItem("commenter_email", email);
         }

         toast({
            title: "Success",
            description: "Your comment has been added.",
         });
         window.location.reload();
      } catch (error) {
         console.error("Error adding comment:", error);
         toast({
            title: "Error",
            description: "Could not add your comment. Please try again.",
            variant: "destructive",
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   // Load name and email from localStorage if not logged in
   useState(() => {
      if (!user) {
         const savedName = localStorage.getItem("commenter_name");
         const savedEmail = localStorage.getItem("commenter_email");

         if (savedName) setName(savedName);
         if (savedEmail) setEmail(savedEmail);
      }
   });

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
            <Label htmlFor="comment" className="text-white">
               Write your comment...
            </Label>
            <Textarea
               id="comment"
               value={content}
               onChange={(e) => setContent(e.target.value)}
               placeholder="Write your comment here..."
               rows={4}
               required
               className="bg-[#1a2236] border-gray-700 text-white placeholder:text-gray-500 mt-1"
            />
         </div>

         {!user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <Label htmlFor="name" className="text-white">
                     Name
                  </Label>
                  <Input
                     id="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Your name"
                     required
                     className="bg-[#1a2236] border-gray-700 text-white placeholder:text-gray-500 mt-1"
                  />
               </div>
               <div>
                  <Label htmlFor="email" className="text-white">
                     Email
                  </Label>
                  <Input
                     id="email"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Your email"
                     required
                     className="bg-[#1a2236] border-gray-700 text-white placeholder:text-gray-500 mt-1"
                  />
               </div>
            </div>
         )}

         <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
         >
            {isSubmitting ? "Posting..." : "Post Comment"}
         </Button>
      </form>
   );
}
