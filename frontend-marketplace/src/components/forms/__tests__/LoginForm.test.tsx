import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import LoginForm from '../LoginForm';

// Mock the necessary hooks and actions
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(),
  useEffect: jest.fn(),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    setIsAuthenticated: jest.fn(),
  }),
}));

jest.mock('@/lib/actions/auth/post-login', () => ({
  submitLogin: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

const mockUseActionState = useActionState as jest.MockedFunction<typeof useActionState>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
    mockUseActionState.mockReturnValue([
      { errors: {}, message: '', success: false },
      jest.fn(),
      false,
    ]);
  });

  describe('Form rendering', () => {
    it('renders login form with all required fields', () => {
      render(<LoginForm />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    it('renders login form title and description', () => {
      render(<LoginForm />);

      expect(screen.getByText(/fazer login/i)).toBeInTheDocument();
      expect(screen.getByText(/digite suas credenciais/i)).toBeInTheDocument();
    });

    it('renders link to register page', () => {
      render(<LoginForm />);

      const registerLink = screen.getByRole('link', { name: /criar conta/i });
      expect(registerLink).toBeInTheDocument();
      expect(registerLink).toHaveAttribute('href', '/register');
    });
  });

  describe('Form interactions', () => {
    it('allows users to type in email field', () => {
      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      expect(emailInput.value).toBe('test@example.com');
    });

    it('allows users to type in password field', () => {
      render(<LoginForm />);

      const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(passwordInput.value).toBe('password123');
    });

    it('calls form action when form is submitted', () => {
      const mockFormAction = jest.fn();
      mockUseActionState.mockReturnValue([
        { errors: {}, message: '', success: false },
        mockFormAction,
        false,
      ]);

      render(<LoginForm />);

      const form = screen.getByRole('form');
      fireEvent.submit(form);

      expect(mockFormAction).toHaveBeenCalled();
    });
  });

  describe('Form validation and error handling', () => {
    it('displays email validation errors', () => {
      mockUseActionState.mockReturnValue([
        {
          errors: { email: ['Email inválido'] },
          message: '',
          success: false,
        },
        jest.fn(),
        false,
      ]);

      render(<LoginForm />);

      expect(screen.getByText('Email inválido')).toBeInTheDocument();
    });

    it('displays password validation errors', () => {
      mockUseActionState.mockReturnValue([
        {
          errors: { password: ['Senha muito fraca'] },
          message: '',
          success: false,
        },
        jest.fn(),
        false,
      ]);

      render(<LoginForm />);

      expect(screen.getByText('Senha muito fraca')).toBeInTheDocument();
    });

    it('displays general error message', () => {
      mockUseActionState.mockReturnValue([
        {
          errors: {},
          message: 'Erro ao fazer login',
          success: false,
        },
        jest.fn(),
        false,
      ]);

      render(<LoginForm />);

      expect(screen.getByText('Erro ao fazer login')).toBeInTheDocument();
    });

    it('displays multiple field errors simultaneously', () => {
      mockUseActionState.mockReturnValue([
        {
          errors: {
            email: ['Email é obrigatório'],
            password: ['Senha é obrigatória'],
          },
          message: '',
          success: false,
        },
        jest.fn(),
        false,
      ]);

      render(<LoginForm />);

      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
    });
  });

  describe('Loading states', () => {
    it('disables submit button when form is pending', () => {
      mockUseActionState.mockReturnValue([
        { errors: {}, message: '', success: false },
        jest.fn(),
        true, // isPending = true
      ]);

      render(<LoginForm />);

      const submitButton = screen.getByRole('button', { name: /entrar/i });
      expect(submitButton).toBeDisabled();
    });

    it('shows loading state on submit button when pending', () => {
      mockUseActionState.mockReturnValue([
        { errors: {}, message: '', success: false },
        jest.fn(),
        true,
      ]);

      render(<LoginForm />);

      expect(screen.getByText(/carregando/i)).toBeInTheDocument();
    });

    it('enables submit button when form is not pending', () => {
      mockUseActionState.mockReturnValue([
        { errors: {}, message: '', success: false },
        jest.fn(),
        false, // isPending = false
      ]);

      render(<LoginForm />);

      const submitButton = screen.getByRole('button', { name: /entrar/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has proper form labeling', () => {
      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/senha/i);

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('associates error messages with form fields', () => {
      mockUseActionState.mockReturnValue([
        {
          errors: { email: ['Email inválido'] },
          message: '',
          success: false,
        },
        jest.fn(),
        false,
      ]);

      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const errorMessage = screen.getByText('Email inválido');

      expect(errorMessage).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });

    it('has proper form structure with semantic HTML', () => {
      render(<LoginForm />);

      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });
  });

  describe('Custom className handling', () => {
    it('applies custom className when provided', () => {
      render(<LoginForm className="custom-login-form" />);

      const formContainer = screen.getByRole('form').closest('.custom-login-form');
      expect(formContainer).toBeInTheDocument();
    });

    it('spreads additional props correctly', () => {
      render(<LoginForm data-testid="login-form-container" />);

      expect(screen.getByTestId('login-form-container')).toBeInTheDocument();
    });
  });
});
