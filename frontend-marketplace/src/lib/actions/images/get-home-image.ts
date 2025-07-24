"use server";

type Images = {
  src: string;
  alt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchHomeImages(): Promise<Images[]> {
  if (!API_URL) {
    console.error("Erro Crítico: API_URL não está configurada no ambiente do servidor.");
    return [];
  }

  console.log(`Fetching images from: ${API_URL}/images/home`);

  try {
    const res = await fetch(`${API_URL}/images/home`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Falha ao buscar imagens da API: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Erro de formato: API não retornou um array.");
      return [];
    }

    const validImages = data
      .filter((item) => item && typeof item.src === "string" && typeof item.alt === "string")
      .map((item) => ({ src: item.src, alt: item.alt }));

    console.log(`Successfully fetched ${validImages.length} images.`);
    return validImages;
  } catch (error) {
    console.error("Erro inesperado durante o fetch na Server Action:", error);
    return [];
  }
}
