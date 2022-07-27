import React, { useCallback, useEffect, useState } from 'react';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { formatDate } from '../../utils/formatDate';
import { Card, CardImageContainer, CardText, CardTitle } from '../../components/Card';
import { Container } from '../../styles/globalStyles';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { browserHistory } from '../../services/browserHistory';
import { get } from 'lodash';
import { HelmetTags } from '../../components/Helmet';

export const DeleteArticle = (props) => {
  const articleSlug = get(props, 'match.params.articleSlug', '');

  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getArticle = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/article/${articleSlug}`);

      const articleStored = get(response, 'data.body.data', null);

      setArticle(articleStored);
      setIsLoading(false);
    } catch (error) {
      const errors = get(error, 'response.data.body.message', []);
      const status = get(error, 'response.data.status', 500);

      if (status >= 400 && status <= 499) {
        errors.map((err, i) => toast.error(err, { toastId: i }));
        browserHistory.push('/my/article');
      } else {
        toast.error('Internal error, try again later');
      }
      setIsLoading(false);
    }
  }, [setIsLoading, articleSlug]);

  useEffect(() => {
    if (!article) getArticle();
  });

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/article/${article.id}`);

      const message = get(response, 'data.body.message', [
        'Your article will be deleted in 1 month',
      ]);

      toast.success(message[0]);
      browserHistory.push('/my/article');
    } catch (error) {
      const errors = get(error, 'response.data.body.errors', []);
      const status = get(error, 'response.data.status', 500);

      if (status >= 400 && status <= 499) {
        errors.map((err, i) => toast.error(err, { toastId: i }));
      } else {
        toast.error('Internal error, try again later');
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <HelmetTags title="Delete article" />

      <Loading isLoading={isLoading} />

      <Container>
        <Title style={{ margin: '0 auto 20px auto' }}>Delete article</Title>
        <p style={{ fontSize: '22px', textAlign: 'center' }}>
          When you delete an article you have 1 month to recover it, after that it will be
          permanently deleted.
        </p>

        {article ? (
          <Card key={article.id} style={{ maxWidth: '800px', margin: '30px auto' }}>
            <CardImageContainer>
              {article.thumbnail ? <img src={article.thumbnail} /> : <p>No image found</p>}
            </CardImageContainer>

            <CardTitle style={{ fontSize: '25px', textDecoration: 'underline' }}>
              <a
                href={`/article/${article.slug}`}
                target="_blank"
                rel="noreferrer"
                title="Click to read"
              >
                {article.title}
              </a>
            </CardTitle>

            <small style={{ textAlign: 'center', display: 'block' }}>{article.slug}</small>

            <CardText style={{ fontSize: '18px' }}>
              <ul style={{ display: 'inline-block', textAlign: 'left' }}>
                <li title={article.isPublic ? 'YES' : 'NO'}>
                  Is public: {article.isPublic ? 'YES' : 'NO'}
                </li>

                <li title={article.createdAt}>
                  Categories: {article.categories.map((category) => category.name).join(', ')}
                </li>

                <li title={article.createdAt}>Author: {article.user.username}</li>

                <li title={article.createdAt}>Created at: {formatDate(article.createdAt)}</li>

                <li title={article.updatedAt}>Last update: {formatDate(article.updatedAt)}</li>

                <li title={article.deletedAt ? formatDate(article.deletedAt) : 'NOT DELETED'}>
                  Deleted at:
                  {article.deletedAt ? ' ' + formatDate(article.deletedAt) : ' NOT DELETED'}
                </li>
              </ul>
            </CardText>
          </Card>
        ) : (
          ''
        )}

        <Button big onClick={handleClick}>
          Delete article
        </Button>
      </Container>
    </>
  );
};
