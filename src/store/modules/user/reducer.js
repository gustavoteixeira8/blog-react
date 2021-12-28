import * as types from '../types';

const initialUserState = {
  isLoading: false,
  data: null,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case types.FETCH_USER_LOGGED_IN_SUCCESS: {
      const newState = { ...initialUserState };
      newState.data = action.payload.data;
      newState.isLoading = false;
      return newState;
    }

    case types.FETCH_USER_LOGGED_IN_ERROR: {
      const newState = { ...initialUserState };
      newState.isLoading = false;
      return newState;
    }

    default: {
      return state;
    }
  }
};
