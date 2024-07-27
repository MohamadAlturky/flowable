import { DragEvent } from 'react';

import styles from '../css/dnd.module.css';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <div id="side-bar-link-1" className={styles.dash}>Dashboard</div>
      <div id="side-bar-link-2" className="react-flow__node-input" onDragStart={(event: DragEvent) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div id="side-bar-link-3"
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'default')}
        draggable
      >
        Default Node
      </div>
      <div id="side-bar-link-4"
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'annotation')}
        draggable
      >
        annotation
      </div>
      <div id="side-bar-link-4-gateway"
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'gateway')}
        draggable
      >
        gateway
      </div>
      <div id="side-bar-link-5"
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'pool')}
        draggable
      >
        pool
      </div>
      <div id="side-bar-link-6"
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'textinput')}
        draggable
      >
        textinput
      </div>
      <div id="side-bar-link-15"
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'activity')}
        draggable
      >
        activity
      </div>
      <div id="side-bar-link-7"
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'circle')}
        draggable
      >
        circle
      </div>
      <div id="side-bar-link-8"
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'output')}
        draggable
      >
        Output Node
      </div>
      <div id="side-bar-link-9"
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'group')}
        draggable
      >
        Group
      </div>
    </aside>
  );
};

export default Sidebar;
