import styled from 'styled-components';
import { primaryBlueColor, primaryDarkColor } from '../../config/colors';

export const AboutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .github-about,
  .twitter-about {
    width: 50%;
    text-align: center;
  }

  .twitter-about-icon,
  .github-about-icon {
    font-size: 80px;
    cursor: pointer;
    color: black;
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
    .twitter-about {
      margin: 30px auto;
    }
  }
`;
