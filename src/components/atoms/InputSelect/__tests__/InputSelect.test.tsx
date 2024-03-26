import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputSelect from '../InputSelect';

const mockOnChange = jest.fn();

document.title = 'Test Title';

it('renders the select with the correct options', async () => {
  // ARRANGE
  const passsedOptions = ['option1', 'option2'];
  const user = userEvent.setup();

  render(
    <InputSelect
      onChange={mockOnChange}
      options={passsedOptions}
      optionLiterals={passsedOptions}
    />,
  );

  // ACT
  const select = screen.getByRole('combobox');
  user.click(select);

  await waitFor(() => {
    const options = screen.getAllByRole('option');
    // ASSERT

    expect(options).toHaveLength(passsedOptions.length);

    options.forEach((option, index) => {
      expect(option).toHaveTextContent(passsedOptions[index]);
    });
  });
});

it('calls onChange when an option is selected', async () => {
  // ARRANGE
  const passsedOptions = ['option1', 'option2'];
  const user = userEvent.setup();

  render(
    <InputSelect
      onChange={mockOnChange}
      options={passsedOptions}
      optionLiterals={passsedOptions}
    />,
  );

  // ACT
  const select = screen.getByRole('combobox');
  user.click(select);

  await waitFor(() => {
    const option = screen.getByText(passsedOptions[1]);
    user.click(option);
  });

  // ASSERT
  await waitFor(() => {
    expect(mockOnChange).toHaveBeenCalledWith({
      target: { value: passsedOptions[1], name: 'order' },
    });
  });
});

it('prevents infinite calls when the same option is selected multiple times', async () => {
  // ARRANGE
  const passsedOptions = ['option1', 'option2'];
  const user = userEvent.setup();

  render(
    <InputSelect
      onChange={mockOnChange}
      options={passsedOptions}
      optionLiterals={passsedOptions}
    />,
  );

  // ACT
  const select = screen.getByRole('combobox');
  user.click(select);

  await waitFor(() => {
    const option = screen.getByText(passsedOptions[1]);
    user.click(option);
  });

  await waitFor(() => {
    const option = screen.getByText(passsedOptions[1]);
    user.click(option);
  });

  await waitFor(() => {
    const option = screen.getByText(passsedOptions[1]);
    user.click(option);
  });

  // ASSERT
  await waitFor(() => {
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
