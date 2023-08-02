import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../utils/consts';
import { deleteSurvey } from '../../API/surveyApi';
import NavigationPrompt from '../../components/UI/NavigationPrompt';
function EditSurveyCard({ name, QuizId, survey, setSurvey }) {
  const navigation = useNavigate();

  const deleteQuiz = async () => {
    const res = await deleteSurvey(QuizId);
    setSurvey(prevValue =>
      [...prevValue].filter(survey => survey.QuizId !== QuizId),
    );
  };

  const [showPrompt, setShowPrompt] = useState(false);
  return (
    <>
      {showPrompt && (
        <NavigationPrompt
          title={'Удаление опроса'}
          message={
            'Вы пытаетесь удалить опрос, вы уверены что хотите продолжить ?'
          }
          confirmText={'Да, удалить'}
          cancelText={'Закрыть'}
          onCancel={() => setShowPrompt(false)}
          onConfirm={deleteQuiz}
        />
      )}
      <Card>
        <Card.Header>
          №:{QuizId} {name}
        </Card.Header>
        {/* <Card.Body></Card.Body> */}
        <Card.Footer>
          <Button onClick={() => navigation(ADMIN_ROUTE + `/survey/${QuizId}`)}>
            Редактировать
          </Button>
          <Button
            variant='danger'
            className='ms-2'
            onClick={() => setShowPrompt(true)}
          >
            Удалить
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default EditSurveyCard;
