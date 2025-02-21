"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { samplePosts } from "@/data/data";
import PostDetailModal from "@/components/blog/DetailPost";

// Types
interface Post {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  content?: string;
  author?: string;
  date?: string;
  readTime?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4
    }
  }
};

const heroVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export default function PostsComponent() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const firstPost = samplePosts[0];
  const otherPosts = samplePosts.slice(1);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={isLoaded ? "show" : "hidden"}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Últimos Posts
        </motion.h1>

        <div className="space-y-8">
          {/* Hero Post */}
          <motion.article
            variants={heroVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl cursor-pointer"
            onClick={() => handlePostClick(firstPost)}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.img
              src={firstPost.imageUrl}
              alt={firstPost.title}
              className="w-full h-full object-cover"
              layoutId={`image-${firstPost.id}`}
            />
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">{firstPost.title}</h2>
              <p className="text-lg text-gray-200 mb-4">{firstPost.summary}</p>
              <motion.button
                className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Leer más
              </motion.button>
            </motion.div>
          </motion.article>

          {/* Grid de Posts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl"
          >
            <AnimatePresence>
              {otherPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-lg transform-gpu cursor-pointer backdrop-blur-sm bg-white/80 border border-white/20"
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.2 },
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                  }}
                  onClick={() => handlePostClick(post)}
                >
                  {/* Efecto de degradado decorativo */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <motion.div className="relative aspect-video overflow-hidden">
                    {/* Overlay base */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent z-10" />
                    
                    <motion.img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      layoutId={`image-${post.id}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Overlay hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-blue-900/40 to-transparent opacity-0 z-20"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Efecto de brillo */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                      animate={{
                        translateX: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  </motion.div>

                  <motion.div className="relative p-6 bg-gradient-to-b from-white/80 to-white z-10">
                    <motion.h3 
                      className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
                    >
                      {post.title}
                    </motion.h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
                    
                    <motion.button
                      className="relative inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-medium group"
                      whileHover={{ x: 5 }}
                    >
                      <span>Leer más</span>
                      <motion.span
                        className="relative"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.span>
                      
                      {/* Underline effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-blue-600"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </motion.div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal de detalle del post */}
      <PostDetailModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}