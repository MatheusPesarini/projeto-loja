declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(className: string): R;
    toHaveAttribute(attribute: string, value?: string): R;
    toBeVisible(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toHaveValue(value: string | number): R;
    toHaveTextContent(text: string | RegExp): R;
    toBeChecked(): R;
    toHaveFocus(): R;
  }
}
