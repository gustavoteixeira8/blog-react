const initialState = {
  buttonClicked: false,
};

export const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BUTTON_CLICK': {
      const newState = { ...state };
      newState.buttonClicked = !newState.buttonClicked;
      return newState;
    }
    default: {
      return state;
    }
  }
};
