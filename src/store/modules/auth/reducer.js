import * as types from '../types';

export const initialAuthState = {
  isLoggedIn: false,
  isLoading: false,
  data: {
    accessToken: null,
    userId: null,
  },
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      const newState = { ...state, isLoading: true };
      return newState;
    }
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.isLoading = false;
      newState.data = {
        accessToken: action.payload.accessToken,
        userId: action.payload.userId,
      };
      return newState;
    }
    case types.LOGIN_ERROR: {
      const newState = { ...initialAuthState };
      return newState;
    }
    default: {
      return state;
    }
  }
};
