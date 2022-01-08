import { get } from 'lodash';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { Container } from '../../styles/globalStyles';
import { Loading } from '../../components/Loading';
import { browserHistory } from '../../services/browserHistory';
import { Title } from '../../components/Title';
import { formatDistanceDate } from '../../utils/formatDate';
import { ArticleContainer, ArticleDetails, TextContainer, ThumbnailContainer } from './styled';
import 'prism-themes/themes/prism-vsc-dark-plus.min.css';
import Prism from 'prismjs';
import { Link } from 'react-router-dom';

export const Article = (props) => {
  useLayoutEffect(() => Prism.highlightAll(false));

  const articleSlug = get(props, 'match.params.articleSlug', '');

  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState({
    id: '',
    title: '',
    text: '',
    slug: '',
    isPublic: '',
    thumbnail: '',
    user: { username: '' },
    categories: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  });

  const getArticle = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/article/${articleSlug}`);

      const articleStored = get(response, 'data.body.article', null);

      setArticle(articleStored);
      setIsLoading(false);
    } catch (error) {
      const errors = get(error, 'response.data.body.errors', []);
      const status = get(error, 'response.data.status', 500);

      if (status >= 400 && status <= 499) {
        errors.map((err, i) => toast.error(err, { toastId: i }));
        browserHistory.push('/');
      } else {
        toast.error('Internal error, try again later');
      }

      setIsLoading(false);
    }
  }, [setIsLoading, articleSlug]);

  const defineArticleText = useCallback(() => {
    const articleTextContainer = document.getElementById('article-text');

    articleTextContainer.innerHTML = article.text;
  }, [article]);

  useEffect(() => {
    if (!article.id) {
      getArticle();
    }
    defineArticleText();
  }, [article, getArticle, defineArticleText]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container style={{ maxWidth: '960px' }}>
        <ArticleContainer>
          {article.thumbnail ? (
            <ThumbnailContainer>
              <img src={article.thumbnail} alt={article.title} />
            </ThumbnailContainer>
          ) : (
            ''
          )}

          <Title
            style={{
              margin: '0px',
              fontSize: '48px',
              textDecoration: 'underline',
              textAlign: 'left',
            }}
          >
            {article.title}
          </Title>
          <ArticleDetails>
            <p>Posted {formatDistanceDate(new Date(article.createdAt))}</p>
            <p>
              {article.categories.map((category, i) => {
                return (
                  <Link key={category.id} to={`/article/category/${category.slug}`}>
                    {category.name}
                    {article.categories.length === i + 1 ? '' : ','}
                  </Link>
                );
              })}
            </p>
          </ArticleDetails>

          <TextContainer id="article-text"></TextContainer>
        </ArticleContainer>
      </Container>
    </>
  );
};
