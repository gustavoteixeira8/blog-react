import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const HomeContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  .container-category {
    position: sticky;
    right: 0;
    top: 0;
  }

  @media (max-width: 1280px) {
    flex-direction: column;

    .container-category {
      max-width: 960px !important;
      position: relative;
    }
  }
`;

export const CategoryBox = styled.div`
  p {
    color: black;
    display: block;
    font-size: 20px;
    margin: 10px auto;
    background-color: #e0e0e0;
    padding: 5px;
    transition: 300ms all;
    border-radius: 6px;
    cursor: pointer;
  }

  p:hover {
    background-color: ${primaryColor};
    color: white;
  }

  button {
    width: 100%;
    margin: 5px 0 0 0;
  }
`;

export const ArticleDetails = styled.div`
  width: 100%;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  color: ${primaryDarkColor};

  span {
    margin-right: 6px;
    text-decoration: none;
    color: ${primaryDarkColor};
    cursor: pointer;
  }

  span:hover {
    color: ${primaryColor};
  }
`;
