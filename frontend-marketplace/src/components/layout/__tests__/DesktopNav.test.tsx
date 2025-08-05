import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DesktopNav } from '../DesktopNav';

const mockLogo = {
  url: '/',
  title: 'Marketplace Store',
};

describe('DesktopNav', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  describe('Logo rendering', () => {
    it('renders logo correctly with proper structure', () => {
      render(<DesktopNav logo={mockLogo} />);

      // Test logo text
      expect(screen.getByText('Marketplace Store')).toBeInTheDocument();

      // Test logo link
      const logoLink = screen.getByRole('link', { name: /marketplace store/i });
      expect(logoLink).toHaveAttribute('href', '/');
      expect(logoLink).toHaveClass('flex items-center gap-2 justify-self-start');

      // Test store icon
      expect(screen.getByTestId('store-icon')).toBeInTheDocument();
      expect(screen.getByTestId('store-icon')).toHaveClass('size-8');
    });

    it('renders logo with custom url and title', () => {
      const customLogo = {
        url: '/custom-home',
        title: 'Custom Store',
      };

      render(<DesktopNav logo={customLogo} />);

      expect(screen.getByText('Custom Store')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/custom-home');
    });
  });

  describe('Navigation menu items', () => {
    it('renders all main navigation menu items', () => {
      render(<DesktopNav logo={mockLogo} />);

      const expectedMainItems = ['Masculino', 'Feminino', 'Infantil', 'Acessórios', 'Ofertas'];

      expectedMainItems.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('has navigation menu with proper accessibility attributes', () => {
      render(<DesktopNav logo={mockLogo} />);

      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
      expect(navigation).toHaveAttribute('aria-label', 'Main');

      const menuList = screen.getByRole('list');
      expect(menuList).toBeInTheDocument();
    });

    it('renders navigation triggers with proper aria attributes', () => {
      render(<DesktopNav logo={mockLogo} />);

      const triggers = screen.getAllByRole('button');

      triggers.forEach((trigger) => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(trigger).toHaveAttribute('aria-controls');
      });
    });
  });

  describe('Menu interactions', () => {
    it('shows dropdown content when menu trigger is clicked', async () => {
      render(<DesktopNav logo={mockLogo} />);

      const masculinoTrigger = screen.getByRole('button', { name: /masculino/i });

      // Initially, dropdown content should not be visible
      expect(screen.queryByText('Camisetas')).not.toBeInTheDocument();

      // Click the trigger
      fireEvent.click(masculinoTrigger);

      // Wait for dropdown content to appear
      await waitFor(() => {
        expect(screen.getByText('Camisetas')).toBeInTheDocument();
        expect(screen.getByText('Calças')).toBeInTheDocument();
        expect(screen.getByText('Tênis')).toBeInTheDocument();
        expect(screen.getByText('Cuecas')).toBeInTheDocument();
      });
    });

    it('renders dropdown menu items with correct links', async () => {
      render(<DesktopNav logo={mockLogo} />);

      const femininoTrigger = screen.getByRole('button', { name: /feminino/i });
      fireEvent.click(femininoTrigger);

      await waitFor(() => {
        const camisetasLink = screen.getByRole('link', { name: /camisetas/i });
        expect(camisetasLink).toHaveAttribute('href', '/women/t-shirts');

        const calcasLink = screen.getByRole('link', { name: /calças/i });
        expect(calcasLink).toHaveAttribute('href', '/women/pants');
      });
    });

    it('handles keyboard navigation correctly', async () => {
      render(<DesktopNav logo={mockLogo} />);

      const infantilTrigger = screen.getByRole('button', { name: /infantil/i });

      // Focus the trigger
      infantilTrigger.focus();
      expect(infantilTrigger).toHaveFocus();

      // Press Enter to open dropdown
      fireEvent.keyDown(infantilTrigger, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('Brinquedos')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive behavior', () => {
    it('has proper CSS classes for responsive layout', () => {
      render(<DesktopNav logo={mockLogo} />);

      const navigationContainer = screen.getByRole('navigation').parentElement;
      expect(navigationContainer).toHaveClass('flex items-center justify-self-center');
    });
  });

  describe('Menu structure validation', () => {
    it('validates all menu categories have proper structure', async () => {
      render(<DesktopNav logo={mockLogo} />);

      const menuCategories = [
        { trigger: 'Masculino', items: ['Camisetas', 'Calças', 'Tênis', 'Cuecas'] },
        { trigger: 'Feminino', items: ['Camisetas', 'Calças', 'Tênis', 'Bolsas'] },
        { trigger: 'Infantil', items: ['Camisetas', 'Calças', 'Tênis', 'Brinquedos'] },
        { trigger: 'Acessórios', items: ['Relógios', 'Óculos', 'Bolsas', 'Cintos'] },
        { trigger: 'Ofertas', items: ['Promoções', 'Liquidações', 'Últimas Unidades'] },
      ];

      for (const category of menuCategories) {
        const trigger = screen.getByRole('button', { name: new RegExp(category.trigger, 'i') });
        fireEvent.click(trigger);

        await waitFor(() => {
          category.items.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
          });
        });

        // Close the menu by clicking elsewhere or pressing Esc
        fireEvent.keyDown(trigger, { key: 'Escape', code: 'Escape' });
      }
    });
  });

  describe('Edge cases', () => {
    it('handles empty logo title gracefully', () => {
      const emptyTitleLogo = { url: '/', title: '' };
      render(<DesktopNav logo={emptyTitleLogo} />);

      expect(screen.getByTestId('store-icon')).toBeInTheDocument();
      // Should still render the link even with empty title
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('handles special characters in logo title', () => {
      const specialCharLogo = { url: '/', title: 'Store & Co. - 100% Awesome!' };
      render(<DesktopNav logo={specialCharLogo} />);

      expect(screen.getByText('Store & Co. - 100% Awesome!')).toBeInTheDocument();
    });
  });
});
