import React, { useContext } from 'react';
import { Context } from '../../index';
import {
  Container,
  Form,
  Button,
  Card,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';
import EditSurveyForm from './EditSurveyForm';
import { createReport } from '../../API/reportApi.js';

function EndSurveyForm({ report, setIsStarted }) {
  const { user } = useContext(Context);
  const pushReportOnServer = async editedReport => {
    const reportSent = editedReport;
    reportSent.UserId = user.user.UserId;
    reportSent.FullNameEmployee = user.user.FullName;
    await createReport(editedReport);

    setIsStarted(false);
  };

  const redBtn = {
    promptTitle: 'Переход на главную страницу',
    message:
      'При переходе весь опрос будет сброшен, вы уверены что хотите продолжить?',
    fn: () => setIsStarted(false),
    promptCancelText: 'Остаться',
    promptConfirmText: 'Выйти в главное меню ',
    text: 'Выйти в главное меню ',
  };

  const greenBtn = {
    text: 'Сохранить',
    fn: pushReportOnServer,
  };

  return (
    <Container
      className='d-flex justify-content-center'
      style={{ paddingTop: '10vh' }}
    >
      <EditSurveyForm report={report} redBtn={redBtn} greenBtn={greenBtn} />
    </Container>
  );
}

export default EndSurveyForm;
