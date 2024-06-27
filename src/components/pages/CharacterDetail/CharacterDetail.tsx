import { useParams } from 'react-router-dom';
import { Loader } from 'eldav1d-marvel-ui';
import { useCharacterDetails } from './hooks';
import CharacterDetailHeroSection from '@/components/organisms/CharacterDetailHeroSection/CharacterDetailHeroSection';
import { CHARACTER_DETAILS_LOADING_LABEL_LITERAL } from '@/utils/constants';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Container from '@/components/organisms/Container';

import { CharacterComicList } from '@/components/organisms/CharacterComicList';

const CharacterDetail = () => {
  const { id } = useParams();

  const { isLoadingCharacter, isErrorOnCharacter, character } = useCharacterDetails({
    characterId: id,
  });

  return (
    <>
      <Header />
      <Container element={'main'} aria-label='character detail main content'>
        {isErrorOnCharacter && <h2>Ooops, try refreshing your browser</h2>}

        {isLoadingCharacter && <Loader loadingLabel={CHARACTER_DETAILS_LOADING_LABEL_LITERAL} />}

        {character && (
          <article aria-label='character detail article'>
            {character && (
              <CharacterDetailHeroSection
                name={character.name}
                description={character.description}
                thumbnailPath={character.thumbnail.path}
                thumbnailExtension={character.thumbnail.extension}
              />
            )}

            <Container element='section'>
              <CharacterComicList characterId={id} characterName={character.name} />
            </Container>
          </article>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default CharacterDetail;
