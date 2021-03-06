import styled from 'styled-components';
import { primaryModalBackgroundColor } from '../../config/colors';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${primaryModalBackgroundColor};
  filter: opacity(0.9);
  transition: 300ms all;

  p {
    color: white;
    font-weight: bold;
    font-size: 50px;
  }
`;
