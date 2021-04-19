import { render, screen } from '@testing-library/react';
import Header from '../components/header/Header';

test('Header renders correctly', () => {
  render(<Header />);

  const headerEl = screen.getByTestId('header-title')
  expect(headerEl).toHaveClass('title')
  expect(headerEl).toBeInTheDocument()

  const logoEl = screen.getByTestId('header-logo')
  expect(logoEl).toBeInTheDocument()
});
