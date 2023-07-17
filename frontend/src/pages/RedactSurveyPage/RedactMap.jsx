import React, { useEffect, useCallback } from 'react';
import s from './RedactMap.module.css';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSurveyNodes } from '../../hooks/useSurveyNodes';
import { Button } from 'react-bootstrap';
import SideBar from '../../components/UI/SideBar';
function RedactMap({ survey, ...props }) {
  const [nodes, setNodes] = useSurveyNodes(survey);

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
 
          <SideBar />

        <Controls />
      </ReactFlow>
    </>
  );
}

export default RedactMap;
