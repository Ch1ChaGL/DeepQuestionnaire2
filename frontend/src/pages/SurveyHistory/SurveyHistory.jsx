import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { sortListInSurveyHistory } from '../../utils/consts';
import SideBar from '../../components/UI/SideBar';
import SearchInput from '../../components/UI/SearchInput';
import SurveyCard from '../../components/Survey/SurveyCard';
import s from './SurveyHistory.module.css';
import { getReports } from '../../API/reportApi';
import ScrollButton from '../../components/UI/ScrollButton';
import { useReports } from '../../hooks/useReports';
function SurveyHistory() {
  const [sort, setSort] = useState(sortListInSurveyHistory[0].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([]);

  const sortedReports = useReports(reports, sort, searchQuery);
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const getedReports = await getReports();
    console.log('getedReports', getedReports);
    setReports(getedReports);
  };

  return (
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
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SurveyHistory;
