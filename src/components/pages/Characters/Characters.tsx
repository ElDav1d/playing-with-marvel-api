import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import { MEDIA_BREAKPOINTS } from '@/utils/constants';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Container from '@/components/organisms/Container';
import {} from 'react-spinners';
import SideDrawer from '@/components/organisms/SideDrawer';
import CharactersControlPanel from '@/components/organisms/CharactersControlPanel';
import { CharactersHeroSection } from '@/components/organisms/CharactersHeroSection';
import { useMediaQuery } from '@/hooks';
import { CharactersProvider } from './context';

const Characters = () => {
  const isDesktop = useMediaQuery(`(min-width: ${MEDIA_BREAKPOINTS.MD}px)`);

  return (
    <CharactersProvider>
      <Header>
        {!isDesktop && (
          <SideDrawer elementsToFocus='input, button' classNameContainer='bg-black'>
            <CharactersControlPanel />
          </SideDrawer>
        )}
      </Header>
      <Container element={'main'} aria-label='characters page main content'>
        <CharactersHeroSection />
        <Container>
          <CharactersList />
        </Container>
      </Container>
      <Footer />
    </CharactersProvider>
  );
};

export default Characters;
