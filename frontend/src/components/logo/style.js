import styled, { keyframes } from "styled-components";

const ALogoTop = keyframes`
0% {
    transform: rotate(0deg);
}
50% {
    transform: rotate(10deg);
}
100% {
    transform: rotate(0deg);
}
`;
const ALogoBottom = keyframes`
0% {
    transform: rotate(0deg);
50% {
    transform: rotate(-5deg);
}
100% {
    transform: rotate(0deg);
}
`;
const AlogoText = keyframes`
0% {
    transform: scaleY(1);
}
50% {
    transform: scaleY(0.95);
}
100% {
    transform: scaleY(1);
}
`;

export const LogoContainer = styled.div`
  ${(props) =>
    props.type === "upper"
      ? `
  position: relative;
  z-index: 1;
  > .logo {
      width: 200px;
  }
`
      : props.type === "small"
      ? `
  > .logo {
      width: 5em;
  }
`
      : `
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  > .logo {
  width: 400px;
  }`}
  > .logo * {
    fill: ${(props) => props.theme.primary};
  }
  #bur-top {
    transform-origin: 45% 16%;
    animation: ${ALogoTop} 3s ease-in-out;
    animation-iteration-count: infinite;
  }

  #bur-bot {
    transform-origin: 45% 16%;
    animation: ${ALogoBottom} 3s ease-in-out;
    animation-iteration-count: infinite;
  }
  #app-a {
    transform-origin: 55% 16%;
    animation: ${AlogoText} 3s ease-in-out;
    animation-iteration-count: infinite;
  }
  #app-p1 {
    transform-origin: 55% 16%;
    animation: ${AlogoText} 3s ease-in-out -1500ms;
    animation-iteration-count: infinite;
  }
  #app-p2 {
    transform-origin: 55% 16%;
    animation: ${AlogoText} 3s ease-in-out;
    animation-iteration-count: infinite;
  }
`;
