import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
} from "firebase/firestore"
import { db } from "./firebase-config"
import type { Category } from "../types"
import { slugify } from "../utils"

// Obter todas as categorias
export async function getCategories() {
  try {
    const categoriesRef = collection(db, "categories")
    const q = query(categoriesRef, orderBy("name", "asc"))

    const querySnapshot = await getDocs(q)

    const categories: Category[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      categories.push({
        id: doc.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        postCount: data.postCount || 0,
      })
    })

    return categories
  } catch (error) {
    console.error("Erro ao buscar categorias:", error)
    throw error
  }
}

// Obter uma categoria pelo slug
export async function getCategoryBySlug(slug: string) {
  try {
    const categoriesRef = collection(db, "categories")
    const q = query(categoriesRef, where("slug", "==", slug), limit(1))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const doc = querySnapshot.docs[0]
    const data = doc.data()

    return {
      id: doc.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      postCount: data.postCount || 0,
    } as Category
  } catch (error) {
    console.error("Erro ao buscar categoria por slug:", error)
    throw error
  }
}

// Criar uma nova categoria
export async function createCategory(categoryData: Omit<Category, "id" | "postCount">) {
  try {
    // Gerar slug se não fornecido
    if (!categoryData.slug) {
      categoryData.slug = slugify(categoryData.name)
    }

    const newCategory = {
      ...categoryData,
      postCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "categories"), newCategory)
    return docRef.id
  } catch (error) {
    console.error("Erro ao criar categoria:", error)
    throw error
  }
}

// Atualizar uma categoria existente
export async function updateCategory(categoryId: string, categoryData: Partial<Category>) {
  try {
    const categoryRef = doc(db, "categories", categoryId)

    // Se o nome foi alterado e não foi fornecido um novo slug, gerar um novo
    if (categoryData.name && !categoryData.slug) {
      categoryData.slug = slugify(categoryData.name)
    }

    await updateDoc(categoryRef, {
      ...categoryData,
      updatedAt: serverTimestamp(),
    })

    return categoryId
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error)
    throw error
  }
}

// Excluir uma categoria
export async function deleteCategory(categoryId: string) {
  try {
    const categoryRef = doc(db, "categories", categoryId)
    await deleteDoc(categoryRef)
    return true
  } catch (error) {
    console.error("Erro ao excluir categoria:", error)
    throw error
  }
}

