import type { Product, ProductFormState } from "../../types/definitions";

export async function getRelatedProducts(
  category: string,
  currentProductId: string,
  limit: number = 8,
): Promise<ProductFormState> {
  try {
    const url = `http://localhost:3001/products/${category}/related?exclude=${currentProductId}&limit=${limit}`;

    const productsResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!productsResponse.ok) {
      console.error(
        "Erro ao obter produtos relacionados:",
        productsResponse.status,
      );

      if (productsResponse.status === 404) {
        return await getRelatedProductsFallback(
          category,
          currentProductId,
          limit,
        );
      }

      return {
        errors: { _form: ["Erro ao buscar produtos relacionados."] },
        message: "Erro ao buscar produtos relacionados no servidor.",
        success: false,
      };
    }

    const productsResult = await productsResponse.json();

    const products: Product[] = productsResult.success
      ? productsResult.data || []
      : [];

    return {
      message: "Produtos relacionados obtidos com sucesso.",
      success: true,
      errors: {},
      products: products,
    };
  } catch (error) {
    console.error("Erro ao obter produtos relacionados:", error);

    return await getRelatedProductsFallback(category, currentProductId, limit);
  }
}

async function getRelatedProductsFallback(
  category: string,
  currentProductId: string,
  limit: number,
): Promise<ProductFormState> {
  try {
    const { getProductCategory } = await import("./get-product-category");
    const result = await getProductCategory(category);

    if (!result.success || !result.products) {
      return result;
    }

    const relatedProducts = result.products
      .filter((product: Product) => product.id !== currentProductId)
      .slice(0, limit);

    return {
      ...result,
      products: relatedProducts,
    };
  } catch (error) {
    return {
      errors: { _form: ["Erro ao buscar produtos relacionados."] },
      message: "Erro de conexão.",
      success: false,
    };
  }
}
