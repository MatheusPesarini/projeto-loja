import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Product } from '@/lib/types/definitions';
import ProductCardComponent from '../ProductCard';

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    fill,
    ...props
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    [key: string]: unknown;
  }) {
    return (
      <div data-testid="mock-image" data-src={src} data-alt={alt} data-fill={fill} {...props} />
    );
  };
});

const mockProduct: Product = {
  id: '1',
  productName: 'Camiseta Teste',
  originalPrice: 29.99,
  discountedPrice: 19.99,
  discount: '33',
  genre: 'unisex',
  warranty: '1 ano',
  description: 'Uma camiseta de teste',
  weight: '200g',
  brand: 'Marca Teste',
  category: 'clothing',
  quantity: 10,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  image: '/test-image.jpg',
};

const outOfStockProduct: Product = {
  ...mockProduct,
  id: '2',
  productName: 'Produto Esgotado',
  quantity: 0,
};

const noDiscountProduct: Product = {
  ...mockProduct,
  id: '3',
  productName: 'Produto Sem Desconto',
  discountedPrice: 0,
  discount: undefined,
};

describe('ProductCard', () => {
  describe('Basic rendering', () => {
    it('renders product information correctly', () => {
      render(<ProductCardComponent product={mockProduct} />);

      expect(screen.getByText('Camiseta Teste')).toBeInTheDocument();
      expect(screen.getByText('MARCA TESTE')).toBeInTheDocument();
      expect(screen.getByText('R$ 19,99')).toBeInTheDocument();
      expect(screen.getByText('R$ 29,99')).toBeInTheDocument();
      expect(screen.getByText('33% OFF')).toBeInTheDocument();
    });

    it('renders product image with correct attributes', () => {
      render(<ProductCardComponent product={mockProduct} />);

      const image = screen.getByTestId('mock-image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('data-src', '/test-image.jpg');
      expect(image).toHaveAttribute('data-fill', 'true');
    });

    it('renders product link with correct href', () => {
      render(<ProductCardComponent product={mockProduct} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/product/1');
    });
  });

  describe('Discount handling', () => {
    it('shows discount badge when product has discount', () => {
      render(<ProductCardComponent product={mockProduct} />);

      const discountBadge = screen.getByText('33% OFF');
      expect(discountBadge).toBeInTheDocument();
      expect(discountBadge).toHaveClass('absolute top-2 right-2 z-10');
    });

    it('does not show discount badge when product has no discount', () => {
      render(<ProductCardComponent product={noDiscountProduct} />);

      expect(screen.queryByText(/% OFF/)).not.toBeInTheDocument();
    });

    it('shows original and discounted prices correctly', () => {
      render(<ProductCardComponent product={mockProduct} />);

      // Discounted price should be more prominent
      expect(screen.getByText('R$ 19,99')).toBeInTheDocument();
      // Original price should be crossed out
      expect(screen.getByText('R$ 29,99')).toBeInTheDocument();
    });
  });

  describe('Stock management', () => {
    it('shows out of stock overlay when quantity is 0', () => {
      render(<ProductCardComponent product={outOfStockProduct} />);

      expect(screen.getByText('Esgotado')).toBeInTheDocument();

      // Check if overlay is properly positioned
      const overlay = screen.getByText('Esgotado').closest('div');
      expect(overlay).toHaveClass(
        'absolute inset-0 bg-black/50 flex items-center justify-center z-10'
      );
    });

    it('does not show out of stock overlay when quantity > 0', () => {
      render(<ProductCardComponent product={mockProduct} />);

      expect(screen.queryByText('Esgotado')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<ProductCardComponent product={mockProduct} variant="default" />);

      const card = screen.getByText('Camiseta Teste').closest('.group');
      expect(card).toHaveClass('group overflow-hidden hover:shadow-lg transition-all duration-300');
    });

    it('applies carousel variant classes', () => {
      render(<ProductCardComponent product={mockProduct} variant="carousel" />);

      const card = screen.getByText('Camiseta Teste').closest('.group');
      expect(card).toHaveClass('group overflow-hidden hover:shadow-md transition-all duration-200');
    });

    it('applies grid variant classes', () => {
      render(<ProductCardComponent product={mockProduct} variant="grid" />);

      const card = screen.getByText('Camiseta Teste').closest('.group');
      expect(card).toHaveClass(
        'group overflow-hidden hover:shadow-2xl transition-all duration-300'
      );
    });

    it('applies featured variant classes', () => {
      render(<ProductCardComponent product={mockProduct} variant="featured" />);

      const card = screen.getByText('Camiseta Teste').closest('.group');
      expect(card).toHaveClass(
        'group overflow-hidden hover:shadow-2xl transition-all duration-300'
      );
    });

    it('applies custom className when provided', () => {
      render(<ProductCardComponent product={mockProduct} className="custom-class" />);

      const card = screen.getByText('Camiseta Teste').closest('.custom-class');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Brand display', () => {
    it('shows brand when available', () => {
      render(<ProductCardComponent product={mockProduct} />);

      expect(screen.getByText('MARCA TESTE')).toBeInTheDocument();
    });
  });

  describe('Image fallback', () => {
    it('uses placeholder image when product image is not provided', () => {
      const productWithoutImage = { ...mockProduct, image: '' };
      render(<ProductCardComponent product={productWithoutImage} />);

      const image = screen.getByTestId('mock-image');
      expect(image).toHaveAttribute('data-src', '/placeholder-image.jpg');
    });
  });

  describe('Price formatting', () => {
    it('formats prices correctly for Brazilian currency', () => {
      const productWithDifferentPrice = {
        ...mockProduct,
        originalPrice: 1234.56,
        discountedPrice: 999.99,
      };

      render(<ProductCardComponent product={productWithDifferentPrice} />);

      expect(screen.getByText('R$ 999,99')).toBeInTheDocument();
      expect(screen.getByText('R$ 1.234,56')).toBeInTheDocument();
    });

    it('handles zero prices correctly', () => {
      const freeProduct = {
        ...mockProduct,
        originalPrice: 0,
        discountedPrice: 0,
        discount: undefined,
      };

      render(<ProductCardComponent product={freeProduct} />);

      expect(screen.getByText('R$ 0,00')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text for product image', () => {
      render(<ProductCardComponent product={mockProduct} />);

      const image = screen.getByTestId('mock-image');
      expect(image).toHaveAttribute('data-alt', 'Camiseta Teste');
    });

    it('has accessible link to product page', () => {
      render(<ProductCardComponent product={mockProduct} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/product/1');
    });
  });
});
