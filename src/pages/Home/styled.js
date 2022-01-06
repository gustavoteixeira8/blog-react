import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

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
    flex-direction: column-reverse;

    .container-category {
      max-width: 960px !important;
      position: relative;
    }
  }
`;

export const CategoryBox = styled.div`
  a {
    color: black;
    display: block;
    font-size: 20px;
    margin: 10px auto;
    background-color: #e0e0e0;
    padding: 5px;
    transition: 300ms all;
    border-radius: 6px;
  }

  a:hover {
    background-color: ${primaryColor};
    color: white;
  }

  button {
    width: 100%;
    margin: 5px 0 0 0;
  }
`;
