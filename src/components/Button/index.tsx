import styled from "styled-components";
import { FC } from "react";

const StyledButton = styled.button`
  color: #fff;
  background-color: ${({ disabled }) => (disabled ? "#cccccc" : "#17a2b8")};
  border: 1px solid;
  border-color: ${({ disabled }) => (disabled ? "#cccccc" : "#17a2b8")};
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  float: right;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

type Props = {
  disabled?: boolean;
  onClick?: () => void;
};

const Button: FC<Props> = ({ disabled, children, onClick }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
