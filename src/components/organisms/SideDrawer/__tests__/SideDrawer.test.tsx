import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideDrawer from '../SideDrawer';

it('user cannot manipulate the content while the sidedrawer is open', async () => {
  // ARRANGE
  const user = userEvent.setup();

  render(
    <SideDrawer elementsToFocus='input'>
      <button>Child Button</button>
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
