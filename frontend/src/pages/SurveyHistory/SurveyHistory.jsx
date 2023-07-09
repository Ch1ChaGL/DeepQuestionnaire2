import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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
  const navigate = useNavigate();

  const [pageQuery, setPageQuery] = useState({
    sort: 'newReports',
    searchQuery: '',
    currentPage: 1,
  });

  const [checkedReports, setCheckedReports] = useState({});
  const [searchQuery, setSearchQuery] = useState(queryParams.searchQuery || '');
  const [reports, setReports] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  console.log('pageQuery.currentPage', pageQuery.currentPage);
  useEffect(() => {
    fetchReports();
  }, []);

  function updateReportStatuses(newObject, checkedReports) {
    const updatedObject = { ...newObject };
    for (const reportId in updatedObject) {
      if (reportId in checkedReports) {
        updatedObject[reportId] = checkedReports[reportId];
      }
    }
    setCheckedReports(updatedObject);
  }

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    queryParams.page = pageQuery.currentPage;
    queryParams.sort = pageQuery.sort;
    queryParams.searchQuery = pageQuery.searchQuery || '';
    const searchString = queryString.stringify(queryParams);

    console.log('searchString', searchString);
    navigate(SURVEY_HISTORY_ROUTE + `?${searchString}`);
  }, [pageQuery]);

  useEffect(() => {
    fetchReports();
  }, [location.search]);

  const fetchReports = async () => {
    const searchString = queryString.stringify(queryParams);
    const getedReports = await getReports(searchString);
    updateReportStatuses(getedReports.ids, checkedReports);
    setTotalPages(Math.ceil(getedReports.total / getedReports.pageSize));
    setReports(getedReports.Reports);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    setPageQuery(prevPageQuery => ({
      ...prevPageQuery,
      searchQuery: searchQuery.trim(),
      currentPage: 1,
    }));
  };

  return (
    <>
      <ScrollButton />
      <Container style={{ paddingTop: 100 }}>
        <form onSubmit={handleSearchSubmit} autoComplete='off'>
          <div className='d-flex mb-3'>
            <Col ms={10}>
              <SearchInput
                name='search'
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </Col>

            <Button ms={2} className='ms-2' onClick={handleSearchSubmit}>
              Найти
            </Button>
          </div>
          <Row className='align-items-center mb-3 gap-2'>
            <Col sm={3}>
              <Form.Select
                name='select'
                size='lg'
                value={queryParams.sort}
                onChange={e =>
                  setPageQuery({
                    ...pageQuery,
                    sort: e.target.value,
                    currentPage: 1,
                  })
                }
              >
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
        </form>
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
            page={parseInt(queryParams.page) || 1}
            onChange={(e, page) =>
              setPageQuery({ ...pageQuery, currentPage: page })
            }
          />
        </div>
      </Container>
    </>
  );
}

const MemoizedSelectAllBtn = React.memo(SelectAllBtn);

export default SurveyHistory;
