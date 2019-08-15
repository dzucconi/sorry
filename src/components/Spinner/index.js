import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Spinner = styled.div`
  animation: ${blink} 500ms linear infinite;
  transform: translateZ(0);
  border-radius: 50%;
  background-color: white;
  width: 0.5em;
  height: 0.5em;
  position: fixed;
  top: 1em;
  right: 1em;
`;
