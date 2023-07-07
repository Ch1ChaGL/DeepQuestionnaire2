import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import {
  SURVEY_HISTORY_ROUTE,
  sortListInSurveyHistory,
} from '../../utils/consts';
import SearchInput from '../../components/UI/SearchInput';
import SurveyCard from '../../components/Survey/SurveyCard';
import s from './SurveyHistory.module.css';
import queryString from 'query-string';
import { getReports } from '../../API/reportApi';
import ScrollButton from '../../components/UI/ScrollButton';
import SelectAllBtn from '../../components/UI/SelectAllBtn';
import Pagination from '@mui/material/Pagination';

function SurveyHistory() {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  console.log('location: ' , location);
  const navigate = useNavigate();
  const [checkedReports, setCheckedReports] = useState({});
  const [sort, setSort] = useState(queryParams.sort);
  const [searchQuery, setSearchQuery] = useState(queryParams.searchQuery);
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(queryParams.page);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
  
  }, []);

  useEffect(() => {
    queryParams.page = currentPage;
    queryParams.sort = sort;
    queryParams.searchQuery = searchQuery || '';
    const searchString = queryString.stringify(queryParams);
    navigate(SURVEY_HISTORY_ROUTE + `?${searchString}`);
  }, [currentPage]);

  useEffect(() => {
    fetchReports();
    console.log('Разве ты не должен поменяться ');
    const queryParams = queryString.parse(location.search);
    const page = parseInt(queryParams.page) || 1;
    console.log('queryParams.sort', queryParams.sort);
    setSort(queryParams.sort || 'newReports');
    setCurrentPage(page);
  }, [location.search]);

  // const fetchReports = async () => {
  //   const getedReports = await getReports();
  //   setReports(getedReports);

  //   const initialState = getedReports.reduce((acc, report) => {
  //     acc[report.ReportId] = false;
  //     return acc;
  //   }, {});

  //   setCheckedReports(initialState);
  // };

  const fetchReports = async () => {
    const queryParams = queryString.parse(location.search);
    queryParams.page = currentPage;
    queryParams.sort = sort;
    queryParams.searchQuery = searchQuery || '';
    const searchString = queryString.stringify(queryParams);
    const getedReports = await getReports(searchString);
    console.log('getedReports', getedReports);
    setTotalPages(Math.ceil(getedReports.total / getedReports.pageSize));
    setReports(getedReports.Reports);
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
            <MemoizedSelectAllBtn
              reports={reports}
              checkedReports={checkedReports}
              setCheckedReports={setCheckedReports}
              setReports={setReports}
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col className={s.gridСontainer}>
            {reports.map(report => (
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
        <div className='pb-4'>
          <Pagination
            className={s.pag}
            variant='outlined'
            shape='rounded'
            showFirstButton
            showLastButton
            count={totalPages}
            color='primary'
            size='large'
            onChange={(e, page) => setCurrentPage(page)}
          />
        </div>
      </Container>
    </>
  );
}

const MemoizedSelectAllBtn = React.memo(SelectAllBtn);

export default SurveyHistory;
