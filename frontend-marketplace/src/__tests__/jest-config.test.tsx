import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Jest Configuration Test', () => {
  it('should render a simple component', () => {
    const TestComponent = () => <div>Hello Jest!</div>

    render(<TestComponent />)

    expect(screen.getByText('Hello Jest!')).toBeInTheDocument()
  })

  it('should handle basic JavaScript operations', () => {
    const sum = (a: number, b: number) => a + b

    expect(sum(2, 3)).toBe(5)
  })

  it('should work with async operations', async () => {
    const asyncFunction = () => Promise.resolve('Success!')

    const result = await asyncFunction()

    expect(result).toBe('Success!')
  })
})
