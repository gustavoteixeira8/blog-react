import { useDispatch } from 'react-redux';
import * as authActions from '../../store/modules/auth/actions';

export const GlobalEvents = () => {
  const dispatch = useDispatch();

  window.addEventListener('storage', () => dispatch(authActions.createLogoutRequest()));

  return null;
};
