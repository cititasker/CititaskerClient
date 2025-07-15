import { useMediaQuery } from 'react-responsive';

export function useScreenBreakpoints() {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });
  const isExtraLargeScreen = useMediaQuery({ query: '(min-width: 1280px)' });

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
  };
}
