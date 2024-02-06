import { VariantDescription } from '@/components/pages/CharacterDetail/interfaces/characterComics';
import { render, screen } from '@testing-library/react';
import Image, { picVariant } from '../Image';

describe.only('ImageComponent', () => {
  it('renders being accessible', () => {
    // ARRANGE
    const TITLE = 'Spiderman';
    const ALT = 'The pic of Spiderman';
    const PATH = 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b';
    const EXTENSION = 'jpg';
    const VARIANT = 'standard_xlarge';

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
    const VARIANT = 'standard_xlarge';

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
    const VARIANTS: picVariant[] = ['standard_fantastic', 'standard_fantastic'];

    // ACT
    render(<Image title={TITLE} alt={ALT} path={PATH} extension={EXTENSION} sizing={VARIANTS} />);
    const img = screen.getByRole('img', { name: /the pic of spiderman/i });

    // ASSERT
    expect(img.getAttribute('src')).not.toEqual(img.getAttribute('srcset'));
    expect(img.getAttribute('srcset')).toEqual('');
  });
});
