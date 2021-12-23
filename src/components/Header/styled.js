import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${primaryColor};
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;

  h1 {
    margin-right: auto;
    color: white;
  }

  a {
    color: white;
    font-size: 20px;
    margin: 0 20px;
  }
`;
