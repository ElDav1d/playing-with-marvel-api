import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewCheckboxesList from '../NewCheckboxesList';

it('has a titled group', () => {
  // ARRANGE
  render(
    <NewCheckboxesList
      title='Test Title'
      options={[]}
      optionLiterals={[]}
      setOptions={jest.fn()}
    />,
  );
  // ASSERT
  const titledGroup = screen.getByRole('group', { name: /title/i });
  expect(titledGroup).toBeInTheDocument();
});

it('renders the options as checkboxes', () => {
  // ARRANGE
  const options = ['Option 1', 'Option 2', 'Option 3'];

  render(
    <NewCheckboxesList
      title='Test Title'
      options={options}
      optionLiterals={[]}
      setOptions={jest.fn()}
    />,
  );

  // ASSERT

  options.forEach((option: string) => {
    expect(screen.getByRole('checkbox', { name: option })).toBeInTheDocument();
  });
});

it('calls setOptions with the selected options', async () => {
  // ARRANGE
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const setOptions = jest.fn();

  render(
    <NewCheckboxesList
      title='Test Title'
      options={options}
      optionLiterals={[]}
      setOptions={setOptions}
    />,
  );

  // ACT
  const user = userEvent.setup();

  const option1 = screen.getByRole('checkbox', { name: options[0] });
  user.click(option1);

  // ASSERT
  await waitFor(() => expect(setOptions).toHaveBeenCalledWith([options[0]]));

  // ACT
  const option2 = screen.getByRole('checkbox', { name: options[1] });
  user.click(option2);

  // ASSERT
  await waitFor(() => expect(setOptions).toHaveBeenCalledWith([options[1], options[0]]));
});
