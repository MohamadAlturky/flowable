import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const labelStyle = {
  position: 'absolute',
  color: '#555',
  bottom: -14,
  fontSize: 8,
};
function IntermediateEventNode({ data }) {

  return (
    <>

      <div style={{
        width: 62,
        height: 62,
        backgroundColor: 'rgba(208, 192, 247, 0.2)',
        borderRadius: '50%',
        border: '1px solid #1a192b',
        position: "relative"
      }}>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
        <div style={labelStyle}>{data.label}</div>
    </>
  );
}

export default memo(IntermediateEventNode);
