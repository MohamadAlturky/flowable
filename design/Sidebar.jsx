import styles from "../css/dnd.module.css";

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <div id="side-bar-link-1" className={styles.dash}>
        Components
      </div>
      {/* <div
        id="side-bar-link-2"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        id="side-bar-link-3"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div> */}
      <div
        id="side-bar-link-4"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "annotation")}
        draggable
      >
        annotation
      </div>
      <div
        id="side-bar-link-4-gateway"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "gateway")}
        draggable
      >
        gateway
      </div>
      <div
        id="side-bar-link-5"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "pool")}
        draggable
      >
        pool
      </div>
      {/* <div
        id="side-bar-link-6"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "textinput")}
        draggable
      >
        textinput
      </div> */}
      <div
        id="side-bar-link-15"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "activity")}
        draggable
      >
        activity
      </div>
      {/* <div
        id="side-bar-link-7"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "circle")}
        draggable
      >
        circle
      </div> */}
      {/* <div
        id="side-bar-link-8"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div> */}
      {/* <div
        id="side-bar-link-9"
        className={styles.dashLink}
        onDragStart={(event) => onDragStart(event, "group")}
        draggable
      >
        Group
      </div> */}
    </aside>
  );
};

export default Sidebar;
