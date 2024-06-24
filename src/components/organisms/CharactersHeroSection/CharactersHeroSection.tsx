import { CharactersControlPanelInfo } from '@/components/molecules/CharactersControlPanelInfo';
import Container from '@/components/organisms/Container';
import { useMediaQuery } from '@/hooks';
import { HERO_PARAGRAPH_LITERAL, HERO_TITLE_LITERAL, MEDIA_BREAKPOINTS } from '@/utils/constants';
import CharactersControlPanel from '../CharactersControlPanel';

const CharactersHeroSection = () => {
  const isDesktop = useMediaQuery(`(min-width: ${MEDIA_BREAKPOINTS.MD}px)`);

  return (
    <section
      className='relative flex flex-col items-center justify-around pt-logoDefaultHeight gap-2 min-h-64 md:min-h-96 lg:min-h-72 mb-4 bg-black bg-hero-image bg-center bg-cover
    before:absolute before:content[""] before:bg-gradient-to-b before:from-trans-0.5-black before:from-50% before:left-0 before:top-0 before:z-[-1]'
    >
      <Container element='div' className='my-4 lg:w-2/3 flex flex-col gap-4'>
        <div className='text-white text-center'>
          <h2 className='text-2xl md:text-3xl font-semibold text-white text-center uppercase mb-1'>
            {HERO_TITLE_LITERAL}
          </h2>
          <p className='text-sm md:text-base text-center'>{HERO_PARAGRAPH_LITERAL}</p>
        </div>
        {isDesktop && <CharactersControlPanel isDesktop />}
        <CharactersControlPanelInfo />
      </Container>
    </section>
  );
};

export default CharactersHeroSection;
