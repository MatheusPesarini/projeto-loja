import { render, screen } from '@testing-library/react';

// Mock simples para testar o setup
const SimpleComponent = () => {
  return <div data-testid="simple-component">Hello Test</div>;
};

describe('Jest Setup', () => {
  it('should render a simple component', () => {
    render(<SimpleComponent />);
    const element = screen.getByTestId('simple-component');
    expect(element).toBeTruthy();
    expect(element.textContent).toBe('Hello Test');
  });
});
