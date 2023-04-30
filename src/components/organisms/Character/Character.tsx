import Image from '@/components/atoms/Image/Image';

export interface CharaterProps {
  name: string;
  description: string;
  thumbnailPath: string;
  thumbnailExtension: string;
}

const Character = ({ name, description, thumbnailPath, thumbnailExtension }: CharaterProps) => {
  return (
    <>
      <h1>This is {name}</h1>
      <Image path={thumbnailPath} extension={thumbnailExtension} variant='landscape_incredible' />
      {description ? (
        <p>
          <strong>DESCRIPTION: </strong>
          {description}
        </p>
      ) : null}
    </>
  );
};

export default Character;
