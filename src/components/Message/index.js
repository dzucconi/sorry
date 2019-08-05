import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  user-select: none;
`;

export const Message = memo(({ children }) => {
  return <Container>{children}</Container>;
});
