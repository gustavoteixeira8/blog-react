import React from 'react';
import { Container } from '../../styles/globalStyles';
import { Title } from '../../components/Title';
import { DeleteAccountBox } from './styled';
import { Button } from '../../components/Button';
import { useDispatch } from 'react-redux';
import * as userActions from '../../store/modules/user/actions';

export const DeleteAccount = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(userActions.createDeleteUserLoggedInRequest());
  };

  return (
    <>
      <Container>
        <DeleteAccountBox>
          <Title>Delete my account</Title>

          <p>
            When you delete your account all your articles will be deleted together. You will have
            one month to recover it, just log in with the correct credentials.
          </p>

          <Button onClick={handleClick} type="button">
            DELETE MY ACCOUNT
          </Button>
        </DeleteAccountBox>
      </Container>
    </>
  );
};
