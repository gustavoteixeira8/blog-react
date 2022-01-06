import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 40px;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 15px;
  color: black;
  margin: 8px 15px;
  box-shadow: 0px 0px 15px 0px #b5b4b4;
  background-color: #f7f7f7;
  border-radius: 7px;
  border-bottom: 5px solid ${primaryColor};
  cursor: pointer;
  transition: 600ms all;

  @media (max-width: 850px) {
    max-width: 800px !important;
    margin: 8px auto;
  }

  .card-links {
    display: block;
    text-align: center;
    margin: 0 auto;
    color: ${primaryColor};
  }
  button:hover {
    .card-links {
      color: white;
    }
  }
`;

export const CardTitle = styled.h1`
  font-size: 30px;
  font-weight: normal;
  text-align: center;
`;

export const CardText = styled.div`
  font-size: 24px;
  margin-top: 10px;
  text-align: center;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardImageContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${primaryColor};
  border: 5px solid ${primaryColor};
  margin: 30px auto;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
  }

  p {
    color: white;
  }
`;
