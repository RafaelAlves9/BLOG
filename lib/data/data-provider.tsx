"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, Post, Category, Tag, Comment } from "../types"
import { users, posts, categories, tags, comments } from "./mock-data"
import { generateId, slugify } from "../utils"

interface DataContextType {
  // Auth
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>

  // Posts
  getPosts: (
    postsPerPage?: number,
    page?: number,
    categoryFilter?: string,
    tagFilter?: string,
    searchQuery?: string,
  ) => Promise<{ posts: Post[]; totalPosts: number; totalPages: number }>
  getPostBySlug: (slug: string) => Promise<Post | null>
  getFeaturedPosts: (limit?: number) => Promise<Post[]>
  getMostViewedPosts: (limit?: number) => Promise<Post[]>
  getRecentPosts: (limit?: number) => Promise<Post[]>
  createPost: (postData: Omit<Post, "id" | "createdAt" | "updatedAt" | "viewCount">) => Promise<string>
  updatePost: (postId: string, postData: Partial<Post>) => Promise<string>
  deletePost: (postId: string) => Promise<boolean>
  incrementViewCount: (postId: string) => Promise<void>

  // Categories
  getCategories: () => Promise<Category[]>
  getCategoryBySlug: (slug: string) => Promise<Category | null>
  createCategory: (categoryData: Omit<Category, "id" | "postCount">) => Promise<string>
  updateCategory: (categoryId: string, categoryData: Partial<Category>) => Promise<string>
  deleteCategory: (categoryId: string) => Promise<boolean>

  // Tags
  getTags: () => Promise<Tag[]>
  getTagBySlug: (slug: string) => Promise<Tag | null>
  createTag: (tagData: Omit<Tag, "id" | "postCount">) => Promise<string>
  updateTag: (tagId: string, tagData: Partial<Tag>) => Promise<string>
  deleteTag: (tagId: string) => Promise<boolean>

  // Comments
  getCommentsByPostId: (postId: string) => Promise<Comment[]>
  addComment: (commentData: Omit<Comment, "id" | "createdAt" | "updatedAt">) => Promise<string>
  updateComment: (commentId: string, content: string) => Promise<string>
  deleteComment: (commentId: string) => Promise<boolean>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [localPosts, setLocalPosts] = useState<Post[]>(posts)
  const [localCategories, setLocalCategories] = useState<Category[]>(categories)
  const [localTags, setLocalTags] = useState<Tag[]>(tags)
  const [localComments, setLocalComments] = useState<Comment[]>(comments)

  // Simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      // Verificar se há um usuário salvo no localStorage
      const savedUser = localStorage.getItem("currentUser")
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser))
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Auth functions
  const signIn = async (email: string, password: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = users.find((u) => u.email === email)

    if (!user) {
      throw new Error("auth/user-not-found")
    }

    // Em um sistema real, verificaríamos a senha aqui
    // Para simplificar, vamos apenas verificar se o email existe

    setCurrentUser(user)
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  const signUp = async (email: string, password: string, name: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verificar se o email já existe
    if (users.some((u) => u.email === email)) {
      throw new Error("auth/email-already-in-use")
    }

    // Criar novo usuário
    const newUser: User = {
      id: generateId(),
      name,
      email,
      role: "reader",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Em um sistema real, adicionaríamos o usuário ao banco de dados
    // Para simplificar, vamos apenas definir o usuário atual

    setCurrentUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))
  }

  const signOut = async () => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500))

    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  // Posts functions
  const getPosts = async (
    postsPerPage = 10,
    page = 1,
    categoryFilter?: string,
    tagFilter?: string,
    searchQuery?: string,
  ) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredPosts = [...localPosts]

    // Filtrar por categoria
    if (categoryFilter) {
      filteredPosts = filteredPosts.filter((post) => post.categories.includes(categoryFilter))
    }

    // Filtrar por tag
    if (tagFilter) {
      filteredPosts = filteredPosts.filter((post) => post.tags.includes(tagFilter))
    }

    // Filtrar por texto de pesquisa
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query),
      )
    }

    // Ordenar por data de publicação (mais recente primeiro)
    filteredPosts.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt
      const dateB = b.publishedAt || b.createdAt
      return dateB.getTime() - dateA.getTime()
    })

    // Calcular paginação
    const totalPosts = filteredPosts.length
    const totalPages = Math.ceil(totalPosts / postsPerPage)
    const startIndex = (page - 1) * postsPerPage
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

    return {
      posts: paginatedPosts,
      totalPosts,
      totalPages,
    }
  }

  const getPostBySlug = async (slug: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    const post = localPosts.find((p) => p.slug === slug)
    return post || null
  }

  const getFeaturedPosts = async (limit = 5) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    return localPosts
      .filter((post) => post.featured && post.status === "published")
      .sort((a, b) => {
        const dateA = a.publishedAt || a.createdAt
        const dateB = b.publishedAt || b.createdAt
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, limit)
  }

  const getMostViewedPosts = async (limit = 5) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    return localPosts
      .filter((post) => post.status === "published")
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit)
  }

  const getRecentPosts = async (limit = 5) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    return localPosts
      .filter((post) => post.status === "published")
      .sort((a, b) => {
        const dateA = a.publishedAt || a.createdAt
        const dateB = b.publishedAt || b.createdAt
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, limit)
  }

  const createPost = async (postData: Omit<Post, "id" | "createdAt" | "updatedAt" | "viewCount">) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Gerar slug se não fornecido
    const slug = postData.slug || slugify(postData.title)

    // Verificar se o slug já existe
    if (localPosts.some((p) => p.slug === slug)) {
      throw new Error("Slug já existe")
    }

    const now = new Date()
    const newPost: Post = {
      id: generateId(),
      ...postData,
      slug,
      viewCount: 0,
      createdAt: now,
      updatedAt: now,
      publishedAt: postData.status === "published" ? now : undefined,
    }

    setLocalPosts((prev) => [...prev, newPost])

    // Atualizar contadores de categorias e tags
    updateCategoryAndTagCounts()

    return newPost.id
  }

  const updatePost = async (postId: string, postData: Partial<Post>) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const postIndex = localPosts.findIndex((p) => p.id === postId)

    if (postIndex === -1) {
      throw new Error("Post não encontrado")
    }

    // Se o título foi alterado e não foi fornecido um novo slug, gerar um novo
    let slug = postData.slug
    if (postData.title && !postData.slug) {
      slug = slugify(postData.title)

      // Verificar se o novo slug já existe (exceto para o post atual)
      if (localPosts.some((p) => p.slug === slug && p.id !== postId)) {
        throw new Error("Slug já existe")
      }
    }

    // Se o status está mudando para publicado e não há data de publicação
    let publishedAt = postData.publishedAt
    if (postData.status === "published" && !localPosts[postIndex].publishedAt && !publishedAt) {
      publishedAt = new Date()
    }

    const updatedPost: Post = {
      ...localPosts[postIndex],
      ...postData,
      slug: slug || localPosts[postIndex].slug,
      publishedAt,
      updatedAt: new Date(),
    }

    const updatedPosts = [...localPosts]
    updatedPosts[postIndex] = updatedPost

    setLocalPosts(updatedPosts)

    // Atualizar contadores de categorias e tags
    updateCategoryAndTagCounts()

    return postId
  }

  const deletePost = async (postId: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const postIndex = localPosts.findIndex((p) => p.id === postId)

    if (postIndex === -1) {
      throw new Error("Post não encontrado")
    }

    // Remover o post
    const updatedPosts = localPosts.filter((p) => p.id !== postId)
    setLocalPosts(updatedPosts)

    // Remover comentários associados ao post
    setLocalComments((prev) => prev.filter((c) => c.postId !== postId))

    // Atualizar contadores de categorias e tags
    updateCategoryAndTagCounts()

    return true
  }

  const incrementViewCount = async (postId: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    const postIndex = localPosts.findIndex((p) => p.id === postId)

    if (postIndex === -1) {
      return
    }

    const updatedPosts = [...localPosts]
    updatedPosts[postIndex] = {
      ...updatedPosts[postIndex],
      viewCount: updatedPosts[postIndex].viewCount + 1,
    }

    setLocalPosts(updatedPosts)
  }

  // Categories functions
  const getCategories = async () => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    return localCategories
  }

  const getCategoryBySlug = async (slug: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    const category = localCategories.find((c) => c.slug === slug)
    return category || null
  }

  const createCategory = async (categoryData: Omit<Category, "id" | "postCount">) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Gerar slug se não fornecido
    const slug = categoryData.slug || slugify(categoryData.name)

    // Verificar se o slug já existe
    if (localCategories.some((c) => c.slug === slug)) {
      throw new Error("Slug já existe")
    }

    const newCategory: Category = {
      id: generateId(),
      ...categoryData,
      slug,
      postCount: 0,
    }

    setLocalCategories((prev) => [...prev, newCategory])

    return newCategory.id
  }

  const updateCategory = async (categoryId: string, categoryData: Partial<Category>) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const categoryIndex = localCategories.findIndex((c) => c.id === categoryId)

    if (categoryIndex === -1) {
      throw new Error("Categoria não encontrada")
    }

    // Se o nome foi alterado e não foi fornecido um novo slug, gerar um novo
    let slug = categoryData.slug
    if (categoryData.name && !categoryData.slug) {
      slug = slugify(categoryData.name)

      // Verificar se o novo slug já existe (exceto para a categoria atual)
      if (localCategories.some((c) => c.slug === slug && c.id !== categoryId)) {
        throw new Error("Slug já existe")
      }
    }

    const updatedCategory: Category = {
      ...localCategories[categoryIndex],
      ...categoryData,
      slug: slug || localCategories[categoryIndex].slug,
    }

    const updatedCategories = [...localCategories]
    updatedCategories[categoryIndex] = updatedCategory

    setLocalCategories(updatedCategories)

    return categoryId
  }

  const deleteCategory = async (categoryId: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const categoryIndex = localCategories.findIndex((c) => c.id === categoryId)

    if (categoryIndex === -1) {
      throw new Error("Categoria não encontrada")
    }

    // Verificar se há posts usando esta categoria
    const categoryName = localCategories[categoryIndex].name
    if (localPosts.some((p) => p.categories.includes(categoryName))) {
      throw new Error("Não é possível excluir uma categoria que está sendo usada por posts")
    }

    // Remover a categoria
    const updatedCategories = localCategories.filter((c) => c.id !== categoryId)
    setLocalCategories(updatedCategories)

    return true
  }

  // Tags functions
  const getTags = async () => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    return localTags
  }

  const getTagBySlug = async (slug: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    const tag = localTags.find((t) => t.slug === slug)
    return tag || null
  }

  const createTag = async (tagData: Omit<Tag, "id" | "postCount">) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Gerar slug se não fornecido
    const slug = tagData.slug || slugify(tagData.name)

    // Verificar se o slug já existe
    if (localTags.some((t) => t.slug === slug)) {
      throw new Error("Slug já existe")
    }

    const newTag: Tag = {
      id: generateId(),
      ...tagData,
      slug,
      postCount: 0,
    }

    setLocalTags((prev) => [...prev, newTag])

    return newTag.id
  }

  const updateTag = async (tagId: string, tagData: Partial<Tag>) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const tagIndex = localTags.findIndex((t) => t.id === tagId)

    if (tagIndex === -1) {
      throw new Error("Tag não encontrada")
    }

    // Se o nome foi alterado e não foi fornecido um novo slug, gerar um novo
    let slug = tagData.slug
    if (tagData.name && !tagData.slug) {
      slug = slugify(tagData.name)

      // Verificar se o novo slug já existe (exceto para a tag atual)
      if (localTags.some((t) => t.slug === slug && t.id !== tagId)) {
        throw new Error("Slug já existe")
      }
    }

    const updatedTag: Tag = {
      ...localTags[tagIndex],
      ...tagData,
      slug: slug || localTags[tagIndex].slug,
    }

    const updatedTags = [...localTags]
    updatedTags[tagIndex] = updatedTag

    setLocalTags(updatedTags)

    return tagId
  }

  const deleteTag = async (tagId: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const tagIndex = localTags.findIndex((t) => t.id === tagId)

    if (tagIndex === -1) {
      throw new Error("Tag não encontrada")
    }

    // Verificar se há posts usando esta tag
    const tagName = localTags[tagIndex].name
    if (localPosts.some((p) => p.tags.includes(tagName))) {
      throw new Error("Não é possível excluir uma tag que está sendo usada por posts")
    }

    // Remover a tag
    const updatedTags = localTags.filter((t) => t.id !== tagId)
    setLocalTags(updatedTags)

    return true
  }

  // Comments functions
  const getCommentsByPostId = async (postId: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500))

    return localComments
      .filter((comment) => comment.postId === postId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  const addComment = async (commentData: Omit<Comment, "id" | "createdAt" | "updatedAt">) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const now = new Date()
    const newComment: Comment = {
      id: generateId(),
      ...commentData,
      createdAt: now,
      updatedAt: now,
    }

    setLocalComments((prev) => [...prev, newComment])

    return newComment.id
  }

  const updateComment = async (commentId: string, content: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const commentIndex = localComments.findIndex((c) => c.id === commentId)

    if (commentIndex === -1) {
      throw new Error("Comentário não encontrado")
    }

    const updatedComment: Comment = {
      ...localComments[commentIndex],
      content,
      updatedAt: new Date(),
    }

    const updatedComments = [...localComments]
    updatedComments[commentIndex] = updatedComment

    setLocalComments(updatedComments)

    return commentId
  }

  const deleteComment = async (commentId: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const commentIndex = localComments.findIndex((c) => c.id === commentId)

    if (commentIndex === -1) {
      throw new Error("Comentário não encontrado")
    }

    // Remover o comentário
    const updatedComments = localComments.filter((c) => c.id !== commentId)
    setLocalComments(updatedComments)

    return true
  }

  // Função auxiliar para atualizar contadores de categorias e tags
  const updateCategoryAndTagCounts = () => {
    // Atualizar contadores de categorias
    const updatedCategories = [...localCategories]
    for (let i = 0; i < updatedCategories.length; i++) {
      const categoryName = updatedCategories[i].name
      const count = localPosts.filter((p) => p.categories.includes(categoryName)).length
      updatedCategories[i] = {
        ...updatedCategories[i],
        postCount: count,
      }
    }
    setLocalCategories(updatedCategories)

    // Atualizar contadores de tags
    const updatedTags = [...localTags]
    for (let i = 0; i < updatedTags.length; i++) {
      const tagName = updatedTags[i].name
      const count = localPosts.filter((p) => p.tags.includes(tagName)).length
      updatedTags[i] = {
        ...updatedTags[i],
        postCount: count,
      }
    }
    setLocalTags(updatedTags)
  }

  return (
    <DataContext.Provider
      value={{
        // Auth
        user: currentUser,
        loading,
        signIn,
        signUp,
        signOut,

        // Posts
        getPosts,
        getPostBySlug,
        getFeaturedPosts,
        getMostViewedPosts,
        getRecentPosts,
        createPost,
        updatePost,
        deletePost,
        incrementViewCount,

        // Categories
        getCategories,
        getCategoryBySlug,
        createCategory,
        updateCategory,
        deleteCategory,

        // Tags
        getTags,
        getTagBySlug,
        createTag,
        updateTag,
        deleteTag,

        // Comments
        getCommentsByPostId,
        addComment,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData deve ser usado dentro de um DataProvider")
  }
  return context
}

