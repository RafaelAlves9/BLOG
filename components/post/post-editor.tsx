"use client"

import type React from "react"

import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  Code,
  Upload,
} from "lucide-react"
import { uploadPostImage } from "@/lib/firebase/posts"
import type { Post } from "@/lib/types"

interface PostEditorProps {
  initialData?: Partial<Post>
  onSave: (postData: Partial<Post>) => Promise<void>
  categories: { id: string; name: string }[]
  tags: { id: string; name: string }[]
}

export function PostEditor({ initialData, onSave, categories, tags }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "")
  const [selectedCategory, setSelectedCategory] = useState<string>(initialData?.categories?.[0] || "")
  const [tagInput, setTagInput] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || [])
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "draft")
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Write your post content here...",
      }),
    ],
    content: initialData?.content || "",
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-4 focus:outline-none text-white bg-[#1a2236] rounded-md",
      },
    },
  })

  const handleSave = async (saveAsDraft = false) => {
    if (!title) {
      alert("Title is required")
      return
    }

    if (!editor) return

    setIsSaving(true)

    try {
      const postData: Partial<Post> = {
        title,
        content: editor.getHTML(),
        excerpt: excerpt || title,
        featuredImage,
        categories: selectedCategory ? [selectedCategory] : [],
        tags: selectedTags,
        status: saveAsDraft ? "draft" : "published",
      }

      await onSave(postData)
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Error saving the post. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      const postId = initialData?.id || "temp-" + Date.now()
      const imageUrl = await uploadPostImage(file, postId)
      setFeaturedImage(imageUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error uploading image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const addImage = () => {
    const url = prompt("Image URL:")
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = prompt("Link URL:")
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const handleAddTag = () => {
    if (tagInput && !selectedTags.includes(tagInput)) {
      setSelectedTags([...selectedTags, tagInput])
      setTagInput("")
    }
  }

  return (
    <div className="space-y-6 bg-[#111827] p-6 rounded-lg border border-gray-800">
      <h1 className="text-2xl font-bold text-cyan-400">Create New Post</h1>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">
          Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="bg-[#1a2236] border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt" className="text-white">
          Description
        </Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief description of your post"
          rows={3}
          className="bg-[#1a2236] border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">
            Category
          </Label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-[#1a2236] border border-gray-700 rounded-md text-white"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags" className="text-white">
            Tags
          </Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tags separated by commas"
              className="bg-[#1a2236] border-gray-700 text-white placeholder:text-gray-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag) => (
              <div key={tag} className="bg-[#1e293b] text-cyan-400 px-2 py-1 rounded-md text-sm flex items-center">
                #{tag}
                <button
                  type="button"
                  onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="featured-image" className="text-white">
          Featured Image
        </Label>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-[#1a2236]">
          {featuredImage ? (
            <div className="relative w-full max-w-sm h-40 mx-auto">
              <img
                src={featuredImage || "/placeholder.svg"}
                alt="Featured image"
                className="object-cover w-full h-full rounded-md"
              />
              <button
                type="button"
                onClick={() => setFeaturedImage("")}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                &times;
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="text-gray-400">
                Drag and drop your image here, or{" "}
                <label className="text-cyan-400 cursor-pointer hover:underline">
                  browse files
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-white">
          Content
        </Label>
        <div className="border rounded-md bg-[#1a2236] border-gray-700">
          <div className="flex flex-wrap gap-1 p-2 border-b border-gray-700 bg-[#111827]">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={editor?.isActive("bold") ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}
            >
              <Bold className="h-4 w-4" />
              <span className="sr-only">Bold</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={editor?.isActive("italic") ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}
            >
              <Italic className="h-4 w-4" />
              <span className="sr-only">Italic</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
              className={
                editor?.isActive("heading", { level: 1 }) ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }
            >
              <Heading1 className="h-4 w-4" />
              <span className="sr-only">Heading 1</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              className={
                editor?.isActive("heading", { level: 2 }) ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }
            >
              <Heading2 className="h-4 w-4" />
              <span className="sr-only">Heading 2</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={editor?.isActive("bulletList") ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Bullet list</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={editor?.isActive("orderedList") ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}
            >
              <ListOrdered className="h-4 w-4" />
              <span className="sr-only">Ordered list</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              className={editor?.isActive("blockquote") ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}
            >
              <Quote className="h-4 w-4" />
              <span className="sr-only">Quote</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              className={editor?.isActive("codeBlock") ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}
            >
              <Code className="h-4 w-4" />
              <span className="sr-only">Code block</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={addLink}
              className="text-gray-400 hover:text-white"
            >
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Add link</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={addImage}
              className="text-gray-400 hover:text-white"
            >
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Add image</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().undo().run()}
              className="text-gray-400 hover:text-white"
            >
              <Undo className="h-4 w-4" />
              <span className="sr-only">Undo</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => editor?.chain().focus().redo().run()}
              className="text-gray-400 hover:text-white"
            >
              <Redo className="h-4 w-4" />
              <span className="sr-only">Redo</span>
            </Button>
          </div>
          <EditorContent editor={editor} className="min-h-[300px]" />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => handleSave(true)}
          disabled={isSaving}
          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Save as Draft
        </Button>
        <Button
          onClick={() => handleSave(false)}
          disabled={isSaving}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          Publish Post
        </Button>
      </div>
    </div>
  )
}

