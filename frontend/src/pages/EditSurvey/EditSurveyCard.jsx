import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../utils/consts';
import { deleteSurvey } from '../../API/surveyApi';
function EditSurveyCard({ name, QuizId, survey, setSurvey }) {
  const navigation = useNavigate();

  const deleteQuiz = async () => {
    const res = await deleteSurvey(QuizId);
    setSurvey(prevValue =>
      [...prevValue].filter(survey => survey.QuizId !== QuizId),
    );
  };
  return (
    <Card>
      <Card.Header>
        №:{QuizId} {name}
      </Card.Header>
      {/* <Card.Body></Card.Body> */}
      <Card.Footer>
        <Button onClick={() => navigation(ADMIN_ROUTE + `/survey/${QuizId}`)}>
          Редактировать
        </Button>
        <Button variant='danger' className='ms-2' onClick={deleteQuiz}>
          Удалить
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default EditSurveyCard;
