import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardsContainer, CardText, CardTitle } from '../../components/Card';
import { Button } from '../../components/Button';
import { Container } from '../../styles/globalStyles';
import { ContainerUtilityLinks, UtilityLinks } from './styled';
import { Title } from '../../components/Title';
import { Loading } from '../../components/Loading';
import { HelmetTags } from '../../components/Helmet';
import { get } from 'lodash';
import axios from '../../services/axios';

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesTotal, setCategoriesTotal] = useState(0);
  const [articlesTotal, setArticlesTotal] = useState(0);
  const [usersTotal, setUsersTotal] = useState(0);

  const getUsers = async () => {
    try {
      const response = await axios.get('/user');

      const users = get(response, 'data.body.data.data', []);
      const maxPage = get(response, 'data.body.data.maxPage', 1);

      setUsersTotal(users.length * maxPage);
    } catch (error) {
      setUsersTotal('Not found');
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('/category');

      const categories = get(response, 'data.body.data.data', []);
      const maxPage = get(response, 'data.body.data.maxPage', 1);

      setCategoriesTotal(categories.length * maxPage);
    } catch (error) {
      setCategoriesTotal('Not found');
    }
  };

  const getArticles = async () => {
    try {
      const response = await axios.get('/article/my/articles');

      const articles = get(response, 'data.body.data.data', []);
      const maxPage = get(response, 'data.body.data.maxPage', 1);

      setArticlesTotal(articles.length * maxPage);
    } catch (error) {
      setArticlesTotal('Not found');
    }
  };

  useEffect(() => {
    if (!articlesTotal || !categoriesTotal || !usersTotal) {
      Promise.all([getUsers(), getArticles(), getCategories()]);
    }
  }, [setIsLoading, articlesTotal, categoriesTotal, usersTotal]);

  return (
    <>
      <HelmetTags title="Dashboard" />
      <Loading isLoading={isLoading} />

      <Container style={{ maxWidth: '1280px' }}>
        <Title>Dashboard</Title>

        <CardsContainer>
          <Card>
            <CardTitle>Articles</CardTitle>
            <CardText>{articlesTotal}</CardText>
          </Card>

          <Card>
            <CardTitle>Categories</CardTitle>
            <CardText>{categoriesTotal}</CardText>
          </Card>

          <Card>
            <CardTitle>Users</CardTitle>
            <CardText>{usersTotal}</CardText>
          </Card>
        </CardsContainer>

        <ContainerUtilityLinks>
          <UtilityLinks>
            <Title style={{ fontSize: '40px' }}>Article</Title>

            <Link to="/my/article" className="utility-link">
              <Button type="button">My articles</Button>
            </Link>

            <Link to="/article/new" className="utility-link">
              <Button type="button">Post a new article</Button>
            </Link>
          </UtilityLinks>

          <UtilityLinks>
            <Title style={{ fontSize: '40px' }}>Category</Title>

            <Link to="/category" className="utility-link">
              <Button type="button">Categories</Button>
            </Link>

            <Link to="/category/new" className="utility-link">
              <Button type="button">Create a new category</Button>
            </Link>
          </UtilityLinks>

          <UtilityLinks>
            <Title style={{ fontSize: '40px' }}>Admin</Title>

            <Link to="/account/all" className="utility-link">
              <Button type="button">View All Users</Button>
            </Link>

            <Link to="/register" className="utility-link">
              <Button type="button">Register a new user</Button>
            </Link>
          </UtilityLinks>

          <UtilityLinks>
            <Title style={{ fontSize: '40px' }}>Account</Title>

            <Link to="/account" className="utility-link">
              <Button type="button">Edit account</Button>
            </Link>
          </UtilityLinks>
        </ContainerUtilityLinks>
      </Container>
    </>
  );
};
