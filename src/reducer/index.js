const reducer = (state, action) => {
  switch (action.type) {
    case 'storage':
      return {
        ...state,
        settings: action.payload,
        histories: action.histories,
      };

    case 'settings':
      return {
        ...state,
        settings: action.payload,
      };

    case 'history':
      return {
        ...state,
        histories: action.payload,
      };
    default:
      throw new Error();
  }
};

export default reducer;
