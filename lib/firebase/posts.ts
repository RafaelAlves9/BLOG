import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  increment,
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase-config";
import type { Post } from "../types";
import { slugify } from "../utils";

// Converter para transformar dados do Firestore em objetos Post
const postConverter = {
  toFirestore: (post: Omit<Post, "id">): DocumentData => {
     return {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        featuredImage: post.featuredImage,
        author: post.author,
        categories: post.categories,
        tags: post.tags,
        status: post.status,
        featured: post.featured || false,
        viewCount: post.viewCount || 0,
        createdAt:
           post.createdAt instanceof Date
              ? Timestamp.fromDate(post.createdAt)
              : post.createdAt,
        updatedAt:
           post.updatedAt instanceof Date
              ? Timestamp.fromDate(post.updatedAt)
              : post.updatedAt,
        publishedAt:
           post.publishedAt instanceof Date
              ? Timestamp.fromDate(post.publishedAt)
              : post.publishedAt,
     };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): Post => {
     const data = snapshot.data();
     return {
        id: snapshot.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        author: data.author,
        categories: data.categories,
        tags: data.tags,
        status: data.status,
        featured: data.featured || false,
        viewCount: data.viewCount || 0,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        publishedAt: data.publishedAt?.toDate(),
     };
  },
};

// Obter todos os posts (com paginação)
export async function getPosts(
  postsPerPage = 10,
  lastVisible: QueryDocumentSnapshot | null = null,
  categoryFilter?: string,
  tagFilter?: string,
  searchQuery?: string
) {
  try {
     let postsQuery = query(
        collection(db, "posts"),
        where("status", "==", "published"),
        orderBy("publishedAt", "desc")
     );

     if (categoryFilter) {
        postsQuery = query(
           postsQuery,
           where("categories", "array-contains", categoryFilter)
        );
     }

     if (tagFilter) {
        postsQuery = query(
           postsQuery,
           where("tags", "array-contains", tagFilter)
        );
     }

     // Se houver um cursor de paginação
     if (lastVisible) {
        postsQuery = query(
           postsQuery,
           startAfter(lastVisible),
           limit(postsPerPage)
        );
     } else {
        postsQuery = query(postsQuery, limit(postsPerPage));
     }

     const querySnapshot = await getDocs(postsQuery);

     const posts: Post[] = [];
     querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
           id: doc.id,
           title: data.title,
           slug: data.slug,
           content: data.content,
           excerpt: data.excerpt,
           featuredImage: data.featuredImage,
           author: data.author,
           categories: data.categories,
           tags: data.tags,
           status: data.status,
           featured: data.featured || false,
           viewCount: data.viewCount || 0,
           createdAt: data.createdAt.toDate(),
           updatedAt: data.updatedAt.toDate(),
           publishedAt: data.publishedAt?.toDate(),
        });
     });

     // Filtragem por texto de pesquisa (feita no cliente pois o Firestore não suporta pesquisa de texto completo)
     let filteredPosts = posts;
     if (searchQuery && searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filteredPosts = posts.filter(
           (post) =>
              post.title.toLowerCase().includes(query) ||
              post.excerpt.toLowerCase().includes(query) ||
              post.content.toLowerCase().includes(query)
        );
     }

     // Último documento para paginação
     const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

     return {
        posts: filteredPosts,
        lastVisible: lastDoc,
        hasMore: querySnapshot.docs.length === postsPerPage,
     };
  } catch (error) {
     console.error("Erro ao buscar posts:", error);
     throw error;
  }
}

// Obter um post pelo slug
export async function getPostBySlug(slug: string) {
  try {
     const postsRef = collection(db, "posts");
     const q = query(postsRef, where("slug", "==", slug), limit(1));
     const querySnapshot = await getDocs(q);

     if (querySnapshot.empty) {
        return null;
     }

     const doc = querySnapshot.docs[0];
     const data = doc.data();

     return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        author: data.author,
        categories: data.categories,
        tags: data.tags,
        status: data.status,
        featured: data.featured || false,
        viewCount: data.viewCount || 0,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        publishedAt: data.publishedAt?.toDate(),
     } as Post;
  } catch (error) {
     console.error("Erro ao buscar post por slug:", error);
     throw error;
  }
}

// Obter posts em destaque
export async function getFeaturedPosts(limitProps = 5) {
  try {
     const postsRef = collection(db, "posts");
     const q = query(
        postsRef,
        where("status", "==", "published"),
        where("featured", "==", true),
        orderBy("publishedAt", "desc"),
        limit(limitProps)
     );

     const querySnapshot = await getDocs(q);

     const posts: Post[] = [];
     querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
           id: doc.id,
           title: data.title,
           slug: data.slug,
           content: data.content,
           excerpt: data.excerpt,
           featuredImage: data.featuredImage,
           author: data.author,
           categories: data.categories,
           tags: data.tags,
           status: data.status,
           featured: data.featured || false,
           viewCount: data.viewCount || 0,
           createdAt: data.createdAt.toDate(),
           updatedAt: data.updatedAt.toDate(),
           publishedAt: data.publishedAt?.toDate(),
        });
     });

     return posts;
  } catch (error) {
     console.error("Erro ao buscar posts em destaque:", error);
     throw error;
  }
}

