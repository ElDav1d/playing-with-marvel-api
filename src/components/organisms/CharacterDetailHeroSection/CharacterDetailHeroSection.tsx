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
    <section
      className='relative lg:h-[65vh] overflow-hidden pt-logoDefaultHeight bg-stone-900 text-white clip-hero
      md:before:absolute md:before:inset-0 md:before:content[""] md:before:bg-gradient-to-r md:before:from-trans-0.75-black md:before:to-transparent md:before:z-1'
    >
      <Image
        classNameContainer='md:block: md:h-full'
        classNameContent='h-full object-cover'
        title={name}
        alt={`The big pic of ${name}`}
        path={thumbnailPath}
        extension={thumbnailExtension}
        sizing={['landscape_amazing', 'landscape_incredible']}
      />
      <div className='w-full h-full flex flex-col justify-center py-14 md:py-0 md:absolute md:top-0 md:left-0 md:z-10'>
        <Container element='div'>
          <h1 className='text-2xl uppercase font-semibold mb-4'>{name}</h1>
          {description && <p>{description}</p>}
        </Container>
      </div>
    </section>
  );
};

export default CharacterDetailHeroSection;
