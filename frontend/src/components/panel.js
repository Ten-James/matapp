import "../styles/panel.css";

export const Panel = (props) => {
  return (
    <div style={props.style} className={"panel " + props.class} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export const Button = (props) => {
  return (
    <button style={props.style} className={"button " + (props.class || "")} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
