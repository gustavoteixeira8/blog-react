import styled from 'styled-components';
import { primaryBlueColor, primaryColor, primaryDarkColor } from '../../config/colors';

export const FooterContainer = styled.footer`
  background-color: ${primaryColor};
  width: 100%;
  padding: 10px;
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin-top: 40px;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: white;
    font-size: 22px;
    display: flex;
    align-items: center;
  }

  .copyright {
    font-size: 24px;
    margin-left: 5px;
  }

  .footer-links {
    margin: 10px 5px 0 5px;
    color: white;
    font-size: 23px;
  }

  .github-icon:hover {
    color: ${primaryDarkColor};
  }

  .twitter-icon:hover {
    color: ${primaryBlueColor};
  }
`;
