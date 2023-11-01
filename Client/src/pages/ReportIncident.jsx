import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { ReportIncident } from 'src/sections/Report-incident';

// ----------------------------------------------------------------------

export default function ReportIncidentpage() {
  return (
    <>
      <Helmet>
        <title> Report incident </title>
      </Helmet>
      <ReportIncident />
    </>
  );
}
