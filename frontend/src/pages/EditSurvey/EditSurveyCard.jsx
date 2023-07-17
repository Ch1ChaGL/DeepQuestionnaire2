import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../utils/consts';
function EditSurveyCard({ name, QuizId }) {
  const navigation = useNavigate();
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
      </Card.Footer>
    </Card>
  );
}

export default EditSurveyCard;
