import './panel.css';

// TODO: class should be choose value not string
interface PanelProps {
  class?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (event) => void;
}
export const Panel = (props: PanelProps) => {
  return (
    <div
      style={props.style}
      className={'panel ' + (props.class ? props.class : '')}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export const Button = (props: PanelProps) => {
  return (
    <button
      style={props.style}
      className={'button ' + (props.class || '')}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
