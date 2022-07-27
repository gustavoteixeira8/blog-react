import styled from 'styled-components';
import { primaryBlueColor, primaryDarkColor, secondaryBlueColor } from '../../config/colors';

export const AboutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .github-about,
  .twitter-about,
  .linkedin-about {
    width: 30%;
    text-align: center;
    margin: 0 20px;
  }

  .twitter-about-icon,
  .github-about-icon,
  .linkedin-about-icon {
    font-size: 80px;
    cursor: pointer;
    color: black;
  }

  .linkedin-about-icon:hover {
    color: ${secondaryBlueColor};
  }

  .twitter-about-icon:hover {
    color: ${primaryBlueColor};
  }
  .github-about-icon:hover {
    color: ${primaryDarkColor};
  }

  @media (max-width: 850px) {
    flex-direction: column;

    .github-about,
    .twitter-about,
    .linkedin-about {
      width: 100%;
      margin: 30px auto;
    }
  }
`;
