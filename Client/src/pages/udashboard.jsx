import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { KaryaDashboard } from 'src/sections/udashboard';

// ----------------------------------------------------------------------

export default function Karyapage() {
  return (
    <>
      <Helmet>
        <title> Sign Up | Political Saradhi </title>
      </Helmet>
      <KaryaDashboard />
    </>
  );
}
