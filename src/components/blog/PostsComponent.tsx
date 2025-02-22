"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePosts from "@/hooks/usePosts";
import PostDetailModal from "@/components/blog/DetailPost";
import { Post } from "@/data/data";

export default function PostsComponent() {
  const { posts, loading, error } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando posts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-500">No hay publicaciones disponibles.</p>;
  }

  const featuredPost = posts[0]; // El primer post es el destacado
  const otherPosts = posts.slice(1); // Los demás posts

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Últimos Posts
        </h1>

        {/* Post Destacado */}
        <motion.article
          className="relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => handlePostClick(featuredPost)}
        >
          <img
            src={featuredPost.imageUrl}
            alt={featuredPost.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 via-black/40 to-transparent text-white">
            <h2 className="text-3xl font-bold">{featuredPost.title}</h2>
            <p className="text-gray-200 line-clamp-2">{featuredPost.summary}</p>
          </div>
        </motion.article>

        {/* Posts Restantes */}
        <motion.div
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          <AnimatePresence>
            {otherPosts.map((post) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handlePostClick(post)}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600 line-clamp-2">{post.summary}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal de Detalle */}
      {isModalOpen && selectedPost && (
        <PostDetailModal post={selectedPost} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
