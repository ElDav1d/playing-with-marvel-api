import Image from '@/components/atoms/Image';

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
    <section>
      <h1>This is {name}</h1>
      <Image
        title={name}
        alt={`The big pic of ${name}`}
        path={thumbnailPath}
        extension={thumbnailExtension}
        sizing='landscape_incredible'
      />
      {description ? (
        <p>
          <strong>DESCRIPTION: </strong>
          {description}
        </p>
      ) : null}
    </section>
  );
};

export default CharacterDetailHeroSection;
