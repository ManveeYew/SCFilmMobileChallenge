import Actions from 'actions';
import uniqBy from 'lodash/uniqBy';

const getDefaultState = () =>
  ({ isFetching: false, errors: [], data: [], totalResults: 0, isReload: false });

function list(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }

  switch (action.type) {
    case Actions.FETCH_FILM_LIST:
      return {
        data: [],
        errors: [],
        isFetching: true,
        totalResults: 0,
      };
    case Actions.FETCH_NEXT_FILM_LIST:
      return {
        ...state,
        errors: [],
        isFetching: true,
      };
    case Actions.FETCH_FILM_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errors: [],
        data: uniqBy(state.data.concat(action.data), 'imdbID'),
        totalResults: action.totalResults,
      };
    case Actions.FETCH_FILM_LIST_FAIL:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}

export default list;
