export interface User {
  id: string
  name: string
  email: string
  photoURL?: string
  bio?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
  role: "admin" | "author" | "reader"
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage?: string
  author: {
    id: string
    name: string
    photoURL?: string
  }
  categories: string[]
  tags: string[]
  status: "draft" | "published"
  featured?: boolean
  viewCount: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  postCount: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  postCount: number
}

export interface Comment {
  id: string
  postId: string
  author: {
    id?: string
    name: string
    email: string
    photoURL?: string
  }
  content: string
  createdAt: Date
  updatedAt: Date
}

