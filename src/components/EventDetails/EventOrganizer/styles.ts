import styled from "styled-components";

export const OrganizerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const OrganizerAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  background-color: var(--background-dark-3);
`;

export const OrganizerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrganizerName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--white);
`;

export const OrganizerTitle = styled.span`
  font-size: 12px;
  color: var(--user-tag-span);
`;
