import React from 'react';
import { Card } from 'react-bootstrap';
import dayjs from 'dayjs';
import styles from './SurveyCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
const SurveyCard = ({
  Time,
  Name,
  CompanyName,
  JobTitle,
  Email,
  Phone,
  Id,
  setShowEditForm,
}) => {
  const formattedDate = dayjs(Time).format('DD-MM-YYYY HH:mm:ss');

  return (
    <Card className={styles.card}>
      <Card.Header className={styles.cardHeader}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5 className={styles.cardTitle}>Опрос №{Id}</h5>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => setShowEditForm(true)}
          />
        </div>
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <Card.Text className={styles.cardText}>
          <strong>Время опроса:</strong> {formattedDate}
        </Card.Text>
        <Card.Text className={styles.cardText}>
          <strong>ФИО:</strong> {Name}
        </Card.Text>
        <Card.Text className={styles.cardText}>
          <strong>Должность:</strong> {JobTitle}
        </Card.Text>
        <Card.Text className={styles.cardText}>
          <strong>Название компании:</strong> {CompanyName}
        </Card.Text>
        <Card.Text className={styles.cardText}>
          <strong>Email:</strong> {Email}
        </Card.Text>
        <Card.Text className={styles.cardText}>
          <strong>Номер телефона:</strong> {Phone}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SurveyCard;
