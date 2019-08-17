import React from "react";
import styled, { keyframes, css } from "styled-components";

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

const style = css`
  animation: ${blink} 500ms linear infinite;
`;

const Container = styled.div`
  ${props => !props.ready && style}
`;

export const Loading = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);
