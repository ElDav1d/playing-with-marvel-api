import Image from '@/components/atoms/Image';
import Container from '../Container';

export interface CharacterProps {
  name: string;
  description: string;
  thumbnailPath: string;
  thumbnailExtension: string;
}

const CharacterDetailHeroSection = ({
  name,
  description,
  thumbnailPath,
  thumbnailExtension,
}: CharacterProps) => {
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
