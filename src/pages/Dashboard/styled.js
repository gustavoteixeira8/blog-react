import styled from 'styled-components';

export const Title = styled.h1`
  font-weight: bold;
  font-size: 50px;
  text-align: center;
  margin-bottom: 40px;
`;

export const ContainerUtilityLinks = styled.div`
  width: 100%;
  margin: 90px auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const UtilityLinks = styled.div`
  width: 50%;
  margin-bottom: 50px;

  @media (max-width: 850px) {
    width: 100% !important;
  }

  button {
    width: 100%;
    height: 50px;
  }

  a.utility-link {
    margin: 15px;
    color: black;
    font-size: 25px;
    display: block;
  }
`;
