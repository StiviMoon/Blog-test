# 🏰 Arquitectura JAMstack con Next.js 15 y Strapi

## 📌 Introducción

Este documento describe la arquitectura utilizada en el desarrollo de un sitio web de marketing y blog basado en **JAMstack**, utilizando **Next.js 15** para el frontend y **Strapi** como CMS headless para el backend.

---

## 🔥 ¿Por qué JAMstack?

JAMstack (*JavaScript, APIs y Markup*) es una arquitectura moderna que separa el frontend del backend, ofreciendo:

✅ **Alto rendimiento:** Pre-renderización e ISR en Next.js para cargas rápidas.  
✅ **SEO optimizado:** HTML pre-renderizado con metadatos dinámicos.  
✅ **Escalabilidad:** Strapi maneja el contenido de forma flexible.  
✅ **Mayor seguridad:** Sin exposición directa de la base de datos.  
✅ **Menos costos:** Hosting más económico con caching y CDNs.  

---

## 📂 Estructura del Proyecto

```plaintext
/src
  /components
    /layout          # Componentes de estructura (Navbar, Footer, Layout)
    /ui              # Componentes reutilizables básicos (Botón, Input, Card)
    /blog            # Componentes específicos del blog (PostCard, PostList)
  
  /lib
    /strapi         # Configuración y funciones para conectar con Strapi
      client.ts
      queries.ts
    /utils          # Utilidades generales (SEO, formateo de datos)
  
  /types           # Definiciones de TypeScript
    post.ts
    category.ts

  /pages
    /blog
      [slug].tsx    # Página individual de post
      index.tsx     # Lista de posts
    /api           # API routes para contenido dinámico
    _app.tsx
    index.tsx
```

---

## 🎯 Implementación

### 🔗 Conectando Next.js con Strapi

#### 📌 Cliente API en `/lib/strapi/client.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchAPI(path: string) {
  const requestUrl = `${API_URL}/api/${path}`;
  const response = await fetch(requestUrl, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
```

#### 📌 Variables de entorno en `.env.local`

```plaintext
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=tu_token_aqui
```

#### 📄 Páginas Dinámicas con ISR en `/pages/blog/[slug].tsx`

```typescript
export async function getStaticProps({ params }) {
  const post = await fetchAPI(`posts/${params.slug}`);
  return {
    props: { post },
    revalidate: 60 // Revalidación cada 60s
  };
}
```

---

## 🎨 Atomic Design en los Componentes

Se aplica **Atomic Design** para organizar los componentes de forma modular:

- **Átomos:** `Botón`, `Input`, `Card`.
- **Moléculas:** `PostCard`, `Formulario de comentarios`.
- **Organismos:** `Navbar`, `PostList`.
- **Plantillas:** `Layout` del blog.
- **Páginas:** `/blog/[slug].tsx`, `/index.tsx`.

### 📂 Ejemplo de estructura de componentes:

```plaintext
/components
  /ui
    Button.tsx
    Input.tsx
  /blog
    PostCard.tsx
    PostList.tsx
  /layout
    Navbar.tsx
    Footer.tsx
    Layout.tsx
```

---

## 🚀 Optimización y Mejores Prácticas

✅ **Revalidación ISR:** Mantiene el contenido actualizado sin reconstrucciones completas.  
✅ **Uso de React Query o SWR:** Para optimizar el fetching de datos.  
✅ **Middleware de seguridad:** Protección de rutas con autenticación.  
✅ **Optimización de imágenes:** Uso de `next/image` y Strapi para almacenar imágenes.  
✅ **CDN para distribución global:** Mejora tiempos de respuesta en distintas regiones.  

---

Este documento proporciona una guía estructurada para la implementación de un sitio web con **Next.js 15** y **Strapi**, siguiendo las mejores prácticas de **JAMstack** y asegurando rendimiento, seguridad y escalabilidad.

