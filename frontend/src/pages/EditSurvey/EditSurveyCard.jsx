import React from 'react';
import { Button, Card } from 'react-bootstrap';
function EditSurveyCard({ name }) {
  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      {/* <Card.Body></Card.Body> */}
      <Card.Footer>
        <Button>Редактировать</Button>
      </Card.Footer>
    </Card>
  );
}

export default EditSurveyCard;
