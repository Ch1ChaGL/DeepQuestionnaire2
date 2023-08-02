import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../utils/consts';
import { deleteSurvey } from '../../API/surveyApi';
import NavigationPrompt from '../../components/UI/NavigationPrompt';
import s from './EditSurveyCard.module.css';

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
      <div className={s.container}>
        <div className={s.title}>{name}</div>
        <hr />
        {/* <Card.Body></Card.Body> */}
        <div className={s.btns}>
          <div className={s.deleteBtn} onClick={() => setShowPrompt(true)}>
            Удалить
          </div>
          <div
            onClick={() => navigation(ADMIN_ROUTE + `/survey/${QuizId}`)}
            className={s.editBtn}
          >
            Редактировать
          </div>
        </div>
      </div>
    </>
  );
}

export default EditSurveyCard;
