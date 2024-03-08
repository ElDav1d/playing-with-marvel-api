import { render, screen } from '@testing-library/react';
import Image, { PicVariantName } from '../Image';

jest.mock('react-lazy-load-image-component', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  LazyLoadImage: ({ placeholderSrc, wrapperClassName, ...props }: any) => <img alt='' {...props} />,
}));

it('renders being accessible', () => {
  // ARRANGE
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName = 'standard_xlarge';

  // ACT
  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);

  // ASSERT
  expect(screen.getByRole('img', { name: /the pic of spiderman/i })).toBeInTheDocument();
});

it('provides appropiate pic info to screenreaders', () => {
  // ARRANGE
  const TITLE = 'Aaron Stack';
  const ALT = 'The pic of Aaron Stack';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName = 'standard_xlarge';

  // ACT
  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);

  // ASSERT
  expect(screen.getByRole('img', { name: /is not available/i })).toBeInTheDocument();
});

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
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANTS: PicVariantName[] = ['standard_fantastic', 'standard_xlarge'];

  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANTS} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  expect(img.getAttribute('srcset')).toEqual(
    `${PATH}/standard_xlarge.${EXTENSION} 200w, ${PATH}/standard_fantastic.${EXTENSION} 250w`,
  );
});

it('does not render srcset with single size or string', () => {
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName = 'standard_xlarge';

  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  expect(img.getAttribute('srcset')).toBeNull();
});

it('outputs src of the biggest image when multiple sizes are provided', () => {
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
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName = 'standard_xlarge';

  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  expect(img.getAttribute('src')).toEqual(`${PATH}/standard_xlarge.${EXTENSION}`);
});

it('outputs src of the image when only single size is provided inside a collection', () => {
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName[] = ['standard_xlarge'];

  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  expect(img.getAttribute('src')).toEqual(`${PATH}/standard_xlarge.${EXTENSION}`);
});

it('does not set sizes attribute when sizing is a single size', () => {
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANT: PicVariantName = 'standard_xlarge';

  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANT} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  expect(img.getAttribute('sizes')).toBeNull();
});

it('correctly sets sizes attribute when sizing is an array with 2 unique sizes', () => {
  const TITLE = 'Spiderman';
  const ALT = 'The pic of Spiderman';
  const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
  const EXTENSION = 'jpg';
  const VARIANTS: PicVariantName[] = ['standard_xlarge', 'standard_fantastic'];

  render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANTS} />);
  const img = screen.getByRole('img', { name: /the pic of spiderman/i });

  expect(img.getAttribute('sizes')).toEqual('(max-width: 768px) 200px, 250px');
});
