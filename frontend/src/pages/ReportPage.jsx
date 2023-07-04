import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EditSurveyForm from '../components/Survey/EditSurveyForm';
import { updateReport, deleteReport, getReportById } from '../API/reportApi';
import { Container, Spinner } from 'react-bootstrap';
import NotFoundPage from '../components/UI/NotFoundPage';
import { SURVEY_HISTORY_ROUTE } from '../utils/consts';

function ReportPage() {
  const location = useLocation();
  const reportId = parseInt(location.pathname.split('/').slice(-1)[0]);
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ state: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchReport().finally(() => setIsLoading(false));
  }, []);
  const fetchReport = async () => {
    console.log('reportId', reportId);
    if (!reportId) {
      setError({ state: true, message: `Ошибка в id ` });
      return;
    }

    try {
      const getedReport = await getReportById(reportId);
      console.log('getedReport', getedReport);
      setReport({
        ...getedReport,
        QuizTime: new Date(getedReport.QuizTime),
        Survey: JSON.parse(getedReport.Survey),
      });
    } catch (e) {
      console.log('e', e);
      setError({ state: true, message: e.response.data.message });
    }
  };

  const redBtn = {
    promptTitle: 'Удаление опроса',
    promptMessage:
      'Это последняя возможность передумать, вы уверены что хотите продолжить?',
    fn: async report => {
      await deleteReport(report.ReportId);
      navigate(SURVEY_HISTORY_ROUTE);
    },
    promptCancelText: 'Остаться',
    promptConfirmText: 'Да, Удалить',
    text: 'Удалить',
  };

  const greenBtn = {
    text: 'Обновить',
    fn: async report => {
      await updateReport(report);
      navigate(SURVEY_HISTORY_ROUTE);
    },
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container style={{ height: '100vh', paddingTop: 100 }}>
      {error.state === true ? (
        <NotFoundPage message={error.message} />
      ) : (
        <div className='d-flex justify-content-center align-items-center'>
          <EditSurveyForm report={report} redBtn={redBtn} greenBtn={greenBtn} />
        </div>
      )}
    </Container>
  );
}

export default ReportPage;
