import { test, expect } from '@playwright/test';

test.describe('E-commerce Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load homepage with all key sections', async ({ page }) => {
    // Verificar cabeçalho
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();

    // Verificar barra de pesquisa
    await expect(page.getByPlaceholder(/pesquisar produtos/i)).toBeVisible();

    // Verificar categorias
    await expect(page.getByText(/masculino/i)).toBeVisible();
    await expect(page.getByText(/feminino/i)).toBeVisible();
    await expect(page.getByText(/infantil/i)).toBeVisible();

    // Verificar seção de produtos em destaque
    await expect(page.getByRole('heading', { name: /produtos em destaque/i })).toBeVisible();

    // Verificar newsletter
    await expect(page.getByRole('heading', { name: /newsletter/i })).toBeVisible();

    // Verificar rodapé
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('should navigate between categories', async ({ page }) => {
    // Navegar para masculino
    await page.getByText(/masculino/i).click();
    await expect(page).toHaveURL(/.*men/);
    await expect(page.getByRole('heading', { name: /masculino/i })).toBeVisible();

    // Voltar e navegar para feminino
    await page.goto('http://localhost:3000');
    await page.getByText(/feminino/i).click();
    await expect(page).toHaveURL(/.*women/);
    await expect(page.getByRole('heading', { name: /feminino/i })).toBeVisible();

    // Navegar para infantil
    await page.goto('http://localhost:3000');
    await page.getByText(/infantil/i).click();
    await expect(page).toHaveURL(/.*kids/);
    await expect(page.getByRole('heading', { name: /infantil/i })).toBeVisible();
  });

  test('should perform product search', async ({ page }) => {
    // Buscar por um produto
    const searchTerm = 'camiseta';
    await page.getByPlaceholder(/pesquisar produtos/i).fill(searchTerm);
    await page.getByPlaceholder(/pesquisar produtos/i).press('Enter');

    // Verificar se a busca foi realizada
    // Aguardar carregamento de resultados
    await page.waitForLoadState('networkidle');

    // Verificar se há produtos ou mensagem de "não encontrado"
    const hasProducts = await page.locator('[data-testid="product-card"]').count();
    if (hasProducts > 0) {
      await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();
    } else {
      await expect(page.getByText(/nenhum produto encontrado/i)).toBeVisible();
    }
  });

  test('should display product cards with correct information', async ({ page }) => {
    // Aguardar produtos carregarem
    await page.waitForLoadState('networkidle');

    // Verificar se existe pelo menos um card de produto
    const productCards = page.locator('[data-testid="product-card"]');
    const cardCount = await productCards.count();

    if (cardCount > 0) {
      const firstCard = productCards.first();

      // Verificar elementos do card
      await expect(firstCard.getByRole('img')).toBeVisible(); // Imagem
      await expect(firstCard.locator('h3')).toBeVisible(); // Nome
      await expect(firstCard.getByText(/R\$/)).toBeVisible(); // Preço

      // Verificar link funcionando
      await expect(firstCard.getByRole('link')).toHaveAttribute('href', /.*/);
    }
  });

  test('should subscribe to newsletter', async ({ page }) => {
    // Rolar até newsletter
    await page.getByRole('heading', { name: /newsletter/i }).scrollIntoViewIfNeeded();

    // Preencher email
    const newsletterEmail = `newsletter${Date.now()}@test.com`;
    await page.getByPlaceholder(/seu e-mail/i).fill(newsletterEmail);

    // Submeter
    await page.getByRole('button', { name: /inscrever-se/i }).click();

    // Verificar confirmação
    await expect(page.getByText(/obrigado por se inscrever/i)).toBeVisible();
  });

  test('should toggle theme correctly', async ({ page }) => {
    // Procurar botão de tema
    const themeButton = page.getByRole('button', { name: /tema/i });

    if (await themeButton.isVisible()) {
      // Verificar tema inicial
      const initialTheme = await page.locator('html').getAttribute('class');

      // Alternar tema
      await themeButton.click();

      // Verificar mudança
      const newTheme = await page.locator('html').getAttribute('class');
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('should have working navigation menu on mobile', async ({ page }) => {
    // Definir viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar se menu hamburguer está visível
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    await expect(mobileMenuButton).toBeVisible();

    // Abrir menu
    await mobileMenuButton.click();

    // Verificar itens do menu mobile
    await expect(page.getByRole('link', { name: /masculino/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /feminino/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /infantil/i })).toBeVisible();
  });
});
