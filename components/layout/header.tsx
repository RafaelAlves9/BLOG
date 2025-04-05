"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFirebase } from "@/lib/firebase/firebase-provider";

export function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const pathname = usePathname();
   const { user, signOut } = useFirebase();

   const routes = [
      { name: "Home", path: "/" },
      { name: "Categories", path: "/blog" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
   ];

   const isActive = (path: string) => {
      if (path === "/") {
         return pathname === path;
      }
      return pathname.startsWith(path);
   };

   return (
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#111827]/95 backdrop-blur supports-[backdrop-filter]:bg-[#111827]/60">
         <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
               <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-cyan-400">
                     <span className="text-cyan-400">&lt;/&gt;</span> DevBlog
                  </span>
               </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
               {routes.map((route) => (
                  <Link
                     key={route.path}
                     href={route.path}
                     className={cn(
                        "text-sm font-medium transition-colors hover:text-cyan-400",
                        isActive(route.path) ? "text-white" : "text-gray-400"
                     )}
                  >
                     {route.name}
                  </Link>
               ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
               <Link href="/search">
                  <Button
                     variant="ghost"
                     size="icon"
                     className="text-gray-400 hover:text-white"
                  >
                     <Search className="h-5 w-5" />
                     <span className="sr-only">Search</span>
                  </Button>
               </Link>

               {user ? (
                  <div className="flex items-center gap-4">
                     {user.role === "admin" && (
                        <Link href="/admin/posts">
                           <Button
                              variant="ghost"
                              className="text-gray-400 hover:text-white"
                           >
                              Admin
                           </Button>
                        </Link>
                     )}
                     <Link href="/profile">
                        <Button
                           variant="ghost"
                           className="text-gray-400 hover:text-white"
                        >
                           Profile
                        </Button>
                     </Link>
                     <Button
                        variant="outline"
                        onClick={() => signOut()}
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                     >
                        Logout
                     </Button>
                  </div>
               ) : (
                  <div className="flex items-center gap-2">
                     <Link href="/login">
                        <Button
                           variant="ghost"
                           className="text-gray-400 hover:text-white"
                        >
                           Login
                        </Button>
                     </Link>
                     <Link href="/register">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                           Sign Up
                        </Button>
                     </Link>
                  </div>
               )}
            </div>

            {/* Mobile Menu Button */}
            <Button
               variant="ghost"
               size="icon"
               className="md:hidden text-gray-400 hover:text-white"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
               {isMenuOpen ? (
                  <X className="h-6 w-6" />
               ) : (
                  <Menu className="h-6 w-6" />
               )}
               <span className="sr-only">Menu</span>
            </Button>
         </div>

         {/* Mobile Navigation */}
         {isMenuOpen && (
            <div className="md:hidden border-t border-gray-800">
               <div className="container py-4 flex flex-col gap-4">
                  <nav className="flex flex-col gap-2">
                     {routes.map((route) => (
                        <Link
                           key={route.path}
                           href={route.path}
                           className={cn(
                              "px-2 py-1 text-sm font-medium rounded-md transition-colors",
                              isActive(route.path)
                                 ? "bg-gray-800 text-white"
                                 : "text-gray-400 hover:text-white hover:bg-gray-800"
                           )}
                           onClick={() => setIsMenuOpen(false)}
                        >
                           {route.name}
                        </Link>
                     ))}
                  </nav>

                  <div className="flex flex-col gap-2 pt-2 border-t border-gray-800">
                     <Link href="/search" onClick={() => setIsMenuOpen(false)}>
                        <Button
                           variant="ghost"
                           className="w-full justify-start text-gray-400 hover:text-white"
                        >
                           <Search className="h-5 w-5 mr-2" />
                           Search
                        </Button>
                     </Link>

                     {user ? (
                        <>
                           {user.role === "admin" && (
                              <Link
                                 href="/admin/posts"
                                 onClick={() => setIsMenuOpen(false)}
                              >
                                 <Button
                                    variant="ghost"
                                    className="w-full justify-start text-gray-400 hover:text-white"
                                 >
                                    Admin
                                 </Button>
                              </Link>
                           )}
                           <Link
                              href="/profile"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              <Button
                                 variant="ghost"
                                 className="w-full justify-start text-gray-400 hover:text-white"
                              >
                                 Profile
                              </Button>
                           </Link>
                           <Button
                              variant="outline"
                              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                              onClick={() => {
                                 signOut();
                                 setIsMenuOpen(false);
                              }}
                           >
                              Logout
                           </Button>
                        </>
                     ) : (
                        <>
                           <Link
                              href="/login"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              <Button
                                 variant="ghost"
                                 className="w-full text-gray-400 hover:text-white"
                              >
                                 Login
                              </Button>
                           </Link>
                           <Link
                              href="/register"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                 Sign Up
                              </Button>
                           </Link>
                        </>
                     )}
                  </div>
               </div>
            </div>
         )}
      </header>
   );
}
