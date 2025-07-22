import type { Product, ProductFormState } from "../../types/definitions";

export async function getProduct(): Promise<ProductFormState> {
  try {
    const productsResponse = await fetch(`http://localhost:3001/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!productsResponse.ok) {
      console.error(
        "Erro ao obter produtos:",
        productsResponse.status,
        productsResponse.statusText,
      );
      const errorDetails = await productsResponse.text();
      console.error("Detalhes do erro:", errorDetails);

      return {
        errors: {
          _form: [
            `Erro ${productsResponse.status}: ${productsResponse.statusText || "Erro desconhecido do servidor"}`,
          ],
        },
        message: "Erro ao buscar produtos no servidor.",
        success: false,
      };
    }

    const productsResult = await productsResponse.json();

    console.log("Produtos obtidos com sucesso:", productsResult);

    const products: Product[] = Array.isArray(productsResult)
      ? productsResult
      : productsResult.data || [];

    return {
      message: "Produtos obtidos com sucesso.",
      success: true,
      errors: {},
      products: products,
    };
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    return {
      errors: { _form: ["Erro ao obter produtos."] },
      message: "Erro de validação. Relogue novamente.",
      success: false,
    };
  }
}
