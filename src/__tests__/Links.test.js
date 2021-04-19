import { render, screen } from '@testing-library/react';
import Links from '../components/links/Links';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('Links renders correctly', () => {
  const history = createMemoryHistory()

  render(
    <Router history={history}>
      <Links />
    </Router>
  )

  const newLinkEl = screen.getByTestId('submit-link-button')
  expect(newLinkEl).toHaveClass('submit-link-button')
  expect(newLinkEl).toBeInTheDocument()
  expect(newLinkEl).toBeEnabled()

  const sortEl = screen.getByTestId('sort-element')
  expect(sortEl).toBeInTheDocument()

});
