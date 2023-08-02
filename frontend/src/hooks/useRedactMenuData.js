import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faPlus,
  faFloppyDisk,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useRedactSurvey } from '../components/RedactSurvey/RedactSurveyProvider';
import { updateSurvey } from '../API/surveyApi';

export const ADMIN_ROUTE = '/admin';

export const useRedactMenuData = () => {
  const navigate = useNavigate();
  const redact = useRedactSurvey();
  const data = [
    {
      title: 'Добавить блок вопросов',
      cName: 'nav-text',
      icon: <FontAwesomeIcon icon={faPlus} />,
      fn: (nodes, setSurvey, survey) => {
        redact.addQuestionBlock(setSurvey, 'Новый блок');
      },
    },
    {
      title: 'Сохранить',
      cName: 'nav-text',
      icon: <FontAwesomeIcon icon={faFloppyDisk} />,
      fn: async () => {
        await updateSurvey(redact.getCurrentSurvey());
      },
    },
    {
      close: true,
      confirmFn: async () => {
        await updateSurvey(redact.getCurrentSurvey());
        navigate(ADMIN_ROUTE + '/survey');
      },
      title: 'Выйти',
      cName: 'nav-text',
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      fn: () => navigate(ADMIN_ROUTE + '/survey'),
    },
  ];
  return data;
};
