import React, { useState, useCallback, useEffect } from 'react';
import { Container } from '../../styles/globalStyles';
import { Loading } from '../../components/Loading';
import { Title } from '../../components/Title';
import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import { Card, CardsContainer, CardText, CardTitle } from '../../components/Card';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { formatDate } from '../../utils/formatDate';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

export const ViewAllAccounts = () => {
  const [isAdmin, setIsAdmin] = useState();
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [order] = useState('createdAt');
  const [next, setNext] = useState(20);
  const perPage = 20;

  const searchUsers = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('/user', {
        params: { perPage, order, username, isAdmin },
      });

      const usersStored = get(response, 'data.body.users.data', []);

      setUsers(usersStored);
    } catch (error) {
      toast.error('Internal error, try again later');
    } finally {
      setIsLoading(false);
      setPage(2);
      setNext(perPage * 2);
    }
  }, [setIsLoading, order, perPage, username, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await searchUsers();
  };

  useEffect(() => {
    try {
      if (users.length === 0 && page === 1) {
        searchUsers();
        return;
      }
    } catch (error) {
      return;
    }
  }, [searchUsers, users, page, next]);

  const loadMoreUsers = async (start = 0, end = next) => {
    try {
      setIsLoading(true);

      const response = await axios.get('/user', {
        params: { perPage, order, page, username, isAdmin },
      });

      const usersStored = get(response, 'data.body.users.data', []);

      const slicedUsers = users.slice(start, end);

      const usersUpdated = [...slicedUsers, ...usersStored];

      setUsers(usersUpdated);
      setPage(page + 1);
      setNext(next + perPage);
    } catch (error) {
      toast.error('Internal error, try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    const math = perPage * page - perPage;

    if (users.length < math) return;

    await loadMoreUsers();
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container>
        <Title style={{ margin: '0 0 40px 0' }}>Search an account</Title>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="fullName">
            Username
            <input
              name="username"
              placeholder="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </label>

          <label htmlFor="fullName">
            Is admin
            <select name="isAdmin" onChange={(e) => setIsAdmin(e.target.value)}>
              <option value={undefined}>Default is undefined</option>
              <option value={false}>NO</option>
              <option value={true}>YES</option>
            </select>
          </label>

          <Button>Search</Button>
        </Form>

        <CardsContainer>
          {users.length > 0 ? (
            users.map((user) => {
              return (
                <Card key={user.id} style={{ maxWidth: '800px' }}>
                  <CardTitle style={{ fontSize: '20px' }}>{user.fullName}</CardTitle>

                  <small style={{ textAlign: 'center', display: 'block' }}>{user.username}</small>

                  <CardText style={{ fontSize: '18px' }}>
                    <ul style={{ display: 'inline-block', textAlign: 'left' }}>
                      <li title={user.email}>Email: {user.email}</li>
                      <li title={user.isAdmin ? 'YES' : 'NO'}>
                        Is admin: {user.isAdmin ? 'YES' : 'NO'}
                      </li>
                      <li title={user.isEmailVerified ? 'YES' : 'NO'}>
                        Email is verified: {user.isEmailVerified ? 'YES' : 'NO'}
                      </li>
                      <li title={user.createdAt}>Created at: {formatDate(user.createdAt)}</li>
                      <li title={user.updatedAt}>Last update: {formatDate(user.updatedAt)}</li>
                    </ul>
                  </CardText>

                  <Link
                    to={`add-permission/${user.id}`}
                    className="card-links"
                    style={{ margin: '10px auto' }}
                  >
                    <Button medium>Add permission</Button>
                  </Link>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardTitle>No users found</CardTitle>
            </Card>
          )}
        </CardsContainer>

        <Button big onClick={handleClick}>
          Load more
        </Button>
      </Container>
    </>
  );
};