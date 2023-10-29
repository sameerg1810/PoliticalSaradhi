/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-unresolved
import 'src/global.css';

// eslint-disable-next-line import/no-unresolved
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

// eslint-disable-next-line import/no-unresolved
import Router from 'src/routes/sections';
// eslint-disable-next-line import/no-unresolved
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
