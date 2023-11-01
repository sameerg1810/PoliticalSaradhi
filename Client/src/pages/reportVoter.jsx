import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { ReportVoter } from 'src/sections/Report-voter';

// ----------------------------------------------------------------------

export default function ReportVoterpage() {
  return (
    <>
      <Helmet>
        <title> Report Voter </title>
      </Helmet>
      <ReportVoter />
    </>
  );
}
