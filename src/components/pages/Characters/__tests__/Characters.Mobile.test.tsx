/* eslint-disable @typescript-eslint/no-empty-function */
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, within } from '@testing-library/react';
import { useCharacters } from '../hooks';
import Characters from '../Characters';
import userEvent from '@testing-library/user-event';
import customRender from '../utils';
import { setUpHappyPathWithUser } from '../utils/testHelpers';

jest.mock('../hooks');

const mockUseCharacters = useCharacters as jest.Mock;

const queryClient = new QueryClient();

jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: () => null,
}));

document.title = 'Test Title';

it('renders the page of characters with the Mobile Characters List Control Panel and matches snapshot', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  const { asFragment } = render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  await waitFor(() => screen.getByRole('form', { name: /mobile/i }));

  // ASSERT
  expect(asFragment()).toMatchSnapshot();
});

it('opens the Mobile Characters List Control Panel', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  customRender(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
    { width: 500 },
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  // ASSERT
  await waitFor(() => {
    const mobilePanel = screen.getByRole('form', { name: /mobile/i });
    expect(mobilePanel).toBeInTheDocument();
  });
});

it('closes the Mobile Characters List Control Panel', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  customRender(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
    { width: 500 },
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  await waitFor(() => {
    const closeButton = screen.getByRole('button', { name: /close/i });

    userEvent.click(closeButton);
  });

  // ASSERT
  await waitFor(() => {
    expect(screen.queryByRole('form', { name: /mobile/i })).toBeNull();
  });
});

it('fetches a new list of characters after typing on search by name input', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // TODO: optmise calls
  // At SearchGroup
  // Or avoiding desktop form render
  const DESKTOP_HOOK_CALLS = 1;
  const MOBILE_HOOK_CALLS = 1;
  const INITIAL_HOOK_CALLS = DESKTOP_HOOK_CALLS + MOBILE_HOOK_CALLS;

  // ACT
  customRender(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
    { width: 500 },
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  await waitFor(() => {
    const mobilePanel = screen.getByRole('form', { name: /mobile/i });

    const searchInputGroup = within(mobilePanel).getByRole('group', { name: /search/i });

    const searchInputElement = within(searchInputGroup).getByPlaceholderText(/name/i);

    userEvent.type(searchInputElement, 'X');
  });

  // ASSERT
  await waitFor(() => {
    expect(mockUseCharacters).toHaveBeenCalledTimes(INITIAL_HOOK_CALLS + 1);
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
  });
});

it('fetches a new list of characters after selecting an order option', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // TODO: optmise calls
  // At SearchGroup
  // Or avoiding CharactersControlPanel isDesktop
  const DESKTOP_HOOK_CALLS = 1;
  const MOBILE_HOOK_CALLS = 1;
  const INITIAL_HOOK_CALLS = DESKTOP_HOOK_CALLS + MOBILE_HOOK_CALLS;

  // ACT
  customRender(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
    { width: 500 },
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  await waitFor(() => {
    const mobilePanel = screen.getByRole('form', { name: /mobile/i });
    const selectGroup = within(mobilePanel).getByRole('group', { name: /order/i });
    const selectInput = within(selectGroup).getByRole('combobox');

    user.click(selectInput);
  });

  await waitFor(() => {
    // reordering not happening because items are mocked
    const selecOptionNameAZ = screen.getByRole('option', { name: /(a\/z)+/i });

    user.click(selecOptionNameAZ);
  });

  // ASSERT
  await waitFor(() => {
    expect(mockUseCharacters).toHaveBeenCalledTimes(INITIAL_HOOK_CALLS + 1);
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
  });
});

it('renders an filter input group with its required checkboxes', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  customRender(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
    { width: 500 },
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  await waitFor(() => {
    const mobilePanel = screen.getByRole('form', { name: /mobile/i });

    const checkInputGroup = within(mobilePanel).getByRole('group', { name: /filter/i });
    const checkWithImage = within(mobilePanel).getByRole('checkbox', { name: /(image)+/i });
    const checkWithDescription = within(mobilePanel).getByRole('checkbox', {
      name: /(description)+/i,
    });

    // ASSERT
    expect(checkInputGroup).toBeInTheDocument();
    expect(checkWithImage).toBeInTheDocument();
    expect(checkWithDescription).toBeInTheDocument();
  });
});

it('renders a characters with image list when the image filter is checked', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  customRender(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
    { width: 500 },
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  await waitFor(() => {
    const mobilePanel = screen.getByRole('form', { name: /mobile/i });

    const checkInputGroup = within(mobilePanel).getByRole('group', { name: /filter/i });

    const checkWithImage = within(checkInputGroup).getByRole('checkbox', { name: /(image)+/i });

    user.click(checkWithImage);
  });

  // ASSERT
  await waitFor(() => {
    expect(screen.queryByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /crusher/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /braineater/i })).toBeNull();
  });
});

it('renders a characters with description list when the description filter is checked', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  customRender(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
    { width: 500 },
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  await waitFor(() => {
    const mobilePanel = screen.getByRole('form', { name: /mobile/i });

    const checkInputGroup = within(mobilePanel).getByRole('group', { name: /filter/i });

    const checkWithDescription = within(checkInputGroup).getByRole('checkbox', {
      name: /(description)+/i,
    });

    user.click(checkWithDescription);
  });

  // ASSERT
  await waitFor(() => {
    expect(screen.queryByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /braineater/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /crusher/i })).toBeNull();
  });
});

it('keeps rendering a filtered characters list after selecting an order option', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  customRender(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
    { width: 500 },
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  await waitFor(() => {
    const mobilePanel = screen.getByRole('form', { name: /mobile/i });
    const checkInputGroup = within(mobilePanel).getByRole('group', { name: /filter/i });
    const checkWithImage = within(checkInputGroup).getByRole('checkbox', { name: /(image)+/i });

    user.click(checkWithImage);

    const selectGroup = within(mobilePanel).getByRole('group', { name: /order/i });
    const selectInput = within(selectGroup).getByRole('combobox');

    user.click(selectInput);
  });

  await waitFor(() => {
    // reordering not happening because items are mocked
    const selecOptionNameAZ = screen.getByRole('option', { name: /(a\/z)+/i });

    user.click(selecOptionNameAZ);
  });

  // ASSERT
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /crusher/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /braineater/i })).toBeNull();
  });
});

it('renders the complete characters list after unchecking a filter', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  await waitFor(() => {
    const checkWithImage = screen.getByRole('checkbox', { name: /(image)+/i });

    user.click(checkWithImage);
  });

  // ASSERT
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /crusher/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /destructor/i })).toBeInTheDocument();
  });
});
