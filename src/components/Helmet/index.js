import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

export const HelmetTags = ({ title, description, keywords, metaTitle, cardTags }) => {
  return (
    <Helmet>
      <meta name="author" content="Gustavo Teixeira" />
      <title>Gustavo Teixeira {title ? ` - ${title}` : ''}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={cardTags.url} />
      <meta property="og:title" content={cardTags.title} />
      <meta property="og:description" content={cardTags.description} />
      <meta property="og:image" content={cardTags.image} />
      <meta property="og:site_name" content="Gustavo Teixeira" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={cardTags.url} />
      <meta property="twitter:title" content={cardTags.title} />
      <meta property="twitter:description" content={cardTags.description} />
      <meta property="twitter:image" content={cardTags.image} />
      <meta name="twitter:creator" content="@gustvot8" />
    </Helmet>
  );
};

HelmetTags.defaultProps = {
  title: '',
  cardTags: {
    url: `https://${window.location.host}`,
    title: 'Gustavo Teixeira',
    description: `Gustavo Teixeira's personal website`,
    image: '',
  },
  metaTitle: `Gustavo Teixeira's personal website`,
  description: `Gustavo Teixeira's personal website`,
  keywords: '',
};

HelmetTags.propTypes = {
  title: PropTypes.string,
  cardTags: PropTypes.object,
  description: PropTypes.string,
  keywords: PropTypes.string,
  metaTitle: PropTypes.string,
};
