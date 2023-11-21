import styled from "styled-components";


export const StyledChatContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  height: 68px;
  min-height: 48px;
  gap: 4px;
  padding-left: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-sizing: border-box;
  
    &:hover {
        background-color: ${(props) => props.theme.colors.hover};
    }
`;
