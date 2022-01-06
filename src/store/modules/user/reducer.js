import * as types from '../types';

const initialUserState = {
  isLoading: false,
  data: {
    id: '',
    fullName: '',
    email: '',
    username: '',
    isAdmin: '',
    isEmailVerified: '',
    createdAt: '',
    updatedAt: '',
  },
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case types.FETCH_USER_LOGGED_IN_REQUEST: {
      const newState = { ...initialUserState };
      newState.isLoading = true;
      return newState;
    }

    case types.FETCH_USER_LOGGED_IN_SUCCESS: {
      const newState = { ...initialUserState };
      newState.data = action.payload.data;
      newState.isLoading = false;
      return newState;
    }

    case types.FETCH_USER_LOGGED_IN_ERROR: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    case types.UPDATE_USER_LOGGED_IN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case types.DELETE_USER_LOGGED_IN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    default: {
      return state;
    }
  }
};
