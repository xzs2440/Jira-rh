import styled from "@emotion/styled";
import React, { FormEvent } from "react";
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  > * {
    margin-top: 0;
    margin-bottom: 0;
    justify-content: ${(props) =>
      props.between ? "space-between" : undefined};
    margin-bottom: ${(props) => props.marginBottom + "rem"};
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
