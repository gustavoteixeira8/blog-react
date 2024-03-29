import React, { useCallback, useEffect, useState } from 'react';
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
import { browserHistory } from '../../services/browserHistory';
import { DeleteCategoryBox } from './styled';
import { HelmetTags } from '../../components/Helmet';

export const UpdateAndDeleteCategory = (props) => {
  const categorySlug = get(props, 'match.params.categorySlug', '');

  const [isUpdateLayout, setIsUpdateLayout] = useState(true);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('INITIAL_STATE');
  const [possibleSlug, setPossibleSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCategory = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/category/${categorySlug}`);

      const categoryStored = get(response, 'data.body.data', {});

      setCategoryId(categoryStored.id);
      setCategoryName(categoryStored.name);
      setPossibleSlug(categoryStored.slug);
      setIsLoading(false);
    } catch (error) {
      toast.error('Category not found');
      browserHistory.push('/category');
    }
  }, [setIsLoading, categorySlug]);

  useEffect(() => {
    if (categoryName === 'INITIAL_STATE') {
      getCategory();
    }
  }, [getCategory, categoryName]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const { isValid, message } = validateCategoryName(categoryName);

    if (!isValid) {
      toast.error(message);
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.put(`/category/${categoryId}`, { name: categoryName });
      const message = get(response, 'data.body.message', ['Category was successfully updated']);

      toast.success(message[0]);
      setIsLoading(false);
      browserHistory.push(`/category/update/${possibleSlug}`);
    } catch (error) {
      const errors = get(error, 'response.data.body.message', []);
      const status = get(error, 'response.data.status', 500);

      if (status >= 400 && status <= 499) {
        errors.map((e, index) => toast.error(e, { toastId: index }));
      } else {
        toast.error('Internal error, try again later');
      }
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/category/${categoryId}`);
      const message = get(response, 'data.body.message', ['Category was successfully deleted']);

      toast.success(message[0]);

      setIsLoading(false);
      browserHistory.push('/category');
    } catch (error) {
      const errors = get(error, 'response.data.body.message', []);
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
      <HelmetTags title={isUpdateLayout ? 'Update category' : 'Delete category'} />

      <Loading isLoading={isLoading} />

      <Container>
        {isUpdateLayout ? (
          <>
            <Title>Update category</Title>

            <Form onSubmit={handleUpdateSubmit}>
              <label htmlFor="name">
                Category name
                <input
                  name="name"
                  placeholder="Enter a category name"
                  type="text"
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
                <small>
                  <p onClick={() => setIsUpdateLayout(false)}>Delete category</p>
                </small>
              </label>

              <Button type="submit">Update category</Button>
            </Form>
          </>
        ) : (
          <DeleteCategoryBox>
            <p onClick={() => setIsUpdateLayout(true)} id="change-to-update">
              Back to update
            </p>

            <Title>Delete category: {categoryName}</Title>

            <p>
              It is not possible to delete categories that are related to an article. When you
              delete a category, you will not be able to recover it.
            </p>

            <Button type="submit" big onClick={handleDelete}>
              Delete category
            </Button>
          </DeleteCategoryBox>
        )}
      </Container>
    </>
  );
};
