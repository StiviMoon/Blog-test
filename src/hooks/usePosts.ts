import { useState, useEffect } from "react";
import config from "../../config";
import { Post } from "@/data/data";

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const reqOptions = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        };

        const request = await fetch(`${config.api}/api/blogs?populate=*`, reqOptions);
        if (!request.ok) throw new Error("Error al obtener los posts");

        const response = await request.json();

        const formattedPosts: Post[] = response.data.map((post: any) => ({
          id: post.id,
          title: post.Title,
          summary: post.Summary,
          imageUrl: post.Thumball?.url ? `${config.api}${post.Thumball.url}` : "/placeholder.jpg",
          content: post.Content,
          date: post.publishedAt,
          slug: post.slug,
        }));

        setPosts(formattedPosts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default usePosts;
