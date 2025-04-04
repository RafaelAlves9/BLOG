"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { getCommentsByPostId } from "@/lib/firebase/comments"
import type { Comment } from "@/lib/types"
import { useFirebase } from "@/lib/firebase/firebase-provider"

interface CommentListProps {
  postId: string
  refreshTrigger: number
}

export function CommentList({ postId, refreshTrigger }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useFirebase()

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true)
      try {
        const fetchedComments = await getCommentsByPostId(postId)
        setComments(fetchedComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [postId, refreshTrigger])

  if (isLoading) {
    return <div className="text-center py-8 text-gray-400">Loading comments...</div>
  }

  if (comments.length === 0) {
    return <div className="text-center py-8 text-gray-400">No comments yet. Be the first to comment!</div>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">{comments.length} Comments</h3>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 border-b border-gray-800 pb-6">
            <div className="flex-shrink-0">
              {comment.author.photoURL ? (
                <Image
                  src={comment.author.photoURL || "/placeholder.svg"}
                  alt={comment.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-medium">
                  {comment.author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                  <h4 className="font-medium text-white">{comment.author.name}</h4>
                  <p className="text-xs text-gray-400">{formatDate(comment.createdAt)}</p>
                </div>
                {user && comment.author.id === user.id && (
                  <button className="text-xs text-gray-400 hover:text-cyan-400 mt-1 sm:mt-0">Edit</button>
                )}
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-300">
                <p>{comment.content}</p>
              </div>
              <button className="text-xs text-gray-400 hover:text-cyan-400 mt-2">Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

