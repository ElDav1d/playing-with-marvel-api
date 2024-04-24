import mockComic from '../mocks/mockComic.json';
import { render, screen } from '@testing-library/react';
import ComicsListItem, { IComicsListItemProps } from '../ComicsListItem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const comic: IComicsListItemProps = JSON.parse(JSON.stringify(mockComic));

it('renders a comic list item', () => {
  // ARRANGE
  render(
    <QueryClientProvider client={queryClient}>
      <ComicsListItem
        id={comic.id}
        images={comic.images}
        title={comic.title}
        description={comic.description}
      />
    </QueryClientProvider>,
  );

  // ASSERT
  screen.getByRole('listitem', { name: /hulk/i });
  screen.getByRole('heading', { name: /hulk/i });
});

it('matches snapshot', () => {
  // ARRANGE
  const { asFragment } = render(
    <QueryClientProvider client={queryClient}>
      <ComicsListItem
        id={comic.id}
        images={comic.images}
        title={comic.title}
        description={comic.description}
      />
    </QueryClientProvider>,
  );

  // ASSERT
  expect(asFragment()).toMatchSnapshot();
});
