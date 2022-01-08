import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const ArticleContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const TextContainer = styled.article`
  font-size: 1.3rem;
  width: 100%;
  margin: 30px auto;
  word-spacing: 1px;
  overflow: hidden;
  line-height: 33px;
  white-space: pre-wrap;

  pre[class*='language-'] {
    border-radius: 5px;
  }

  pre[class*='language-'] code {
    font-size: 18px;
  }

  @media (max-width: 850px) {
    pre[class*='language-'] code {
      font-size: 16px !important;
    }
  }
`;

export const ArticleDetails = styled.div`
  width: 100%;
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  margin-top: 15px;
  color: ${primaryDarkColor};

  a {
    margin-right: 6px;
    text-decoration: none;
    color: ${primaryDarkColor};
  }

  a:hover {
    color: ${primaryColor};
  }
`;

export const ThumbnailContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  margin-bottom: 30px;

  img {
    max-width: 100%;
    height: auto;
  }

  p {
    color: white;
  }

  @media (max-width: 850px) {
    height: auto;
  }
`;
