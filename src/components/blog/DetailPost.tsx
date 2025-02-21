"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, User, Calendar, Share2 } from "lucide-react";

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

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  closed: { opacity: 0 },
  open: { 
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.3
    }
  }
};

const modalVariants = {
  closed: { 
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  open: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300
    }
  }
};

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, isOpen, onClose }) => {
  // Prevenir scroll cuando el modal está abierto
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:p-0"
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Overlay con blur */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
            variants={modalVariants}
          >
            {/* Botón de cerrar */}
            <motion.button
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Imagen principal */}
            <div className="relative h-[400px] overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"
              />
              <motion.img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                layoutId={`image-${post.id}`}
              />
              
              {/* Metadata sobre la imagen */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                <motion.h1 
                  className="text-4xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {post.title}
                </motion.h1>
                
                <motion.div 
                  className="flex items-center gap-6 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author || 'Autor Anónimo'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date || '20 Feb 2024'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime || '5 min lectura'}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-8">
              {/* Resumen */}
              <motion.p 
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {post.summary}
              </motion.p>

              {/* Contenido principal */}
              <motion.div 
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {post.content || `
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                `}
              </motion.div>

              {/* Footer con acciones */}
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Tags */}
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                    #tecnología
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    #desarrollo
                  </span>
                </div>

                {/* Compartir */}
                <motion.button
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-5 h-5" />
                  <span>Compartir</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostDetailModal;