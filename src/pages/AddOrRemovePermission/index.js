import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '../../styles/globalStyles';
import { Title } from '../../components/Title';
import { HelmetTags } from '../../components/Helmet';
import { Form } from '../../components/Form';
import { Loading } from '../../components/Loading';
import { Button } from '../../components/Button';
import { Card, CardTitle, CardsContainer } from '../../components/Card';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { browserHistory } from '../../services/browserHistory';
import { get } from 'lodash';

export const AddOrRemovePermission = (props) => {
  const username = get(props, 'match.params.username', '');
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [addAdmin, setAddAdmin] = useState(false);

  const getUser = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`/user/${username}`);

      const userStored = get(response, 'data.body.user', {});

      setUser(userStored);
      setIsLoading(false);
    } catch (error) {
      toast.error('User not found');
      browserHistory.push('/account/all');
    }
  }, [setIsLoading, username]);

  useEffect(() => {
    if (!Object.keys(user).length) {
      getUser();
    }
  }, [user, getUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      let response;

      if (addAdmin === 'true' || addAdmin === true) {
        response = await axios.put('/user/admin/add', { userId: user.id });
      } else {
        response = await axios.put('/user/admin/remove', { userId: user.id });
      }

      const message = get(response, 'data.body.message', '');

      toast.success(message);

      browserHistory.push('/account/all');
    } catch (error) {
      const status = get(error, 'response.data.status', 500);
      const errors = get(error, 'response.data.body.errors', []);

      if (status >= 400 && status <= 499) {
        errors.map((e, index) => toast.error(e, { toastId: index }));
      } else {
        toast.error('Internal error, try again later');
      }

      setIsLoading(false);
    }
  };

  return (
    <>
      <HelmetTags title="Permission" />

      <Loading isLoading={isLoading} />
      <Container>
        <Title>Permission</Title>

        <CardsContainer style={{ margin: '30px auto' }}>
          <Card style={{ maxWidth: '800px' }}>
            <CardTitle>{user.username}</CardTitle>
            <small style={{ textAlign: 'center', display: 'block' }}>{user.id}</small>
          </Card>
        </CardsContainer>

        <Form onSubmit={handleSubmit}>
          <label htmlFor="fullName">
            Add admin to {user.username} ?
            <select name="isAdmin" onChange={(e) => setAddAdmin(e.target.value)}>
              <option value={false}>NO</option>
              <option value={true}>YES</option>
            </select>
          </label>

          <Button>Submit</Button>
        </Form>
      </Container>
    </>
  );
};
