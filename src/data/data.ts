export interface Post {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  content?: string;
  author?: string; // No está en los datos actuales, lo puedes agregar en Strapi
  date: string; // Lo mapearemos desde `publishedAt`
  readTime?: string; // Puedes calcularlo a partir del contenido
  slug: string;
}
