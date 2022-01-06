import React, { useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { Form } from '../../components/Form';
import { validateCategoryName } from '../../validations';
import { Container } from '../../styles/globalStyles';
import { Button } from '../../components/Button';
import { generateSlug } from '../../utils/generateSlug';
import { Title } from '../../components/Title';
import { Loading } from '../../components/Loading';

export const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [possibleSlug, setPossibleSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, message } = validateCategoryName(categoryName);

    if (!isValid) {
      toast.error(message);
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post('/category', { name: categoryName });
      const message = get(response, 'data.body.message', 'Category was successfully created');

      toast.success(message);

      setCategoryName('');
      setPossibleSlug('');
    } catch (error) {
      const errors = get(error, 'response.data.body.errors', []);
      const status = get(error, 'response.data.status', 500);

      console.log(errors, status);

      if (status >= 400 && status <= 499) {
        errors.map((e, index) => toast.error(e, { toastId: index }));
      } else {
        toast.error('Internal error, try again later');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />

      <Container>
        <Title>Create category</Title>

        <Form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Category name
            <input
              name="name"
              placeholder="Enter a category name"
              type="text"
              autoFocus
              autoComplete="off"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setPossibleSlug(generateSlug(e.target.value));
              }}
            />
          </label>
          <label htmlFor="possibleSlug">
            Possible slug
            <input
              type="text"
              name="possibleSlug"
              disabled
              value={possibleSlug || 'possible-slug'}
            />
          </label>

          <Button type="submit">Create category</Button>
        </Form>
      </Container>
    </>
  );
};
