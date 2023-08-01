import { useState, useEffect } from 'react';
import { MarkerType } from 'reactflow';
export const useSurveyEdges = survey => {
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const extractedEdges = survey.Survey.blocks.reduce((arr, block) => {
      const currentId = block.id + '';

      if (!block.nextBlock) return arr;

      block.nextBlock.condition.forEach(condition => {
        const nextBlockId = condition[0].blockId + '';
        const edgeId = currentId + '-' + nextBlockId;
        const edge = {
          id: edgeId,
          source: currentId,
          target: nextBlockId,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          // type: 'smoothstep',
        };
        if (arr.find(condition => condition.id === edgeId)) return;
        arr.push(edge);
      });

      if (block.nextBlock.unconditionallyJump !== -1) {
        const unconditionallyJump = block.nextBlock.unconditionallyJump;
        const edgeId =
          currentId + '-' + unconditionallyJump + '-unconditionally';
        const edge = {
          id: edgeId,
          source: currentId,
          target: unconditionallyJump,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          // type: 'smoothstep',
        };

        arr.push(edge);
      }
      return arr;
    }, []);

    setEdges(extractedEdges);
  }, [survey]);

  return [edges, setEdges];
};