// Obter posts mais vistos
export async function getMostViewedPosts(limitProps = 5) {
  try {
     const postsRef = collection(db, "posts");
     const q = query(
        postsRef,
        where("status", "==", "published"),
        orderBy("viewCount", "desc"),
        limit(limitProps)
     );

     const querySnapshot = await getDocs(q);

     const posts: Post[] = [];
     querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
           id: doc.id,
           title: data.title,
           slug: data.slug,
           content: data.content,
           excerpt: data.excerpt,
           featuredImage: data.featuredImage,
           author: data.author,
           categories: data.categories,
           tags: data.tags,
           status: data.status,
           featured: data.featured || false,
           viewCount: data.viewCount || 0,
           createdAt: data.createdAt.toDate(),
           updatedAt: data.updatedAt.toDate(),
           publishedAt: data.publishedAt?.toDate(),
        });
     });

     return posts;
  } catch (error) {
     console.error("Erro ao buscar posts mais vistos:", error);
     throw error;
  }
}

// Obter posts recentes
export async function getRecentPosts(limitProps = 5) {
  try {
     const postsRef = collection(db, "posts");
     const q = query(
        postsRef,
        where("status", "==", "published"),
        orderBy("publishedAt", "desc"),
        limit(limitProps)
     );

     const querySnapshot = await getDocs(q);

     const posts: Post[] = [];
     querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
           id: doc.id,
           title: data.title,
           slug: data.slug,
           content: data.content,
           excerpt: data.excerpt,
           featuredImage: data.featuredImage,
           author: data.author,
           categories: data.categories,
           tags: data.tags,
           status: data.status,
           featured: data.featured || false,
           viewCount: data.viewCount || 0,
           createdAt: data.createdAt.toDate(),
           updatedAt: data.updatedAt.toDate(),
           publishedAt: data.publishedAt?.toDate(),
        });
     });

     return posts;
  } catch (error) {
     console.error("Erro ao buscar posts recentes:", error);
     throw error;
  }
}

// Criar um novo post
export async function createPost(
  postData: Omit<Post, "id" | "createdAt" | "updatedAt">
) {
  try {
     // Gerar slug se não fornecido
     if (!postData.slug) {
        postData.slug = slugify(postData.title);
     }

     const now = new Date();
     const newPost = {
        ...postData,
        viewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt:
           postData.status === "published" ? serverTimestamp() : null,
     };

     const docRef = await addDoc(collection(db, "posts"), newPost);
     return docRef.id;
  } catch (error) {
     console.error("Erro ao criar post:", error);
     throw error;
  }
}

// Atualizar um post existente
export async function updatePost(postId: string, postData: Partial<Post>) {
  try {
     const postRef = doc(db, "posts", postId);

     // Se o título foi alterado e não foi fornecido um novo slug, gerar um novo
     if (postData.title && !postData.slug) {
        postData.slug = slugify(postData.title);
     }

     // Se o status está mudando para publicado e não há data de publicação
     if (postData.status === "published" && !postData.publishedAt) {
        postData.publishedAt = new Date();
     }

     await updateDoc(postRef, {
        ...postData,
        updatedAt: serverTimestamp(),
        publishedAt:
           postData.publishedAt instanceof Date
              ? Timestamp.fromDate(postData.publishedAt)
              : postData.publishedAt,
     });

     return postId;
  } catch (error) {
     console.error("Erro ao atualizar post:", error);
     throw error;
  }
}

// Excluir um post
export async function deletePost(postId: string) {
  try {
     // Primeiro, obter o post para verificar se há imagem em destaque
     const postRef = doc(db, "posts", postId);
     const postSnap = await getDoc(postRef);

     if (postSnap.exists()) {
        const postData = postSnap.data();

        // Se houver uma imagem em destaque, excluí-la do Storage
        if (postData.featuredImage) {
           try {
              // Extrair o caminho da imagem da URL
              const imageUrl = new URL(postData.featuredImage);
              const imagePath = decodeURIComponent(
                 imageUrl.pathname.split("/o/")[1].split("?")[0]
              );

              // Criar referência para a imagem no Storage
              const imageRef = ref(storage, imagePath);

              // Excluir a imagem
              await deleteObject(imageRef);
           } catch (imageError) {
              console.error("Erro ao excluir imagem do post:", imageError);
              // Continuar mesmo se houver erro ao excluir a imagem
           }
        }

        // Excluir o post
        await deleteDoc(postRef);
     }

     return true;
  } catch (error) {
     console.error("Erro ao excluir post:", error);
     throw error;
  }
}

// Incrementar contador de visualizações
export async function incrementViewCount(postId: string) {
  try {
     const postRef = doc(db, "posts", postId);
     await updateDoc(postRef, {
        viewCount: increment(1),
     });
  } catch (error) {
     console.error("Erro ao incrementar contador de visualizações:", error);
     // Não lançar erro para não interromper a experiência do usuário
  }
}

// Upload de imagem para o post
export async function uploadPostImage(file: File, postId: string) {
  try {
     // Criar um nome de arquivo único
     const fileExtension = file.name.split(".").pop();
     const fileName = `posts/${postId}/${Date.now()}.${fileExtension}`;

     // Criar referência para o arquivo no Storage
     const storageRef = ref(storage, fileName);

     // Fazer upload do arquivo
     const snapshot = await uploadBytes(storageRef, file);

     // Obter URL do arquivo
     const downloadURL = await getDownloadURL(snapshot.ref);

     return downloadURL;
  } catch (error) {
     console.error("Erro ao fazer upload de imagem:", error);
     throw error;
  }
}
