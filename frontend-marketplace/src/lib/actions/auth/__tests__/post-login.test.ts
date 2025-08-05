import { cookies } from 'next/headers';
import { submitLogin } from '../post-login';

// Mock das dependências
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

const mockCookies = {
  set: jest.fn(),
  get: jest.fn(),
  toString: jest.fn(() => ''),
};

global.fetch = jest.fn();

describe('submitLogin Server Action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (cookies as jest.Mock).mockResolvedValue(mockCookies);
  });

  it('should set cookie when login is successful', async () => {
    // Mock da resposta da API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: 'Login realizado com sucesso',
        token: 'jwt-token-example',
      }),
    });

    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    const result = await submitLogin({ errors: {}, message: '', success: false }, formData);

    // Verifica se o cookie foi definido
    expect(mockCookies.set).toHaveBeenCalledWith('session', 'jwt-token-example', {
      httpOnly: true,
      secure: false, // true em produção
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    expect(result.success).toBe(true);
    expect(result.isAuthenticated).toBe(true);
  });

  it('should handle login failure correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: 'Credenciais inválidas',
      }),
    });

    const formData = new FormData();
    formData.append('email', 'wrong@example.com');
    formData.append('password', 'wrongpassword');

    const result = await submitLogin({ errors: {}, message: '', success: false }, formData);

    // Não deve definir cookie em caso de falha
    expect(mockCookies.set).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.errors?._form).toContain('Credenciais inválidas');
  });

  it('should handle network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    const result = await submitLogin({ errors: {}, message: '', success: false }, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Erro de conexão.');
  });
});
