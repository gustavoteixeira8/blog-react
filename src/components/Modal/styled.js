import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: -100%;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  transition: 800ms all;

  span {
    color: white;
    font-weight: bold;
    font-size: 50px;
  }
`;

export const BoxModal = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background-color: white;
  box-shadow: 0px 0px 15px 0px #010101;
  border-radius: 7px;
  border-bottom: 5px solid ${primaryColor};

  p.close-modal {
    text-align: right;
    font-size: 30px;
    color: red;
    cursor: pointer;
  }
`;
