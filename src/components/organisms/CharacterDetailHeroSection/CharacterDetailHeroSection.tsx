import Image from '@/components/atoms/Image';
import Container from '../Container';

/**
 * @interface ICharacterDetailHeroSection
 * Interface for the character detail hero section
 */
export interface ICharacterDetailHeroSection {
  /**
   * @property {string}
   * The name of the character
   */
  name: string;
  /**
   * @property {string}
   * The description of the character
   */
  description: string;
  /**
   * @property {string}
   * The path to the thumbnail image of the character
   */
  thumbnailPath: string;
  /**
   * @property {string}
   * The file extension of the thumbnail image
   */
  thumbnailExtension: string;
}

const CharacterDetailHeroSection = ({
  name,
  description,
  thumbnailPath,
  thumbnailExtension,
}: ICharacterDetailHeroSection) => {
  return (
    <section className='relative mt-logoDefaultHeight bg-stone-900 text-white clip-hero'>
      <Image
        title={name}
        alt={`The big pic of ${name}`}
        path={thumbnailPath}
        extension={thumbnailExtension}
        sizing={['landscape_amazing', 'landscape_incredible']}
      />
      <Container element='div' className='py-14'>
        <h1 className='text-2xl uppercase font-semibold mb-4'>{name}</h1>
        {description && <p>{description}</p>}
      </Container>
    </section>
  );
};

export default CharacterDetailHeroSection;
