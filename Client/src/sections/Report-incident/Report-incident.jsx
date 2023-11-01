/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
import close from '../udashboard/buttons/Close-button.jpeg';
// eslint-disable-next-line perfectionist/sort-imports
// import '../styles/Report-incident.css'
// eslint-disable-next-line perfectionist/sort-imports, import/order, import/no-unresolved
import { useRouter } from 'src/routes/hooks';

export default function ReportIncident() {
  const router = useRouter();
  return (
    <div>
      <div
        className="closebutton"
        onClick={() => {
          router.push('/udashboard');
        }}
      >
        <img src={close} alt="close" />
      </div>
      <div className="report-con">
        <button>Call</button>
        <button>Message</button>
      </div>
    </div>
  );
}
