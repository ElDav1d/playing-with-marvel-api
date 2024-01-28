export interface IContainerProps {
  children?: React.ReactNode;
  tag?: 'section' | 'main' | 'nav';
}

const Container = ({ children, tag }: IContainerProps) => {
  let Element: React.ElementType = 'section';
  let styles = 'mx-6 md:mx-12 lg:mx-18 xl:mx-auto max-w-[1240px]';

  switch (tag) {
    case 'nav':
      Element = 'nav';
      break;
    case 'main':
      Element = 'main';
      styles = styles.concat(' pb-48');
      break;
    default:
      break;
  }
  return <Element className={styles}>{children}</Element>;
};

export default Container;
