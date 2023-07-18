import React, { useState, useEffect } from 'react';

export const useSurveyNodes = survey => {
  const [nodes, setNodes] = useState([]);
  console.log(survey);
  useEffect(() => {
    if (survey.length === 0) return;
    const extractedNodes = survey.blocks.map(node => ({
      id: node.id + '',
      type: 'questionBlock',
      data: { block: node },
      position: { x: parseInt(node.position.x), y: parseInt(node.position.y) },
    }));

    setNodes(extractedNodes);
  }, [survey]);

  return [nodes, setNodes];
};
