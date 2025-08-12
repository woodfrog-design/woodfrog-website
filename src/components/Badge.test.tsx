
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge component', () => {
  test('renders with the correct text', () => {
    const testText = 'Test Badge';
    render(<Badge text={testText} />);
    const badgeElement = screen.getByText(testText);
    expect(badgeElement).toBeInTheDocument();
  });
});
