import React, { useEffect, useCallback, useState } from 'react';
import s from './RedactMap.module.css';
import ReactFlow, { Controls, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { useSurveyNodes } from '../../hooks/useSurveyNodes';
import { useRedactSurvey } from '../../components/RedactSurvey/RedactSurveyProvider';
import { getOneSurvey } from '../../API/surveyApi';
import RedactMenu from '../../components/RedactSurvey/RedactMenu';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import FunctionMenu from '../../components/RedactSurvey/FunctionMenu';
// import { useUpdatedSurvey } from '../../hooks/useUpdatedSurvey';

const RedactMap = ({ QuizId, ...props }) => {
  const redact = useRedactSurvey();

  const [survey, setSurvey] = useState({ Survey: { blocks: [] } });
  useEffect(() => {
    fetchSurvey();
  }, []);

  const [selectedBlock, setSelectedBlock] = useState({});
  const [showFunctionMenu, setShowFunctionMenu] = useState(false);
  const fetchSurvey = async () => {
    let getedSurvey = await getOneSurvey(QuizId);
    const parsedSurvey = JSON.parse(getedSurvey.Survey);
    getedSurvey = { ...getedSurvey, Survey: parsedSurvey };
    redact.setCurrentSurvey(getedSurvey);
    setSurvey(redact.getCurrentSurvey());
  };

  const [nodes, setNodes] = useSurveyNodes(survey);

  const onNodesChange = useCallback(changes => {
    if (!changes[0].dragging) return;
    const blockId = parseInt(changes[0].id);
    const position = changes[0].position;
    redact.setBlockPosition(blockId, position, setSurvey);
  }, []);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        {...props}
        onNodesChange={onNodesChange}
        style={{ backgroundColor: '#f3f4f6' }}
        onNodeClick={(event, node) => {
          setSelectedBlock(node);
          setShowFunctionMenu(true);
        }}
      >
        <RedactMenu nodes={nodes} />
        <FunctionMenuMemo
          showFunctionMenu={showFunctionMenu}
          setShowFunctionMenu={setShowFunctionMenu}
          selectedBlock={selectedBlock}
          setSurvey={setSurvey}
        />
        <Controls />
      </ReactFlow>
    </>
  );
};

const FunctionMenuMemo = React.memo(FunctionMenu);

export default RedactMap;
