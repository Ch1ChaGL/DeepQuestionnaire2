import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './SurveyCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { SURVEY_HISTORY_ROUTE } from '../../utils/consts';
const SurveyCard = ({
  Time,
  Name,
  CompanyName,
  JobTitle,
  Email,
  Phone,
  Id,
}) => {
  const formattedDate = dayjs(Time).format('DD-MM-YYYY HH:mm:ss');
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5 className={styles.cardTitle}>Опрос №{Id}</h5>
          <FontAwesomeIcon
            className={styles.editBtn}
            icon={faPenToSquare}
            onClick={() => {
              navigate(SURVEY_HISTORY_ROUTE + `/${Id}`);
            }}
          />
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardText}>
          <strong>Время опроса:</strong> {formattedDate}
        </div>
        <div className={styles.cardText}>
          <strong>ФИО:</strong> {Name}
        </div>
        <div className={styles.cardText}>
          <strong>Должность:</strong> {JobTitle}
        </div>
        <div className={styles.cardText}>
          <strong>Название компании:</strong> {CompanyName}
        </div>
        <div className={styles.cardText}>
          <strong>Email:</strong> {Email}
        </div>
        <div className={styles.cardText}>
          <strong>Номер телефона:</strong> {Phone}
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
