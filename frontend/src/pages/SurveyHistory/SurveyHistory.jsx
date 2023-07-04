import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { sortListInSurveyHistory } from '../../utils/consts';
import SearchInput from '../../components/UI/SearchInput';
import SurveyCard from '../../components/Survey/SurveyCard';
import s from './SurveyHistory.module.css';
import { getReports, updateReport, deleteReport } from '../../API/reportApi';
import ScrollButton from '../../components/UI/ScrollButton';
import { useReports, useReportsById } from '../../hooks/useReports';
import EditSurveyForm from '../../components/Survey/EditSurveyForm';
function SurveyHistory() {
  const [sort, setSort] = useState(sortListInSurveyHistory[0].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedReportsId, setEditedReportsId] = useState(0);
  const sortedReports = useReports(reports, sort, searchQuery);
  const { report, error } = useReportsById(editedReportsId);
  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if (editedReportsId === 0) return;
    setShowEditForm(true);
  }, [report]);

  const fetchReports = async () => {
    const getedReports = await getReports();
    console.log('getedReports', getedReports);
    setReports(getedReports);
  };

  const redBtn = {
    promptTitle: 'Удаление опроса',
    promptMessage:
      'Это последняя возможность передумать, вы уверены что хотите продолжить?',
    fn: report => {
      deleteReport(report.ReportId);
      setShowEditForm(false);
    },
    promptCancelText: 'Остаться',
    promptConfirmText: 'Да, Удалить',
    text: 'Удалить',
  };

  const greenBtn = {
    text: 'Обновить',
    fn: report => {
      updateReport(report);
      setShowEditForm(false);
    },
  };

  return (
    <>
      {showEditForm ? (
        <EditSurveyForm report={report} redBtn={redBtn} greenBtn={greenBtn} />
      ) : (
        <>
          <ScrollButton />
          <Container style={{ paddingTop: 100 }}>
            <Row className='mb-3'>
              <Col>
                <SearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </Col>
            </Row>
            <Col>
              <Form.Select
                size='lg'
                className='mb-3'
                onChange={e => setSort(e.target.value)}
              >
                {sortListInSurveyHistory.map(item => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Row>
              <Col className={s.gridСontainer}>
                {sortedReports.map(report => (
                  <SurveyCard
                    Time={report.QuizTime}
                    Name={report.RespondentName}
                    Email={report.Email}
                    Phone={report.PhoneNumber}
                    Id={report.ReportId}
                    CompanyName={report.CompanyName}
                    JobTitle={report.JobTitle}
                    key={report.ReportId}
                    setEditedReportsId={setEditedReportsId}
                  />
                ))}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default SurveyHistory;
