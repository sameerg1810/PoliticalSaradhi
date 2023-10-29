import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { SignupView } from 'src/sections/signup';

// ----------------------------------------------------------------------

export default function SignupPage() {
  return (
    <>
      <Helmet>
        <title> Sign Up | Political Saradhi </title>
      </Helmet>
      <SignupView />
    </>
  );
}
