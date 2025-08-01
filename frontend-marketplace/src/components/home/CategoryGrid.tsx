import { fetchSectionImages } from "@/lib/actions/images/get-section-image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Images = {
  src: string;
  alt: string;
};

export default function CategoryGrid() {
  const [images, setImages] = useState<Images[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        const fetchedImages = await fetchSectionImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Erro ao carregar imagens:", error);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  return (
    <section className="py-12 md:py-16 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Navegue por Categoria</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/men"
          className="group block relative aspect-square overflow-hidden border-2 transition-all duration-300 ease-in-out hover:shadow-lg"
        >
          <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-center">
            <div
              className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              style={{ willChange: "transform" }}
            >
              <Image
                src={images[0]?.src || "/placeholder-image.jpg"}
                alt={images[0]?.alt || "Categoria Masculino"}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                quality={100}
                priority
              />
            </div>
            <span className="text-white text-2xl bg-black/20 font-medium z-10 p-2">Masculino</span>
          </div>
        </Link>
        <Link
          href="/women"
          className="group block relative overflow-hidden border-2 transition-all duration-300 ease-in-out hover:shadow-lg"
        >
          <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-center">
            <div
              className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              style={{ willChange: "transform" }}
            >
              <Image
                src={images[1]?.src || "/placeholder-image.jpg"}
                alt={images[1]?.alt || "Categoria Feminino"}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                quality={100}
              />
            </div>
            <span className="text-white text-2xl bg-black/20 font-medium z-10 p-2">Feminino</span>
          </div>
        </Link>
        <Link
          href="/kids"
          className="group block relative overflow-hidden border-2 transition-all duration-300 ease-in-out hover:shadow-lg"
        >
          <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-center">
            <div
              className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              style={{ willChange: "transform" }}
            >
              <Image
                src={images[2]?.src || "/placeholder-image.jpg"}
                alt={images[2]?.alt || "Categoria Infantil"}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                quality={100}
              />
            </div>
            <span className="text-white text-2xl bg-black/20 font-medium z-10 p-2">Infantil</span>
          </div>
        </Link>
        <Link
          href="/accessories"
          className="group block relative overflow-hidden border-2 transition-all duration-300 ease-in-out hover:shadow-lg"
        >
          <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-center">
            <div
              className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              style={{ willChange: "transform" }}
            >
              <Image
                src={images[3]?.src || "/placeholder-image.jpg"}
                alt={images[3]?.alt || "Categoria Acessórios"}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                quality={100}
              />
            </div>
            <span className="text-white text-2xl bg-black/20 font-medium z-10 p-2">Acessórios</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
