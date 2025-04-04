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
import type { Tag } from "../types"
import { slugify } from "../utils"

// Obter todas as tags
export async function getTags() {
  try {
    const tagsRef = collection(db, "tags")
    const q = query(tagsRef, orderBy("name", "asc"))

    const querySnapshot = await getDocs(q)

    const tags: Tag[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      tags.push({
        id: doc.id,
        name: data.name,
        slug: data.slug,
        postCount: data.postCount || 0,
      })
    })

    return tags
  } catch (error) {
    console.error("Erro ao buscar tags:", error)
    throw error
  }
}

// Obter uma tag pelo slug
export async function getTagBySlug(slug: string) {
  try {
    const tagsRef = collection(db, "tags")
    const q = query(tagsRef, where("slug", "==", slug), limit(1))
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
      postCount: data.postCount || 0,
    } as Tag
  } catch (error) {
    console.error("Erro ao buscar tag por slug:", error)
    throw error
  }
}

// Criar uma nova tag
export async function createTag(tagData: Omit<Tag, "id" | "postCount">) {
  try {
    // Gerar slug se não fornecido
    if (!tagData.slug) {
      tagData.slug = slugify(tagData.name)
    }

    const newTag = {
      ...tagData,
      postCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "tags"), newTag)
    return docRef.id
  } catch (error) {
    console.error("Erro ao criar tag:", error)
    throw error
  }
}

// Atualizar uma tag existente
export async function updateTag(tagId: string, tagData: Partial<Tag>) {
  try {
    const tagRef = doc(db, "tags", tagId)

    // Se o nome foi alterado e não foi fornecido um novo slug, gerar um novo
    if (tagData.name && !tagData.slug) {
      tagData.slug = slugify(tagData.name)
    }

    await updateDoc(tagRef, {
      ...tagData,
      updatedAt: serverTimestamp(),
    })

    return tagId
  } catch (error) {
    console.error("Erro ao atualizar tag:", error)
    throw error
  }
}

// Excluir uma tag
export async function deleteTag(tagId: string) {
  try {
    const tagRef = doc(db, "tags", tagId)
    await deleteDoc(tagRef)
    return true
  } catch (error) {
    console.error("Erro ao excluir tag:", error)
    throw error
  }
}

