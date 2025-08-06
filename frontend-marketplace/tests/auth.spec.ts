import { test, expect } from '@playwright/test';

// Configurações globais para todos os testes de auth
test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a página inicial antes de cada teste
    await page.goto('http://localhost:3000');
  });

  test('should display login form correctly', async ({ page }) => {
    // Navegar para página de login
    await page.goto('http://localhost:3000/login');

    // Verificar se os elementos estão visíveis
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/senha/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible();

    // Verificar link para registro
    await expect(page.getByRole('link', { name: /registrar-se/i })).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    // Tentar submeter formulário vazio
    await page.getByRole('button', { name: /entrar/i }).click();

    // Aguardar e verificar mensagens de erro
    await expect(page.getByText(/precisa ter 1 caractér no minímo/i)).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    // Preencher com credenciais inválidas
    await page.getByLabel(/e-mail/i).fill('usuario@inexistente.com');
    await page.getByLabel(/senha/i).fill('senhaerrada123!');

    // Submeter formulário
    await page.getByRole('button', { name: /entrar/i }).click();

    // Aguardar mensagem de erro
    await expect(page.getByText(/e-mail ou senha inválidos/i)).toBeVisible();
  });

  test('should complete login flow successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    // Preencher com credenciais válidas (você precisa ter um usuário de teste)
    await page.getByLabel(/e-mail/i).fill('test@example.com');
    await page.getByLabel(/senha/i).fill('validPassword123!');

    // Submeter formulário
    await page.getByRole('button', { name: /entrar/i }).click();

    // Aguardar redirecionamento para página inicial
    await expect(page).toHaveURL('http://localhost:3000');

    // Verificar se elementos de usuário logado estão visíveis
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
  });

  test('should complete logout flow', async ({ page }) => {
    // Primeiro fazer login
    await page.goto('http://localhost:3000/login');
    await page.getByLabel(/e-mail/i).fill('test@example.com');
    await page.getByLabel(/senha/i).fill('validPassword123!');
    await page.getByRole('button', { name: /entrar/i }).click();

    // Aguardar login
    await expect(page).toHaveURL('http://localhost:3000');

    // Fazer logout
    await page.getByRole('button', { name: /logout/i }).click();

    // Verificar redirecionamento para login
    await expect(page).toHaveURL('http://localhost:3000/login');
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
  });

  test('should register new user successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    // Gerar email único para teste
    const uniqueEmail = `test${Date.now()}@example.com`;

    // Preencher formulário de registro
    await page.getByLabel(/nome/i).fill('Usuario Teste');
    await page.getByLabel(/e-mail/i).fill(uniqueEmail);
    await page.getByLabel(/senha/i).fill('senhaSegura123!');

    // Submeter formulário
    await page.getByRole('button', { name: /registrar/i }).click();

    // Verificar sucesso (pode ser redirecionamento ou mensagem)
    await expect(page).toHaveURL('http://localhost:3000');
  });
});
