import React, { useEffect, useCallback } from 'react';
import s from './RedactMap.module.css';
import ReactFlow, {
  Controls,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSurveyNodes } from '../../hooks/useSurveyNodes';
import { useRedactSurvey } from '../../components/RedactSurvey/RedactSurveyProvider';
import { getOneSurvey } from '../../API/surveyApi';
import RedactMenu from '../../components/RedactSurvey/RedactMenu';
import { useUpdatedSurvey } from '../../hooks/useUpdatedSurvey';

function RedactMap({ survey, ...props }) {

  const [nodes, setNodes] = useSurveyNodes(survey.Survey);

  console.log('nodes', nodes);
  const updatedSurvey = useUpdatedSurvey(nodes);
  
  const onNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        {...props}
        onNodesChange={onNodesChange}
        style={{ backgroundColor: '#f3f4f6' }}
      >
        <RedactMenu nodes={nodes} />

        <Controls />
      </ReactFlow>
    </>
  );
}

export default RedactMap;
