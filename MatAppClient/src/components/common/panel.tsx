import React from 'react';
import './panel.css';

// TODO: class should be choose value not string
interface PanelProps {
  class?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  color?: 'red' | 'blue' | 'white' | 'gray';
  children: React.ReactNode;
  onClick?: (event: any) => void;
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
  const color = props.color || 'gray';
  return (
    <button
      style={props.style}
      disabled={props.disabled || false}
      className={'button ' + (props.class || '') + ' color-' + color}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
