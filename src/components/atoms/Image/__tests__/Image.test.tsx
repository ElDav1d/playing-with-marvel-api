import { render, screen } from '@testing-library/react';
import Image, { PicVariantName } from '../Image';

jest.mock('react-lazy-load-image-component', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  LazyLoadImage: ({ placeholderSrc, wrapperClassName, ...props }: any) => <img alt='' {...props} />,
}));

it('only does art direction with unique elements', () => {
  // ARRANGE
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANTS: PicVariantName[] = ['standard_fantastic', 'standard_fantastic'];

  // ACT
  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANTS} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  // ASSERT
  expect(img.getAttribute('src')).not.toEqual(img.getAttribute('srcset'));
  expect(img.getAttribute('srcset')).toEqual(null);
});

it('renders srcset with size ordered multiple unique sizes', () => {
  // ARRANGE
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANTS: PicVariantName[] = ['standard_fantastic', 'standard_xlarge'];

  // ACT
  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANTS} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  // ASSERT
  expect(img.getAttribute('srcset')).toEqual(
    `${PATH}/standard_xlarge.${EXTENSION} 200w, ${PATH}/standard_fantastic.${EXTENSION} 250w`,
  );
});

it('does not render srcset with single size or string', () => {
  // ARRANGE
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName = 'standard_xlarge';

  // ACT
  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  // ASSERT
  expect(img.getAttribute('srcset')).toBeNull();
});

it('outputs src of the biggest image when multiple sizes are provided', () => {
  // ARRANGE
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANTS: PicVariantName[] = ['standard_xlarge', 'standard_fantastic'];

  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANTS} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  expect(img.getAttribute('src')).toEqual(`${PATH}/standard_fantastic.${EXTENSION}`);
});

it('outputs src of the image when single size is provided', () => {
  // ARRANGE
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName = 'standard_xlarge';

  // ACT
  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  // ASSERT
  expect(img.getAttribute('src')).toEqual(`${PATH}/standard_xlarge.${EXTENSION}`);
});

it('outputs src of the image when only single size is provided inside a collection', () => {
  // ARRANGE
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName[] = ['standard_xlarge'];

  // ACT
  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  // ASSERT
  expect(img.getAttribute('src')).toEqual(`${PATH}/standard_xlarge.${EXTENSION}`);
});

it('does not set sizes attribute when sizing is a single size', () => {
  // ARRANGE
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName = 'standard_xlarge';

  // ACT
  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  // ASSERT
  expect(img.getAttribute('sizes')).toBeNull();
});

it('correctly sets sizes attribute when sizing is an array with 2 unique sizes', () => {
  // ARRANGE
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANTS: PicVariantName[] = ['standard_xlarge', 'standard_fantastic'];

  // ACT
  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANTS} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  // ASSERT
  expect(img.getAttribute('sizes')).toEqual('(max-width: 768px) 200px, 250px');
});
