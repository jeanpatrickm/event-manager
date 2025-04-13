import styled from "styled-components";

interface TabItemProps {
  $active: boolean;
}

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #3d3f56;
  margin-bottom: 20px;
`;

export const TabItem = styled.button<TabItemProps>`
  padding: 12px 20px;
  background: transparent;
  border: none;
  color: ${(props) => (props.$active ? "var(--white)" : "#a8a8b3")};
  font-size: 16px;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${(props) => (props.$active ? "#9c4dcc" : "transparent")};
    border-radius: 3px 3px 0 0;
  }

  &:hover {
    color: ${(props) => (props.$active ? "var(--white)" : "#d1d1d6")};
  }
`;

export const TabContent = styled.div`
  width: 100%;
`;
