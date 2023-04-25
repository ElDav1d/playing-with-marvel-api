/* eslint-disable @typescript-eslint/no-empty-function */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import Characters from '../Characters';

describe(Characters, () => {
  const queryClient = new QueryClient();

  it('renders a page of characters', () => {
    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Characters />
      </QueryClientProvider>,
    );

    // ASSERT
    expect(
      screen.getByRole('heading', { name: /this is the characters page/i }),
    ).toBeInTheDocument();
  });
});
