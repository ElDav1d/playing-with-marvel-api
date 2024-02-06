/**
 * @interface IContainerProps
 */
export interface IContainerProps {
  /**
   * @property
   * HTML Element to be rendered
   * default is <section>
   */
  element?: 'section' | 'main' | 'nav' | 'div';
  /**
   * @property
   * extra CSS selectors
   */
  className?: string;
  children?: React.ReactNode;
}

const Container = ({ element, className, children }: IContainerProps) => {
  let Element: React.ElementType = 'section';
  let styles = 'mx-6 md:mx-12 lg:mx-18 xl:mx-auto max-w-[1240px]';

  switch (element) {
    case 'main':
      Element = 'main';
      styles = 'pb-48 min-h-[100vh]';
      break;
    case 'nav':
      Element = 'nav';
      break;
    case 'div':
      Element = 'div';
      break;
    default:
      break;
  }

  if (className) styles = `${styles} ${className}`;

  return <Element className={styles}>{children}</Element>;
};

export default Container;
