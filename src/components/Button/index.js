import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Button = styled.button`
  background-color: ${primaryColor};
  border: 0;
  padding: 10px 20px;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  transition: 300ms all;
  font-weight: bold;
  font-size: 17px;

  :active {
    transform: scale(1.05, 1.05);
  }
`;
