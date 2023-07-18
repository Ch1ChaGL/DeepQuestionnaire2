import { useEffect, useState } from 'react';
import { useRedactSurvey } from '../components/RedactSurvey/RedactSurveyProvider';

export const useUpdatedSurvey = (nodes) => {
//   const [updatedSurvey, setUpdatedSurvey] = useState([]);
//   const redact = useRedactSurvey();
//   console.log('nodes', nodes);
  useEffect(() => {
    // if (!nodes) return;
    // console.log('прошел');
    // const updatedObjSurvey = nodes.reduce(
    //   (obj, node) => {
    //     const currentBlock = {
    //       ...node.data.block,
    //       position: node.position,
    //     };
    //     return { blocks: [...obj.blocks, currentBlock] };
    //   },
    //   { blocks: [] },
    // );

    // redact.setOnlySurvey(updatedObjSurvey);
    console.log(nodes);
  }, [nodes]);

//   console.log('redact.Survey', redact.Survey);
};
