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
import { useSurveyEdges } from '../../hooks/useSurveyEdges';
import ConnectionLine from '../../components/EditSurvey/ConnectionLine';
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
  const [edges, setEdges] = useSurveyEdges(survey);

  //*!Поменять changes[0].id, с parseInt на
  const onNodesChange = useCallback(changes => {
    if (!changes[0].dragging) return;
    const blockId = Number(changes[0].id) || changes[0].id;
    const position = changes[0].position;
    redact.setBlockPosition(blockId, position, setSurvey);
  }, []);

  // console.log('edges', edges);
  // console.log('nodes', nodes);
  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        connectionLineComponent={ConnectionLine}
        {...props}
        onNodesChange={onNodesChange}
        style={{ backgroundColor: '#f3f4f6' }}
        onNodeClick={(event, node) => {
          setSelectedBlock(node);
          setShowFunctionMenu(true);
        }}
      >
        <RedactMenu nodes={nodes} setSurvey={setSurvey} survey={survey} />
        {Object.keys(selectedBlock).length ? (
          <FunctionMenuMemo
            showFunctionMenu={showFunctionMenu}
            setShowFunctionMenu={setShowFunctionMenu}
            selectedBlock={selectedBlock}
            setSurvey={setSurvey}
            setSelectedBlock={setSelectedBlock}
          />
        ) : (
          <></>
        )}
        {/* <FunctionMenuMemo
          showFunctionMenu={showFunctionMenu}
          setShowFunctionMenu={setShowFunctionMenu}
          selectedBlock={selectedBlock}
          setSurvey={setSurvey}
          setSelectedBlock={setSelectedBlock}
        /> */}

        <Controls />
      </ReactFlow>
    </>
  );
};

const FunctionMenuMemo = React.memo(FunctionMenu);
export default RedactMap;
