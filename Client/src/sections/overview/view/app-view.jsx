import { faker } from '@faker-js/faker';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line import/no-unresolved

import AppOrderTimeline from '../app-order-timeline';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl" sx={{ mt: 3, me: 0, ms: 0, p: 0 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AppWidgetSummary
            title="Distance Covered(KM)"
            total={17}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AppWidgetSummary
            title="Active Kaaryakartha"
            total={1352}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AppWidgetSummary
            title="Reports & Complaints"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AppWidgetSummary
            title="Reported Voters"
            total={34}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ReportedVoter.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AppWidgetSummary
            title="Total Voters Knocked"
            total={34}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/Verifieduser.png" />}
          />
        </Grid>
      </Grid>

      <Container maxWidth="xl" sx={{ mt: 3, me: 0, ms: 0, p: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={8}>
            <AppWebsiteVisits title="Kaaryakartha Visits" subheader="(+43%) than last year" />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <AppOrderTimeline
              title="Canvass Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.string.uuid(),
                title: [
                  '27-10-2023, covered Disatance, 6km',
                  '26-10-2023, covered Disatance, 5km',
                  '25-10-2023, covered Disatance, 6km',
                  '24-10-2023, covered Disatance, 7km',
                  '23-10-2023, covered Disatance, 9km',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
