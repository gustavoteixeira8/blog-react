import React, { useCallback, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Container } from '../../styles/globalStyles';
import { editorConfig } from '../../config/editor';
import { generateSlug } from '../../utils/generateSlug';
import { Title } from '../../components/Title';
import { Form, FormFile } from '../../components/Form';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { Card, CardsContainer, CardText, CardTitle } from '../../components/Card';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { CategoriesChoosedContainer, SkipPage } from './styled';
import {
  validateArticleText,
  validateArticleTitle,
  validateNumberOfCategories,
} from '../../validations';

export const CreateArticle = () => {
  const [isArticleLayout, setIsArticleLayout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isPublic, setIsPublic] = useState(0);
  const [possibleSlug, setPossibleSlug] = useState('possible-slug');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState();

  // categories
  const [categories, setCategories] = useState([]);
  const [choosedCategories, setChoosedCategories] = useState([]);
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

  const addChoosedCategories = (e) => {
    const categoryName = e.target.getAttribute('property');
    const categoryId = e.target.getAttribute('accessKey');

    const categoryExists = choosedCategories.filter(
      (category) => category.categoryId === categoryId,
    );

    if (categoryExists.length) {
      return;
    }

    if (choosedCategories.length > 4) {
      toast.error('Maximum of categories are 5');
      return;
    }

    const newCategories = [...choosedCategories];
    newCategories.push({ categoryName, categoryId });

    setChoosedCategories(newCategories);
  };

  const removeChoosedCategories = (e) => {
    const categoryId = e.target.getAttribute('accessKey');

    const newCategories = choosedCategories.filter(
      (category) => category.categoryId !== categoryId,
    );

    setChoosedCategories(newCategories);
  };

  const submitThumbnail = async () => {
    try {
      const articleCreated = await axios.get(`/user/me/article/${possibleSlug}`);
      const articleId = get(articleCreated, 'data.body.article.id');

      const thumbnailForm = new FormData();
      thumbnailForm.append('articleThumbnail', thumbnailFile);

      await axios.put(`/article/${articleId}/thumbnail`, thumbnailForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Thumbnail created successfully');
    } catch (error) {
      const errors = get(error, 'response.data.body.errors', []);
      const status = get(error, 'response.data.status', 500);

      if (status >= 400 && status <= 499) {
        errors.map((err, i) => toast.error(err, { toastId: i }));
      } else {
        toast.error('Internal error, try again later');
      }
    }
  };

  const submitArticle = async (e) => {
    e.preventDefault();

    const validators = [
      validateArticleTitle(title),
      validateArticleText(text),
      validateNumberOfCategories(choosedCategories),
    ];

    const isInvalidArticle = validators.map((validator) => validator.isValid).includes(false);

    if (isInvalidArticle) {
      validators.map(({ message }) => toast.error(message, { toastId: Math.random() }));
      return;
    }

    try {
      setIsLoading(true);
      const categoriesId = choosedCategories.map(({ categoryId }) => categoryId);
      const response = await axios.post('/article', {
        title,
        isPublic: Boolean(Number(isPublic)),
        text,
        categoriesId,
      });

      const createArticleMessage = get(
        response,
        'data.body.message',
        'Article created successfully',
      );

      if (thumbnailFile) await submitThumbnail();

      setTitle('');
      setPossibleSlug('');
      setText('');
      setIsPublic(0);
      setChoosedCategories([]);
      setThumbnailURL('');
      setThumbnailFile();

      toast.success(createArticleMessage);
      setIsLoading(false);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setThumbnailFile(file);

    if (!file) {
      setThumbnailURL('');
      return;
    }

    const fileURL = URL.createObjectURL(file);
    setThumbnailURL(fileURL);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container style={{ maxWidth: '1280px' }}>
        {!isArticleLayout ? (
          <>
            <SkipPage className="skip-page" onClick={() => setIsArticleLayout(true)}>
              Next
            </SkipPage>
            <Title>Choose category</Title>

            <CategoriesChoosedContainer>
              {choosedCategories.map((category) => {
                return (
                  <Button
                    key={category.categoryId}
                    onClick={removeChoosedCategories}
                    accessKey={category.categoryId}
                    title="Clicking on this category will remove it"
                  >
                    &times; {category.categoryName}
                  </Button>
                );
              })}
            </CategoriesChoosedContainer>

            <CardsContainer>
              {categories.map((category) => {
                return (
                  <Card key={category.id}>
                    <CardTitle>{category.name}</CardTitle>
                    <small style={{ textAlign: 'center', display: 'block' }}>{category.slug}</small>
                    <CardText>
                      <Button
                        onClick={addChoosedCategories}
                        accessKey={category.id}
                        property={category.name}
                      >
                        Choose category
                      </Button>
                    </CardText>
                  </Card>
                );
              })}

              <Button big onClick={handleClick}>
                Load more
              </Button>
            </CardsContainer>
          </>
        ) : (
          <>
            <SkipPage className="skip-page" onClick={() => setIsArticleLayout(false)}>
              Back
            </SkipPage>

            <Title>Create a new article</Title>

            <FormFile>
              <label htmlFor="thumbnail">
                {thumbnailURL ? (
                  <img src={thumbnailURL} alt="Thumbnail" />
                ) : (
                  <p>Click here to select an image</p>
                )}
                <input type="file" id="thumbnail" onChange={handleImageChange} />
              </label>
            </FormFile>

            <CategoriesChoosedContainer>
              {choosedCategories.length ? (
                <h1>
                  Categories <span>&darr;</span>
                </h1>
              ) : (
                ''
              )}
              {choosedCategories.map((category) => {
                return (
                  <Button key={category.categoryId} title={category.categoryName}>
                    {category.categoryName}
                  </Button>
                );
              })}
            </CategoriesChoosedContainer>

            <Form onSubmit={submitArticle}>
              <label htmlFor="title" style={{ maxWidth: '100%' }}>
                Title
                <input
                  name="title"
                  placeholder="Enter a title"
                  type="text"
                  autoFocus
                  autoComplete="off"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setPossibleSlug(generateSlug(e.target.value));
                  }}
                  value={title}
                />
              </label>

              <label htmlFor="possibleSlug" style={{ maxWidth: '100%' }}>
                Possible slug
                <input
                  name="possibleSlug"
                  placeholder="possible-slug"
                  disabled
                  type="text"
                  autoComplete="off"
                  value={possibleSlug}
                />
              </label>

              <label htmlFor="isPublic" style={{ maxWidth: '100%' }}>
                Is public article ?
                <select name="isPublic" onChange={(e) => setIsPublic(e.target.value)}>
                  <option value={0}>NO</option>
                  <option value={1}>YES</option>
                </select>
              </label>

              <label style={{ maxWidth: '100%' }} htmlFor="text">
                Type the text
                <Editor
                  textareaName="text"
                  apiKey={editorConfig.apiKey}
                  initialValue=""
                  init={editorConfig.config}
                  onEditorChange={(newValue) => setText(newValue)}
                  onInit={(evt, editor) => editor.setContent(text)}
                  value={text}
                />
              </label>

              <Button medium>Post a new article</Button>
            </Form>
          </>
        )}
      </Container>
    </>
  );
};
