import { render, screen } from '@testing-library/react';
import AddLink from '../components/addLink/AddLink';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('AddLink renders correctly', () => {
  const history = createMemoryHistory()

  render(
    <Router history={history}>
      <AddLink />
    </Router>
  )
  const submitEl = screen.getByTestId('submit-button')
  expect(submitEl).toBeInTheDocument()
  expect(submitEl).toBeEnabled()

  const returnEl = screen.getByTestId('return-button')
  expect(returnEl).toBeInTheDocument()
  expect(returnEl).toBeEnabled()

  const titleEl = screen.getByTestId('title')
  expect(titleEl).toBeInTheDocument()
  expect(titleEl).toHaveTextContent('Add New Link')
});
