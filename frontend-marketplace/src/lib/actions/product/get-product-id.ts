import type { Product, SingleProductFormState } from "../../types/definitions";

export async function getProductId(id?: string): Promise<SingleProductFormState> {
  try {
    const url = `http://localhost:3001/product/${id}`;

    console.log(`[getProductCategory] Fetching URL: ${url}`);

    const productResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!productResponse.ok) {
      console.error("Erro ao obter produtos:", productResponse.status, productResponse.statusText);

      if (productResponse.status === 404) {
        return {
          errors: {
            _form: ["Produto não encontrado"],
          },
          message: "Produto não encontrado.",
          success: false,
        };
      }

      const errorDetails = await productResponse.text();
      console.error("Detalhes do erro:", errorDetails);

      return {
        errors: {
          _form: [
            `Erro ${productResponse.status}: ${productResponse.statusText || "Erro desconhecido do servidor"}`,
          ],
        },
        message: "Erro ao buscar produtos no servidor.",
        success: false,
      };
    }

    const response = await productResponse.json();
    console.log("Resposta do backend:", response);

    if (response.success && response.data) {
      const product = Array.isArray(response.data) ? response.data[0] : response.data;

      return {
        message: "Produto obtido com sucesso.",
        success: true,
        errors: {},
        product: product,
      };
    } else {
      return {
        errors: { _form: ["Produto não encontrado"] },
        message: "Produto não encontrado.",
        success: false,
      };
    }
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    return {
      errors: { _form: ["Erro ao obter produtos."] },
      message: "Erro de validação. Relogue novamente.",
      success: false,
    };
  }
}
