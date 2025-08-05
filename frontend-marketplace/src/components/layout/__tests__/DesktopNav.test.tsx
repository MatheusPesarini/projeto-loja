import { render, screen } from '@testing-library/react';
import { DesktopNav } from '../DesktopNav';

const mockLogo = {
  url: '/',
  title: 'Marketplace Store',
};

describe('DesktopNav', () => {
  it('renders logo correctly', () => {
    render(<DesktopNav logo={mockLogo} />);

    expect(screen.getByText('Marketplace Store')).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');

    expect(screen.getByTestId('store-icon')).toBeInTheDocument();
  });

  it('renders all navigation menu items', () => {
    render(<DesktopNav logo={mockLogo} />);

    expect(screen.getByText('Masculino')).toBeInTheDocument();
    expect(screen.getByText('Feminino')).toBeInTheDocument();
    expect(screen.getByText('Infantil')).toBeInTheDocument();
    expect(screen.getByText('Acessórios')).toBeInTheDocument();
    expect(screen.getByText('Ofertas')).toBeInTheDocument();
  });

  it('has proper navigation structure', () => {
    render(<DesktopNav logo={mockLogo} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
