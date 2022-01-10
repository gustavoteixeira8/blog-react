import React from 'react';
import { Container } from '../../styles/globalStyles';
import { AboutContainer } from './styled';
import { Title } from '../../components/Title';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <Container>
      <AboutContainer>
        <div className="github-about">
          <Title>GitHub</Title>
          <Link to={{ pathname: 'https://github.com/gustavoteixeira8' }}>
            <FaGithub className="github-about-icon" />
          </Link>
        </div>

        <div className="twitter-about">
          <Title>Twitter</Title>
          <Link to={{ pathname: 'https://github.com/gustavoteixeira8' }}>
            <FaTwitter className="twitter-about-icon" />
          </Link>
        </div>
      </AboutContainer>
    </Container>
  );
};
