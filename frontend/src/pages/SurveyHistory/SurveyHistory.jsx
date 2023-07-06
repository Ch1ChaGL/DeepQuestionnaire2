import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { sortListInSurveyHistory } from '../../utils/consts';
import SearchInput from '../../components/UI/SearchInput';
import SurveyCard from '../../components/Survey/SurveyCard';
import s from './SurveyHistory.module.css';
import { getReports } from '../../API/reportApi';
import ScrollButton from '../../components/UI/ScrollButton';
import { useReports } from '../../hooks/useReports';
import SelectAllBtn from '../../components/UI/SelectAllBtn';

function SurveyHistory() {
  const [checkedReports, setCheckedReports] = useState({});
  const [sort, setSort] = useState(sortListInSurveyHistory[0].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([]);
  console.log('reports', reports);
  console.log('checkedReports', checkedReports);
  const sortedReports = useReports(reports, sort, searchQuery);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const getedReports = await getReports();
    setReports(getedReports);

    const initialState = getedReports.reduce((acc, report) => {
      acc[report.ReportId] = false;
      return acc;
    }, {});

    setCheckedReports(initialState);
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
        <Row className='align-items-center mb-3 gap-2'>
          <Col sm={3}>
            <Form.Select size='lg' onChange={e => setSort(e.target.value)}>
              {sortListInSurveyHistory.map(item => (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            {/* {useMemo(
              () => (
                <SelectAllBtn
                  reports={reports}
                  checkedReports={checkedReports}
                  setCheckedReports={setCheckedReports}
                  setReports={setReports}
                />
              ),
              [reports, checkedReports],
            )} */}

            <MemoizedSelectAllBtn
              reports={reports}
              checkedReports={checkedReports}
              setCheckedReports={setCheckedReports}
              setReports={setReports}
            />
          </Col>
        </Row>

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
                setCheckedReports={setCheckedReports}
                checkedReports={checkedReports}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

const MemoizedSelectAllBtn = React.memo(SelectAllBtn);

export default SurveyHistory;
