import React from 'react';
import { Container } from '../../styles/globalStyles';
import { Title } from '../../components/Title';
import { DeleteAccountBox } from './styled';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/modules/user/actions';
import { HelmetTags } from '../../components/Helmet';

export const DeleteAccount = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(userActions.createDeleteUserLoggedInRequest());
  };

  return (
    <>
      <HelmetTags title="Delete account" />

      <Loading isLoading={isLoading} />
      <Container>
        <DeleteAccountBox>
          <Title>Delete my account</Title>

          <p>
            When you delete your account all your articles will be deleted together. You will have
            one month to recover it, just log in with the correct credentials.
          </p>

          <Button onClick={handleClick} type="button" big>
            DELETE MY ACCOUNT
          </Button>
        </DeleteAccountBox>
      </Container>
    </>
  );
};
