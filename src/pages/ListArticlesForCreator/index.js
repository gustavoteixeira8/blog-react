import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '../../styles/globalStyles';
import { Loading } from '../../components/Loading';
import { Title } from '../../components/Title';
import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import {
  Card,
  CardImageContainer,
  CardsContainer,
  CardText,
  CardTitle,
} from '../../components/Card';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/formatDate';

export const ListArticlesForCreator = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('createdAt');
  const [next, setNext] = useState(20);
  const perPage = 20;
  const buttonLoadMore = document.querySelector('.loadMoreButton');

  // Search params
  const [articleTitle, setArticleTitle] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [isPublic, setIsPublic] = useState();
  const [isDeleted, setIsDeleted] = useState();

  const searchArticles = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('/user/me/article', {
        params: { perPage, order, isPublic, categoryName, articleTitle, isDeleted },
      });

      const articlesStored = get(response, 'data.body.articles.data', []);

      setArticles(articlesStored);
    } catch (error) {
      toast.error('Internal error, try again later');
    } finally {
      setIsLoading(false);
      setPage(2);
      setNext(perPage * 2);
    }
  }, [setIsLoading, order, perPage, isPublic, categoryName, articleTitle, isDeleted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await searchArticles();
    buttonLoadMore.style.display = 'block';
  };

  useEffect(() => {
    try {
      if (articles.length === 0 && page === 1) {
        searchArticles();
      }
    } catch (error) {
      return;
    }
  }, [searchArticles, articles, page, next]);

  const loadMoreArticles = async (start = 0, end = next) => {
    try {
      setIsLoading(true);

      const response = await axios.get('/user/me/article', {
        params: { perPage, order, page, isPublic, categoryName, articleTitle, isDeleted },
      });

      const articlesStored = get(response, 'data.body.articles.data', []);

      const slicedArticles = articles.slice(start, end);

      const articlesUpdated = [...slicedArticles, ...articlesStored];

      setArticles(articlesUpdated);
      setPage(page + 1);
      setNext(next + perPage);
    } catch (error) {
      toast.error('Internal error, try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    const math = perPage * page - perPage;

    if (articles.length < math) {
      buttonLoadMore.style.display = 'none';
      return;
    }

    await loadMoreArticles();
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container style={{ maxWidth: '1280px' }}>
        <Title style={{ margin: '0 0 40px 0' }}>My articles</Title>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="articleTitle">
            Article title
            <input
              name="articleTitle"
              placeholder="Article title"
              type="text"
              onChange={(e) => setArticleTitle(e.target.value)}
              value={articleTitle}
            />
          </label>

          <label htmlFor="categoryName">
            Category name
            <input
              name="categoryName"
              placeholder="Category name"
              type="text"
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
            />
          </label>

          <label htmlFor="isPublic">
            Is public
            <select name="isPublic" onChange={(e) => setIsPublic(e.target.value)}>
              <option value={undefined}>DEFAULT</option>
              <option value={0}>NO</option>
              <option value={1}>YES</option>
            </select>
          </label>

          <label htmlFor="isDeleted">
            Is deleted
            <select name="isDeleted" onChange={(e) => setIsDeleted(e.target.value)}>
              <option value={undefined}>DEFAULT</option>
              <option value={0}>NO</option>
              <option value={1}>YES</option>
            </select>
          </label>

          <label htmlFor="isDeleted">
            Order by created at
            <select name="isDeleted" onChange={(e) => setOrder(e.target.value)}>
              <option value="+createdAt">Descending</option>
              <option value="-createdAt">Ascending</option>
            </select>
          </label>

          <Button>Search</Button>
        </Form>

        <CardsContainer>
          {articles.length > 0 ? (
            articles.map((article) => {
              return (
                <Card key={article.id} style={{ maxWidth: '800px', margin: '8px auto' }}>
                  <CardImageContainer>
                    {article.thumbnail ? <img src={article.thumbnail} /> : <p>No image found</p>}
                  </CardImageContainer>

                  <CardTitle style={{ fontSize: '25px' }}>{article.title}</CardTitle>

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

                      <li title={article.updatedAt}>
                        Last update: {formatDate(article.updatedAt)}
                      </li>

                      <li title={article.deletedAt ? formatDate(article.deletedAt) : 'NOT DELETED'}>
                        Deleted at:
                        {article.deletedAt ? formatDate(article.deletedAt) : 'NOT DELETED'}
                      </li>
                    </ul>
                  </CardText>

                  <Link
                    to={`/article/update/${article.id}`}
                    className="card-links"
                    style={{ margin: '10px auto' }}
                  >
                    <Button medium>UPDATE | DELETE</Button>
                  </Link>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardTitle>No articles found</CardTitle>
            </Card>
          )}
        </CardsContainer>

        <Button className="loadMoreButton" big onClick={handleClick}>
          Load more
        </Button>
      </Container>
    </>
  );
};
