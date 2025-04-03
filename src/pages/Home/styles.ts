import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e2e;
  color: white;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ContentArea = styled.main`
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 60px);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1e1e2e;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #352f5b;
    border-radius: 4px;
  }
`;

export const RightSidebar = styled.aside`
  width: 220px;
  height: 100vh;
  background-color: #1e1e2e;
  border-left: 1px solid #352f5b;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #1e1e2e;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #352f5b;
    border-radius: 4px;
  }
`;
