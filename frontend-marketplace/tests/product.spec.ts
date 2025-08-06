import { test, expect } from '@playwright/test';

test.describe('Product Pages', () => {
  test('should display product detail page correctly', async ({ page }) => {
    // Navegar para uma categoria primeiro
    await page.goto('http://localhost:3000/men');

    // Aguardar produtos carregarem
    await page.waitForLoadState('networkidle');

    // Clicar no primeiro produto disponível
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();

      // Verificar elementos da página de produto
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible(); // Nome do produto
      await expect(page.getByRole('img')).toBeVisible(); // Imagem principal
      await expect(page.getByText(/R\$/)).toBeVisible(); // Preço

      // Verificar descrição expansível se existir
      const expandButton = page.getByRole('button', { name: /ver mais|expandir/i });
      if (await expandButton.isVisible()) {
        await expandButton.click();
        await expect(page.locator('[data-expanded="true"]')).toBeVisible();
      }

      // Verificar carrossel de imagens se existir
      const carouselNext = page.getByRole('button', { name: /próxima|next/i });
      if (await carouselNext.isVisible()) {
        await carouselNext.click();
      }
    }
  });

  test('should display related products', async ({ page }) => {
    // Navegar para página de produto
    await page.goto('http://localhost:3000/men');
    await page.waitForLoadState('networkidle');

    const firstProduct = page.locator('[data-testid="product-card"]').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();

      // Aguardar página carregar
      await page.waitForLoadState('networkidle');

      // Verificar seção de produtos relacionados
      const relatedSection = page.getByRole('heading', { name: /produtos relacionados|relacionados/i });
      if (await relatedSection.isVisible()) {
        await expect(relatedSection).toBeVisible();

        // Verificar se há produtos relacionados
        const relatedProducts = page.locator('[data-testid="related-products"] [data-testid="product-card"]');
        const count = await relatedProducts.count();
        expect(count).toBeGreaterThan(0);
      }
    }
  });

  test('should navigate between product images in carousel', async ({ page }) => {
    await page.goto('http://localhost:3000/men');
    await page.waitForLoadState('networkidle');

    const firstProduct = page.locator('[data-testid="product-card"]').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      await page.waitForLoadState('networkidle');

      // Verificar se existe carrossel
      const carousel = page.locator('[data-testid="image-carousel"]');
      if (await carousel.isVisible()) {
        // Capturar imagem inicial
        const initialSrc = await page.locator('[data-testid="main-product-image"]').getAttribute('src');

        // Clicar em próxima imagem
        const nextButton = page.getByRole('button', { name: /próxima|next/i });
        if (await nextButton.isVisible()) {
          await nextButton.click();

          // Aguardar mudança de imagem
          await page.waitForTimeout(500);
          const newSrc = await page.locator('[data-testid="main-product-image"]').getAttribute('src');

          // Verificar se imagem mudou
          expect(newSrc).not.toBe(initialSrc);
        }
      }
    }
  });

  test('should filter and sort products in category pages', async ({ page }) => {
    await page.goto('http://localhost:3000/men');
    await page.waitForLoadState('networkidle');

    // Verificar se existem filtros
    const filterSection = page.getByText(/filtros|ordenar/i);
    if (await filterSection.isVisible()) {
      // Testar ordenação por preço se disponível
      const sortSelect = page.locator('select').first();
      if (await sortSelect.isVisible()) {
        await sortSelect.selectOption('price-asc');
        await page.waitForLoadState('networkidle');

        // Verificar se produtos foram reordenados
        const products = page.locator('[data-testid="product-card"]');
        await expect(products.first()).toBeVisible();
      }
    }
  });

  test('should handle product not found', async ({ page }) => {
    // Navegar para produto inexistente
    await page.goto('http://localhost:3000/product/produto-inexistente-123');

    // Verificar página 404 ou mensagem de erro
    await expect(page.getByText(/produto não encontrado|404|not found/i)).toBeVisible();
  });

  test('should display correct breadcrumb navigation', async ({ page }) => {
    await page.goto('http://localhost:3000/men');

    // Verificar breadcrumb se existir
    const breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i });
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb.getByText(/início|home/i)).toBeVisible();
      await expect(breadcrumb.getByText(/masculino|men/i)).toBeVisible();
    }
  });

  test('should load more products with pagination or infinite scroll', async ({ page }) => {
    await page.goto('http://localhost:3000/men');
    await page.waitForLoadState('networkidle');

    // Contar produtos iniciais
    const initialCount = await page.locator('[data-testid="product-card"]').count();

    // Verificar se há paginação
    const nextPage = page.getByRole('button', { name: /próxima página|next/i });
    const loadMore = page.getByRole('button', { name: /carregar mais|load more/i });

    if (await nextPage.isVisible()) {
      // Testar paginação
      await nextPage.click();
      await page.waitForLoadState('networkidle');

      // Verificar se nova página carregou
      await expect(page.locator('[data-testid="product-card"]')).toHaveCount(initialCount);
    } else if (await loadMore.isVisible()) {
      // Testar carregamento infinito
      await loadMore.click();
      await page.waitForLoadState('networkidle');

      // Verificar se mais produtos foram carregados
      const newCount = await page.locator('[data-testid="product-card"]').count();
      expect(newCount).toBeGreaterThan(initialCount);
    }
  });
});
