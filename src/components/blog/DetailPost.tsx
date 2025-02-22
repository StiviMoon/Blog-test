"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, User, Calendar, Share2, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from 'react-responsive';
import { Post } from "@/data/data";

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { ease: "easeOut", duration: 0.3 } },
};

const modalVariants = {
  closed: { 
    opacity: 0, 
    y: 100, 
    scale: 0.95,
    transition: { duration: 0.2 }
  },
  open: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 300,
      duration: 0.4
    } 
  },
};

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, isOpen, onClose }) => {
  const router = useRouter();
  
  // Media queries específicos para diferentes dispositivos
  const isIPhone14 = useMediaQuery({ query: '(min-width: 390px) and (max-width: 393px) and (min-height: 844px) and (max-height: 852px)' });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!post) return null;

  // Ajustes específicos para iPhone 14
  const modalHeight = isIPhone14 ? "h-[75vh]" : "max-h-[85vh]";
  const imageHeight = isIPhone14 ? "h-[30vh]" : "h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px]";
  const contentPadding = isIPhone14 ? "p-4" : "p-4 sm:p-6 md:p-8";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3"
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Overlay optimizado */}
          <motion.div 
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" 
            variants={overlayVariants} 
            onClick={onClose}
          />

          {/* Modal con ajustes específicos para iPhone 14 */}
          <motion.div 
            className={`relative w-[92%] ${modalHeight} bg-white rounded-xl shadow-xl overflow-hidden z-10 ${isMobile ? 'max-w-[400px]' : 'sm:w-[85%] md:w-[80%] lg:w-[75%] max-w-[130vh]'}`}
            variants={modalVariants}
            style={{
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div className="h-full overflow-y-auto">
              {/* Botón de cerrar optimizado */}
              <motion.button
                className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Imagen principal ajustada */}
              <div className={`relative ${imageHeight} overflow-hidden`}>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Metadata ajustada */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 text-white">
                  <motion.h1 
                    className={`${isIPhone14 ? 'text-lg' : 'text-xl'} sm:text-2xl md:text-3xl font-bold mb-2`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {post.title}
                  </motion.h1>

                  <motion.div 
                    className="flex flex-wrap items-center gap-2 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author || "Autor Anónimo"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime || "3 min lectura"}</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Contenido ajustado */}
              <div className={contentPadding}>
                <motion.p 
                  className="text-sm text-gray-600 mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {post.summary}
                </motion.p>

                <motion.div 
                  className="prose prose-sm max-w-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {post.content || "Contenido no disponible."}
                </motion.div>

                {/* Footer optimizado */}
                <motion.div
                  className="mt-4 pt-3 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex flex-col gap-3">
                    {/* Tags ajustados */}
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs">#tecnología</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">#desarrollo</span>
                    </motion.div>

                    {/* Botones ajustados */}
                    <div className="flex items-center justify-between">
                      <motion.button 
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-xs"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Compartir</span>
                      </motion.button>

                      <motion.button
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-xs"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (post.slug) {
                            router.push(`/blog/${post.slug}`);
                          }
                        }}
                      >
                        <span>Más</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostDetailModal;