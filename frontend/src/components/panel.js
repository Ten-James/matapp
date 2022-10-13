import React from "react";
import styled from "styled-components";
import "../styles/panel.css";

export const Panel = styled.div`
  padding: 2.5em;
  margin: 1em;
  border-radius: 41px;
  background: #efe6dd;
  box-shadow: 19px 19px 38px #e5ddd4, -19px -19px 38px #f9efe6;
  ${(props) =>
    props.center &&
    `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    `}
  ${(props) =>
    props.centerChild &&
    `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    `}
`;

export const Button = (props) => {
  return (
    <button style={props.style} className={"button " + (props.class || "")} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
