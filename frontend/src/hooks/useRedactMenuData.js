import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faPlus,
  faFloppyDisk,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export const ADMIN_ROUTE = '/admin';

export const useRedactMenuData = () => {
  const navigate = useNavigate();
  const data = [
    {
      title: 'Добавить блок вопросов',
      cName: 'nav-text',
      icon: <FontAwesomeIcon icon={faPlus} />,
    },
    {
      title: 'Сохранить',
      cName: 'nav-text',
      icon: <FontAwesomeIcon icon={faFloppyDisk} />,
      fn: nodes => {

        const updatedObjSurvey = nodes.reduce(
          (obj, node) => {
            const currentBlock = {
              ...node.data.block,
              position: node.position,
            };
            return { blocks: [...obj.blocks, currentBlock] };
          },
          { blocks: [] },
        );

          
      },
    },
    {
      title: 'Выйти',
      cName: 'nav-text',
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      fn: () => navigate(ADMIN_ROUTE + '/survey'),
    },
  ];
  return data;
};
