import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideDrawer from '../SideDrawer';

it('renders a button that opens the sidedrawer', () => {
  // ARRANGE
  render(
    <SideDrawer elementsToFocus='input'>
      <div />
    </SideDrawer>,
  );

  // ACT
  const openButton = screen.getByRole('button', { name: /open/i });

  // ASSERT
  expect(openButton).toBeInTheDocument();
});

it('user cannot manipulate the content while the sidedrawer is open', async () => {
  // ARRANGE
  const user = userEvent.setup();

  render(
    <SideDrawer elementsToFocus='input'>
      <div />
    </SideDrawer>,
  );

  // ACT
  const openButton = screen.getByRole('button', { name: /open/i });
  user.click(openButton);

  await waitFor(() => {
    // ASSERT
    expect(screen.queryByTestId('dialog-overlay')).toBeInTheDocument();
  });
});

it('user can close the sidedrawer', async () => {
  // ARRANGE
  const user = userEvent.setup();

  render(
    <SideDrawer elementsToFocus='input'>
      <div />
    </SideDrawer>,
  );

  // ACT
  const openButton = screen.getByRole('button', { name: /open/i });
  user.click(openButton);

  await waitFor(() => {
    const closeButton = screen.getByRole('button', { name: /close/i });
    user.click(closeButton);
  });

  // ASSERT
  await waitFor(() => {
    expect(screen.queryByTestId('dialog-overlay')).not.toBeInTheDocument();
  });
});
