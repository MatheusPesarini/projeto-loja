import { FastifyReply, FastifyRequest } from "fastify";
import { ProductService } from "../services/productService";
import { errorResponse, successResponse } from "../utils/responses";
import { categoryParamsSchema, productParamsSchema, relatedProductsParamsSchema, relatedProductsQuerySchema, searchParamsSchema } from "../types/definition";

export class ProductController {
  static async getAllProducts(request: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await ProductService.getAllProducts();
      reply.send(successResponse(products));
    } catch (error) {
      request.log.error(error, "Erro ao buscar todos os produtos");
      reply.status(500).send({
        success: false,
        message: "Erro interno ao buscar produtos",
      });
    }
  }

  static async getProductsByCategory(request: FastifyRequest, reply: FastifyReply) {
    const paramsValidation = categoryParamsSchema.safeParse(request.params);

    if (!paramsValidation.success) {
      return reply.status(400).send(errorResponse(
        'Parâmetros inválidos',
        paramsValidation.error.flatten()
      ));
    }

    const { category } = paramsValidation.data;

    try {
      const products = await ProductService.getProductsByCategory(category);

      if (products.length > 0) {
        reply.status(200).send(successResponse(products, `Produtos encontrados na categoria: ${category}`));
      } else {
        reply.status(404).send({ error: "Nenhum produto encontrado para esta categoria" });
      }
    } catch (error) {
      request.log.error(error, `Erro ao buscar produtos na categoria: ${category}`);
      reply.status(500).send({
        success: false,
        message: "Erro interno ao buscar produtos por categoria",
      });
    }
  }

  static async getProductById(request: FastifyRequest, reply: FastifyReply) {
    const paramsValidation = productParamsSchema.safeParse(request.params);

    if (!paramsValidation.success) {
      return reply.status(400).send(errorResponse(
        'ID do produto inválido',
        paramsValidation.error.flatten()
      ));
    }

    const { id } = paramsValidation.data;

    try {
      const product = await ProductService.getProductById(id);

      if (product) {
        reply.send(successResponse(product, "Produto encontrado"));
      } else {
        reply.status(404).send(errorResponse("Produto não encontrado"));
      }
    } catch (error) {
      request.log.error(error, `Erro ao buscar produto com ID: ${id}`);
      reply.status(500).send(errorResponse("Erro interno ao buscar produto por ID"));
    }
  }

  static async getRelatedProducts(request: FastifyRequest, reply: FastifyReply) {
    console.log('=== DEBUG RELATED PRODUCTS ===');
    console.log('request.params:', request.params);
    console.log('request.query:', request.query);

    const paramsValidation = relatedProductsParamsSchema.safeParse(request.params);

    if (!paramsValidation.success) {
      console.log('❌ Erro na validação dos params:', paramsValidation.error);
      return reply.status(400).send(errorResponse(
        'Parâmetros inválidos',
        paramsValidation.error.flatten()
      ));
    }

    const queryValidation = relatedProductsQuerySchema.safeParse(request.query);

    if (!queryValidation.success) {
      console.log('❌ Erro na validação da query:', queryValidation.error);
      return reply.status(400).send(errorResponse(
        'Query parameters inválidos',
        queryValidation.error.flatten()
      ));
    }

    console.log('✅ Query validada:', queryValidation.data);

    const { category } = paramsValidation.data;
    const { exclude, limit } = queryValidation.data;

    try {
      const products = await ProductService.getRelatedProducts(category, exclude, limit ? Number(limit) : undefined);

      if (products.length > 0) {
        reply.send(successResponse(products, "Produtos relacionados encontrados"));
      } else {
        reply.status(404).send(errorResponse("Nenhum produto relacionado encontrado"));
      }
    } catch (error) {
      request.log.error(error, `Erro ao buscar produtos relacionados para a categoria: ${category}`);
      reply.status(500).send(errorResponse("Erro interno ao buscar produtos relacionados"));
    }
  }

  static async searchProducts(request: FastifyRequest, reply: FastifyReply) {
    const paramsValidation = searchParamsSchema.safeParse(request.params);

    if (!paramsValidation.success) {
      return reply.status(400).send(errorResponse(
        'Termo de busca inválido',
        paramsValidation.error.flatten()
      ));
    }

    const { searchTerm } = paramsValidation.data;

    try {
      const products = await ProductService.searchProducts(searchTerm);
      reply.send(successResponse(products, 'Produtos encontrados'));
    } catch (error) {
      request.log.error(error, `Erro ao buscar produtos com termo: ${searchTerm}`);
      reply.status(500).send(errorResponse("Erro interno ao buscar produtos"));
    }
  }
}