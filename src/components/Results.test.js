import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Results from './Results';
import { GlobalProvider } from '../GlobalContext';

const renderComponent = (values = {}) =>
  render(
    <GlobalProvider {...values}>
      <Results />
    </GlobalProvider>
  );

const results = {
  change: [
    { title: '£20', total: 1 },
    { title: '£10', total: 1 },
    { title: '50p', total: 1 },
  ]
};

describe('Results', () => {
  beforeEach(() => {
    cleanup();
  });

  it('does not render if no results in context', () => {
    const mockContext = {
      results: [],
    };
    const { queryByTestId } = renderComponent(mockContext);
    expect(queryByTestId('results')).toBeFalsy();
  });

  it('renders the results', () => {
    const mockContext = {
      results,
    };
    const { asFragment } = renderComponent(mockContext);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders coming soon if json export in results', () => {
    const mockContext = {
      results: {
        ...results,
        jsonChange: []
      }
    }
    const { getByText } = renderComponent(mockContext);
    expect(getByText('Coming soon...')).toBeTruthy();
  })

});
