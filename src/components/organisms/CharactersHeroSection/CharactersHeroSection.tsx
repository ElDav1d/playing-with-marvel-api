import Container from '@/components/organisms/Container';
import { ReactNode } from 'react';

const CharactersHeroSection = ({ children }: { children: ReactNode }) => (
  <section
    className='relative z-0 flex flex-col items-center justify-around gap-2 min-h-52 md:min-h-72 mb-4 bg-black bg-hero-image bg-center bg-cover
        before:absolute before:content[""] before:h-full before:w-full  before:bg-gradient-to-b before:from-trans-0.75-black before:from-50% before:left-0 before:top-0 before:z-[-1]'
  >
    <Container element={'div'} className='flex flex-col gap-4'>
      <div className='w-full text-white text-center'>
        <h2 className='text-2xl md:text-3xl font-semibold text-white text-center uppercase mb-1'>
          Marvel Characters
        </h2>
        <p className='text-sm md:text-base text-center'>
          Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!
        </p>
      </div>
      {children}
    </Container>
  </section>
);

export default CharactersHeroSection;
