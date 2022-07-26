import React, { useCallback, useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { HelmetTags } from '../../components/Helmet';
import {
  Card,
  CardContext,
  CardImageContainer,
  CardsContainer,
  CardText,
  CardTitle,
} from '../../components/Card';
import { Container } from '../../styles/globalStyles';
import { HomeContainer, CategoryBox, ArticleDetails } from './styled';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { formatDistanceDate } from '../../utils/formatDate';
import { useLocation } from 'react-router-dom';
import { browserHistory } from '../../services/browserHistory';

export const Home = () => {
  const search = useLocation().search;
  const categorySlugFormURL = new URLSearchParams(search).get('cn');

  const [isLoading, setIsLoading] = useState(false);
  const perPage = 20;
  const [categories, setCategories] = useState([]);
  const [categoriesPage, setCategoriesPage] = useState(1);

  const [articles, setArticles] = useState([]);
  const [articlesPage, setArticlesPage] = useState(1);
  const [categoryName, setCategoryName] = useState(categorySlugFormURL || '');

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/category', { params: { page: categoriesPage, perPage } });

      const categoriesStored = get(response, 'data.body.data.data', []);

      const slicedCategories = categories.slice(0, perPage * categoriesPage);

      const categoriesUpdated = [...slicedCategories, ...categoriesStored];

      setCategories(categoriesUpdated);
      setCategoriesPage(categoriesPage + 1);
      setIsLoading(false);
    } catch (error) {
      toast.error('Internal error, try again later');
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
      console.log(axios.defaults.headers.common);
      const response = await axios.get('/article', {
        params: {
          isPublic: true,
          isDeleted: false,
          perPage,
          page: articlesPage,
          ...(categoryName ? { categoryName } : null),
        },
      });

      const articlesStored = get(response, 'data.body.data.data', []);

      const slicedArticles = articles.slice(0, perPage * articlesPage);

      const articlesUpdated = [...slicedArticles, ...articlesStored];

      setArticles(articlesUpdated);
      setArticlesPage(articlesPage + 1);
      setIsLoading(false);
    } catch (error) {
      toast.error('Internal error, try again later');
      setIsLoading(false);
    }
  }, [articles, articlesPage, categoryName]);

  const handleClickLoadMoreArticles = async () => {
    const math = perPage * articlesPage - perPage;

    if (articles.length < math) {
      return;
    }

    await getArticles();
  };

  const handleClickCategoryName = async (e) => {
    const targetTitle = e.target.getAttribute('title');

    if (categoryName === targetTitle) return;

    if (categorySlugFormURL) browserHistory.replace({ search: '' });

    setArticles([]);
    setArticlesPage(1);
    setCategoryName(targetTitle);
  };

  const handleQueryParams = useCallback(async () => {
    if (!categorySlugFormURL) return;

    try {
      const response = await axios.get(`/category/${categorySlugFormURL}`);

      const categoryName = get(response, 'data.body.data.category.name');

      setCategoryName(categoryName);
    } catch (error) {
      toast.error('Internal error, try again later');
    }
  }, [categorySlugFormURL]);

  useEffect(() => {
    if (categories.length === 0 && categoriesPage === 1) {
      getCategories();
    }

    if (articles.length === 0 && articlesPage === 1) {
      if (categorySlugFormURL) handleQueryParams();
      getArticles();
    }
  }, [
    getCategories,
    handleQueryParams,
    categories,
    categoriesPage,
    categorySlugFormURL,
    articles,
    articlesPage,
    getArticles,
  ]);

  return (
    <>
      <HelmetTags title="Home" />
      <Loading isLoading={isLoading} />
      <HomeContainer>
        <Container style={{ maxWidth: '960px' }}>
          {categoryName ? (
            <>
              <p onClick={handleClickCategoryName} id="removeCategoriesButton">
                Back
              </p>
              <Title>Results for {categoryName}</Title>
            </>
          ) : null}

          <CardsContainer style={{ marginTop: '0' }}>
            {articles.length > 0 ? (
              articles.map((article) => {
                return (
                  <Card key={article.id} style={{ maxWidth: '1280px', margin: '15px auto' }}>
                    <CardContext>
                      {article.thumbnail ? (
                        <Link to={`/article/${article.slug}`}>
                          <CardImageContainer>
                            <img src={article.thumbnail} alt={article.title} />
                          </CardImageContainer>
                        </Link>
                      ) : (
                        ''
                      )}

                      <CardTitle style={{ fontSize: '38px', textDecoration: 'underline' }}>
                        <Link to={`/article/${article.slug}`}>{article.title}</Link>
                      </CardTitle>

                      <CardText style={{ fontSize: '18px' }}>
                        <ArticleDetails>
                          <p>Posted {formatDistanceDate(new Date(article.createdAt))}</p>
                          <p>
                            {article.categories.map((category, i) => {
                              return (
                                <span
                                  key={category.id}
                                  onClick={handleClickCategoryName}
                                  title={category.name}
                                >
                                  {category.name}
                                  {article.categories.length === i + 1 ? '' : ','}
                                </span>
                              );
                            })}
                          </p>
                        </ArticleDetails>
                      </CardText>
                    </CardContext>
                  </Card>
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
                <p key={category.id} onClick={handleClickCategoryName} title={category.name}>
                  {category.name}
                </p>
              );
            })}
            <Button onClick={handleClickLoadMoreCategories}>Load more</Button>
          </CategoryBox>
        </Container>
      </HomeContainer>
    </>
  );
};
