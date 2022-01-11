import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { appConfig } from '../../config/app';

export const HelmetTags = ({ title, description, keywords, ogTags, twitterTags }) => {
  return (
    <Helmet>
      <meta name="author" content="Gustavo Teixeira" />
      <title>Blog - {title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={ogTags.title} />
      <meta property="og:description" content={ogTags.description} />
      <meta property="og:site_name" content={appConfig.appUrl} />
      <meta property="og:type" content={ogTags.type} />
      <meta property="og:image" content={ogTags.image} />
      <meta property="og:image:url" content={ogTags.imageUrl} />
      <meta property="og:image:alt" content={ogTags.imageAlt} />
      <meta property="og:url" content={ogTags.url} />

      <meta name="twitter:site" content={twitterTags.site} />
      <meta name="twitter:title" content={twitterTags.title} />
      <meta name="twitter:description" content={twitterTags.description} />
      <meta name="twitter:creator" content={twitterTags.creator} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={twitterTags.url} />
      <meta name="twitter:image" content={twitterTags.image} />
      <meta name="twitter:image:alt" content={twitterTags.imageAlt} />
    </Helmet>
  );
};

HelmetTags.defaultProps = {
  title: '',
  ogTags: {},
  twitterTags: {},
  description: '',
  keywords: '',
};

HelmetTags.propTypes = {
  title: PropTypes.string,
  ogTags: PropTypes.object,
  twitterTags: PropTypes.object,
  description: PropTypes.string,
  keywords: PropTypes.string,
};
