import React, { useState, useEffect } from 'react';
export const useSurveyNodes = survey => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    // if (survey.length === 0) return;
    const extractedNodes = survey.Survey.blocks.map(node => ({
      id: node.id + '',
      type: 'questionBlock',
      data: { block: node },
      position: {
        x: parseFloat(node.position.x),
        y: parseFloat(node.position.y),
      },
    }));
    setNodes(extractedNodes);
  }, [survey]);

  return [nodes, setNodes];
};
