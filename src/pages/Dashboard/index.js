import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardsContainer, CardText, CardTitle } from '../../components/Card';
import { Button } from '../../components/Button';
import { Container } from '../../styles/globalStyles';
import { ContainerUtilityLinks, UtilityLinks } from './styled';
import { Title } from '../../components/Title';

export const Dashboard = () => {
  return (
    <Container style={{ maxWidth: '1280px' }}>
      <Title>Dashboard</Title>

      <CardsContainer>
        <Card>
          <CardTitle>Articles</CardTitle>
          <CardText>50</CardText>
        </Card>

        <Card>
          <CardTitle>Categories</CardTitle>
          <CardText>15</CardText>
        </Card>

        <Card>
          <CardTitle>Users</CardTitle>
          <CardText>3</CardText>
        </Card>
      </CardsContainer>

      <ContainerUtilityLinks>
        <UtilityLinks>
          <Title style={{ fontSize: '40px' }}>Article</Title>

          <Link to="/account" className="utility-link">
            <Button type="button">My articles</Button>
          </Link>

          <Link to="/register" className="utility-link">
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

          <Link to="/admin-permission" className="utility-link">
            <Button type="button">Admin permission</Button>
          </Link>
        </UtilityLinks>
      </ContainerUtilityLinks>
    </Container>
  );
};
