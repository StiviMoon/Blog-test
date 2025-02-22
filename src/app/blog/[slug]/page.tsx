"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Nueva forma de obtener params
import { motion } from "framer-motion";
import { Share2, ArrowLeft } from "lucide-react";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/data/data";

export default function PostPage() {
  const { slug } = useParams(); // ✅ Usa useParams() en lugar de destructurar params directamente
  const { posts, loading, error } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (posts.length > 0 && slug) {
      const foundPost = posts.find((p) => p.slug === slug);
      setPost(foundPost || null);
    }
  }, [posts, slug]); // ✅ Ahora `slug` siempre está definido correctamente

  if (loading) return <p className="text-center text-gray-500">Cargando post...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post) return <p className="text-center text-gray-500">Post no encontrado.</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Botón Volver */}
      <button
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-6"
        onClick={() => router.push("/blog")}
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al Blog
      </button>

      {/* Imagen y Título */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-6 text-white">
          <h1 className="text-4xl font-bold">{post.title}</h1>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-6 text-gray-600 mt-4">
        <p className="text-sm">
          <strong>Autor:</strong> {post.author || "Desconocido"}
        </p>
        <p className="text-sm">
          <strong>Fecha:</strong> {post.date || "Sin fecha"}
        </p>
        <p className="text-sm">
          <strong>Tiempo de lectura:</strong> {post.readTime || "5 min"}
        </p>
      </div>

      {/* Contenido */}
      <div className="prose prose-lg mt-6 text-gray-800 leading-relaxed">
        <p>{post.summary}</p>
        <p>{post.content}</p>
      </div>

      {/* Botón de Compartir */}
      <motion.button
        className="flex items-center gap-2 mt-6 text-gray-600 hover:text-gray-900 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => alert("Compartir funcionalidad en desarrollo")}
      >
        <Share2 className="w-5 h-5" />
        Compartir
      </motion.button>
    </motion.div>
  );
}
