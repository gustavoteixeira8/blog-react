import styled from 'styled-components';

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;

export const UserDetails = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 18px;
    margin: 15px 0;
    cursor: pointer;
    display: flex;
  }
`;
