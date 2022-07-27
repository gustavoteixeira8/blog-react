import React from 'react';
import { FooterContainer } from './styled';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <FooterContainer>
      <h1>Gustavo Teixeira</h1>

      <h1>
        <Link
          className="footer-links github-icon"
          to={{ pathname: 'https://github.com/gustavoteixeira8' }}
          target="_blank"
        >
          <FaGithub />
        </Link>

        <Link
          className="footer-links linkedin-icon"
          to={{ pathname: 'https://www.linkedin.com/in/gustavoteixeira8/' }}
          target="_blank"
        >
          <FaLinkedin />
        </Link>

        <Link
          className="footer-links twitter-icon"
          to={{ pathname: 'https://twitter.com/gustvot8' }}
          target="_blank"
        >
          <FaTwitter />
        </Link>
      </h1>
    </FooterContainer>
  );
};
