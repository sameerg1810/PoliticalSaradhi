// eslint-disable-next-line import/no-extraneous-dependencies
import { PDFDocument } from 'pdfjs';

// eslint-disable-next-line consistent-return
const fetchData = async (id, date) => {
  try {
    const formsResponse = await fetch(
      `https://canvas-back-end.onrender.com/main/user/form/${id}/${date}`
    );
    const formsData = await formsResponse.json();

    const incidentsResponse = await fetch(
      `https://canvas-back-end.onrender.com/main/user/incidents/${id}`
    );
    const incidentsData = await incidentsResponse.json();

    const reportsResponse = await fetch(
      `https://canvas-back-end.onrender.com/main/user/reports/${id}`
    );
    const reportsData = await reportsResponse.json();

    return {
      dailyForms: formsData,
      incident: incidentsData,
      reports: reportsData,
    };
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
  }
};

const downloadPdf = async (pdfDoc) => {
  const dataUrl = await pdfDoc.save('dataurl');

  // TODO: Implement code to download the PDF document using the data URL

  console.log('PDF document downloaded successfully at {dataUrl}', dataUrl);
};

const downloadCanvassingForm = async (id, date) => {
  try {
    const data = await fetchData(id, date);

    const pdfDoc = new PDFDocument();

    // Add the canvassing form data to the PDF document
    const canvassingFormPage = pdfDoc.addPage();
    canvassingFormPage.drawText(JSON.stringify(data.dailyForms), { x: 20, y: 20 });

    // Download the PDF document
    await downloadPdf(pdfDoc);
  } catch (error) {
    console.error('Error occurred while downloading canvassing form data:', error);
  }
};

const downloadReportIncident = async (id, date) => {
  try {
    const data = await fetchData(id, date);

    const pdfDoc = new PDFDocument();

    // Add the incident report data to the PDF document
    const incidentReportPage = pdfDoc.addPage();
    incidentReportPage.drawText(JSON.stringify(data.incident), { x: 20, y: 20 });

    // Download the PDF document
    await downloadPdf(pdfDoc);
  } catch (error) {
    console.error('Error occurred while downloading incident report data:', error);
  }
};

const downloadReportVoter = async (id, date) => {
  try {
    const data = await fetchData(id, date);

    const pdfDoc = new PDFDocument();

    // Add the voter report data to the PDF document
    const voterReportPage = pdfDoc.addPage();
    voterReportPage.drawText(JSON.stringify(data.reports), { x: 20, y: 20 });

    // Download the PDF document
    await downloadPdf(pdfDoc);
  } catch (error) {
    console.error('Error occurred while downloading voter report data:', error);
  }
};

export { fetchData, downloadReportVoter, downloadCanvassingForm, downloadReportIncident };
