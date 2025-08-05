import { formatPrice } from '../product';

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    it('formats valid number prices correctly', () => {
      expect(formatPrice(29.99)).toBe('29,99');
      expect(formatPrice(1234.56)).toBe('1.234,56');
      expect(formatPrice(0)).toBe('0,00');
      expect(formatPrice(999)).toBe('999,00');
    });

    it('formats string prices correctly', () => {
      expect(formatPrice('29.99')).toBe('29,99');
      expect(formatPrice('1234.56')).toBe('1.234,56');
      expect(formatPrice('0')).toBe('0,00');
      expect(formatPrice('999')).toBe('999,00');
    });

    it('handles null and undefined values', () => {
      expect(formatPrice(null)).toBe('0,00');
      expect(formatPrice(undefined)).toBe('0,00');
    });

    it('handles invalid string values', () => {
      expect(formatPrice('')).toBe('0,00');
      expect(formatPrice('invalid')).toBe('0,00');
      expect(formatPrice('abc123')).toBe('0,00');
    });

    it('handles edge cases', () => {
      expect(formatPrice(0.01)).toBe('0,01');
      expect(formatPrice(0.1)).toBe('0,10');
      expect(formatPrice(999999.99)).toBe('999.999,99');
    });

    it('handles negative numbers', () => {
      expect(formatPrice(-29.99)).toBe('0,00'); // Assuming negative prices should default to 0
    });

    it('handles very large numbers', () => {
      expect(formatPrice(1000000)).toBe('1.000.000,00');
      expect(formatPrice(1234567.89)).toBe('1.234.567,89');
    });

    it('handles floating point precision issues', () => {
      expect(formatPrice(29.999)).toBe('29,99'); // Should round to 2 decimal places
      expect(formatPrice(29.995)).toBe('29,99'); // Should round down
      expect(formatPrice(29.996)).toBe('30,00'); // Should round up
    });
  });
});
