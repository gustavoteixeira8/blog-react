import React from 'react';
import { Container } from '../../styles/globalStyles';
import { AboutContainer } from './styled';
import { Title } from '../../components/Title';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HelmetTags } from '../../components/Helmet';

export const About = () => {
  return (
    <>
      <HelmetTags title="About" />

      <Container style={{ maxWidth: '980px' }}>
        <AboutContainer>
          <div className="github-about">
            <Title>GitHub</Title>
            <Link to={{ pathname: 'https://github.com/gustavoteixeira8' }} target="_blank">
              <FaGithub className="github-about-icon" />
            </Link>
          </div>

          <div className="linkedin-about">
            <Title>LinkedIn</Title>
            <Link
              to={{ pathname: 'https://www.linkedin.com/in/gustavoteixeira8/' }}
              target="_blank"
            >
              <FaLinkedin className="linkedin-about-icon" />
            </Link>
          </div>

          <div className="twitter-about">
            <Title>Twitter</Title>
            <Link to={{ pathname: 'https://twitter.com/gustvot8' }} target="_blank">
              <FaTwitter className="twitter-about-icon" />
            </Link>
          </div>
        </AboutContainer>
      </Container>
    </>
  );
};
