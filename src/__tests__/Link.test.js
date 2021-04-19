import { render, screen } from '@testing-library/react';
import Link from '../components/link/Link';

test('Link renders correctly', () => {
  render(<Link />);

  const removeButtonEl = screen.getByTestId('remove-button')  
  expect(removeButtonEl).toBeInTheDocument()
  
  const linkVotesEl = screen.getByTestId('link-votes')
  expect(linkVotesEl).toBeInTheDocument()
  expect(linkVotesEl).toBeVisible()

  const linkContentEl = screen.getByTestId('link-content')
  expect(linkContentEl).toBeInTheDocument()
  expect(linkContentEl).toBeVisible()
});
