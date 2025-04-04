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
} from "firebase/firestore"
import { db } from "./firebase-config"
import type { Comment } from "../types"

// Obter comentários de um post
export async function getCommentsByPostId(postId: string) {
  try {
    const commentsRef = collection(db, "comments")
    const q = query(commentsRef, where("postId", "==", postId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)

    const comments: Comment[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      comments.push({
        id: doc.id,
        postId: data.postId,
        author: data.author,
        content: data.content,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      })
    })

    return comments
  } catch (error) {
    console.error("Erro ao buscar comentários:", error)
    throw error
  }
}

// Adicionar um comentário
export async function addComment(commentData: Omit<Comment, "id" | "createdAt" | "updatedAt">) {
  try {
    const newComment = {
      ...commentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "comments"), newComment)
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error)
    throw error
  }
}

// Atualizar um comentário
export async function updateComment(commentId: string, content: string) {
  try {
    const commentRef = doc(db, "comments", commentId)
    await updateDoc(commentRef, {
      content,
      updatedAt: serverTimestamp(),
    })
    return commentId
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error)
    throw error
  }
}

// Excluir um comentário
export async function deleteComment(commentId: string) {
  try {
    const commentRef = doc(db, "comments", commentId)
    await deleteDoc(commentRef)
    return true
  } catch (error) {
    console.error("Erro ao excluir comentário:", error)
    throw error
  }
}

