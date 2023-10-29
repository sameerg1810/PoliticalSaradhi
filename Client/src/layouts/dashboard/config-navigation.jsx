// eslint-disable-next-line import/no-unresolved
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/ldashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Kaaryakartha',
    path: '/user',
    icon: icon('ic_user'),
  },
];

export default navConfig;
