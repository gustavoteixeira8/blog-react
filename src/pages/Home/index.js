import React, { useCallback, useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import {
  Card,
  CardImageContainer,
  CardsContainer,
  CardText,
  CardTitle,
} from '../../components/Card';
import { Container } from '../../styles/globalStyles';
import { HomeContainer, CategoryBox } from './styled';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const perPage = 20;
  const [categories, setCategories] = useState([]);
  const [categoriesPage, setCategoriesPage] = useState(1);

  const [articles, setArticles] = useState([]);
  const [articlesPage, setArticlesPage] = useState(1);

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/category', { params: { page: categoriesPage, perPage } });

      const categoriesStored = get(response, 'data.body.data', []);

      const slicedCategories = categories.slice(0, perPage * categoriesPage);

      const categoriesUpdated = [...slicedCategories, ...categoriesStored];

      setCategories(categoriesUpdated);
      setCategoriesPage(categoriesPage + 1);
    } catch (error) {
      toast.error('Internal error, try again later');
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, categories, categoriesPage, perPage]);

  const handleClickLoadMoreCategories = async (e) => {
    await getCategories();

    const math = perPage * categoriesPage - perPage;

    if (categories.length < math) {
      e.target.style.display = 'none';
      return;
    }
  };

  const getArticles = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('/article', {
        params: { perPage, page: articlesPage },
      });

      const articlesStored = get(response, 'data.body.articles.data', []);

      const slicedArticles = articles.slice(0, perPage * articlesPage);

      const articlesUpdated = [...slicedArticles, ...articlesStored];

      setArticles(articlesUpdated);
      setArticlesPage(articlesPage + 1);
    } catch (error) {
      toast.error('Internal error, try again later');
    } finally {
      setIsLoading(false);
    }
  }, [articles, articlesPage]);

  const handleClickLoadMoreArticles = async (e) => {
    await getArticles();

    const math = perPage * articlesPage - perPage;

    if (articles.length < math) {
      e.target.style.display = 'none';
      return;
    }
  };

  useEffect(() => {
    try {
      if (categories.length === 0 && categoriesPage === 1) {
        getCategories();
      }

      if (articles.length === 0 && articlesPage === 1) {
        getArticles();
      }
    } catch (error) {
      return;
    }
  }, [getCategories, categories, categoriesPage, articles, articlesPage, getArticles]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <HomeContainer>
        <Container style={{ maxWidth: '960px' }}>
          <Title>Articles</Title>

          <CardsContainer>
            {articles.length > 0 ? (
              articles.map((article) => {
                return (
                  <Link
                    key={article.id}
                    to={`/article/${article.slug}`}
                    style={{ width: '100%', maxWidth: '1280px' }}
                    title={`Read article ${article.title}`}
                  >
                    <Card key={article.id} style={{ maxWidth: '1280px', margin: '15px auto' }}>
                      <CardImageContainer>
                        {article.thumbnail ? (
                          <img src={article.thumbnail} />
                        ) : (
                          <p>No image found</p>
                        )}
                      </CardImageContainer>

                      <CardTitle style={{ fontSize: '25px' }}>{article.title}</CardTitle>

                      <CardText style={{ fontSize: '18px' }}>
                        <ul style={{ display: 'inline-block', textAlign: 'left' }}>
                          <li title={article.createdAt}>
                            Categories:{' '}
                            {article.categories.map((category) => category.name).join(', ')}
                          </li>

                          <li title={article.createdAt}>Author: {article.user.username}</li>

                          <li title={article.updatedAt}>
                            Last update: {formatDate(article.updatedAt)}
                          </li>
                        </ul>
                      </CardText>
                    </Card>
                  </Link>
                );
              })
            ) : (
              <Card style={{ maxWidth: '800px', margin: '8px auto' }}>
                <CardTitle>No articles found</CardTitle>
              </Card>
            )}
          </CardsContainer>

          <Button big onClick={handleClickLoadMoreArticles}>
            Load more
          </Button>
        </Container>

        <Container style={{ maxWidth: '280px' }} className="container-category">
          <CategoryBox>
            <h1>Categories</h1>
            {categories.map((category) => {
              return (
                <Link
                  title={category.name}
                  key={category.id}
                  to={`/article/category/${category.slug}`}
                >
                  {category.name}
                </Link>
              );
            })}
            <Button onClick={handleClickLoadMoreCategories}>Load more</Button>
          </CategoryBox>
        </Container>
      </HomeContainer>
    </>
  );
};
