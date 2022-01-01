import React, { useState, useEffect, useCallback } from 'react';
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
  const [next, setNext] = useState(20);
  const perPage = 20;

  const getCategories = useCallback(
    async (start = 0, end = next) => {
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
    },
    [setIsLoading, categories, next, order, page, perPage],
  );

  const handleClick = async (e) => {
    await getCategories(0, next);

    const math = perPage * page - perPage;

    if (categories.length < math) {
      e.target.style.display = 'none';
      return;
    }
  };

  useEffect(() => {
    try {
      if (categories.length === 0 && page === 1) {
        getCategories();
      }
    } catch (error) {
      return;
    }
  }, [getCategories, categories, page]);

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
                <small style={{ textAlign: 'center', display: 'block' }}>{category.slug}</small>
                <CardText>
                  <Link to={`/category/update/${category.id}`}>
                    <Button>Update | Delete</Button>
                  </Link>
                </CardText>
              </Card>
            );
          })}
        </CardsContainer>

        <Button big onClick={handleClick}>
          Load more
        </Button>
      </Container>
    </>
  );
};
