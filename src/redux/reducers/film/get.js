import Actions from 'actions';

const getDefaultState = () => ({ isFetching: false, errors: [], data: {} });

function get(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }

  switch (action.type) {
    case Actions.FETCH_FILM:
      return {
        isFetching: true,
        errors: [],
        data: {},
      };
    case Actions.FETCH_FILM_SUCCESS:
      return {
        isFetching: false,
        errors: [],
        data: action.data,
      };
    case Actions.FETCH_FILM_FAIL:
      return {
        isFetching: false,
        errors: action.errors,
        data: {},
      };
    case Actions.CLEAR_FILM:
      return getDefaultState();
    default:
      return state;
  }
}

export default get;
