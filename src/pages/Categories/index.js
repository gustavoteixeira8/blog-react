import React, { useLayoutEffect, useState } from 'react';
import { Container } from '../../styles/globalStyles';
import { Card, CardsContainer, CardTitle, CardText } from '../../components/Card';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import axios from '../../services/axios';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Categories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [order] = useState('createdAt');
  const [next, setNext] = useState(5);
  const perPage = 5;

  const getCategories = async (start = 0, end = next) => {
    try {
      setIsLoading(true);
      const response = await axios.get('/category', { params: { page, perPage, order } });

      const categoriesStored = get(response, 'data.body.data', []);

      const slicedCategories = categories.slice(start, end);

      const categoriesUpdated = [...slicedCategories, ...categoriesStored];

      setCategories(categoriesUpdated);
      setPage(page + 1);
      setNext(next + perPage);
    } catch (error) {
      toast.error('Internal error, try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (e) => {
    await getCategories(0, next);

    const math = perPage * page - perPage;

    if (categories.length < math) {
      e.target.style.display = 'none';
      return;
    }
  };

  useLayoutEffect(() => {
    if (categories.length === 0) getCategories(0, next);
  });

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container style={{ maxWidth: '1280px' }}>
        <Title>Categories</Title>

        <CardsContainer>
          <Card>
            <CardTitle>Add category</CardTitle>
            <CardText>
              <Button>
                <Link to="/category/new">Create category</Link>
              </Button>
            </CardText>
          </Card>

          {categories.map((category) => {
            return (
              <Card key={category.id}>
                <CardTitle>{category.name}</CardTitle>
                <CardText>
                  <Button>Update</Button>

                  <Button>Delete</Button>
                </CardText>
              </Card>
            );
          })}
        </CardsContainer>

        <Button onClick={handleClick} big id="load-more-categories">
          Load more
        </Button>
      </Container>
    </>
  );
};
