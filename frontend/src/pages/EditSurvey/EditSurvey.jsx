import React, { useState, useEffect } from 'react';
import SearchInput from '../../components/UI/SearchInput';
import { Button } from 'react-bootstrap';
import s from './EditSurvey.module.css';
import { getSurvey } from '../../API/surveyApi';
import EditSurveyCard from './EditSurveyCard';
function EditSurvey() {
  const [searchQuery, setSearchQuery] = useState('');
  const [survey, setSurvey] = useState([]);

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    const getedSurvey = await getSurvey();
    setSurvey(getedSurvey);
    console.log('getedSurvey', getedSurvey);
  };

  return (
    <div
      className={s.container}
      style={{
        padding: 20,
      }}
    >
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Button className={s.addButton}>Добавить</Button>
      <div className={s.gridСontainer}>
        {survey.map(sur => (
          <EditSurveyCard name={sur.Name} QuizId={sur.QuizId}/>
        ))}
      </div>
    </div>
  );
}

export default EditSurvey;
