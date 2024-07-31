import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
const labelStyle = {
  position: 'absolute',
  color: '#555',
  bottom: -14,
  fontSize: 8,
  transform:"translateX(-50%)"
};

function StartEventNode({data}) {

  return (
    <div style={{
      // width:62,
      // height:62,
      // // backgroundColor: 'rgba(208, 192, 247, 0.2)',
      // // borderRadius: '50%',
      // // border: '1px solid #1a192b'
    }}>
      <Handle type="source" position={Position.Right} />
      <div style={labelStyle}>{data.label}</div>
    </div>
  );
}

export default memo(StartEventNode);
