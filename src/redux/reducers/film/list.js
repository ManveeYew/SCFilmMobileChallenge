import Actions from 'actions';
import uniqBy from 'lodash/uniqBy';

const getDefaultState = () =>
  ({ isFetching: false, errors: [], data: [], isFilmListFinish: false, isFetchingNextFilmList: false });

function list(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }

  switch (action.type) {
    case Actions.FETCH_FILM_LIST:
      return {
        isFetching: true,
        isFilmListFinish: false,
        errors: [],
        data: [],
        isFetchingNextFilmList: false,
      };
    case Actions.FETCH_FILM_LIST_SUCCESS:
      return {
        isFetching: false,
        isFilmListFinish: false,
        errors: [],
        data: action.data,
        isFetchingNextFilmList: false,
      };
    case Actions.FETCH_FILM_LIST_FAIL:
      return {
        isFetching: false,
        isFilmListFinish: false,
        errors: action.errors,
        data: [],
        isFetchingNextFilmList: false,
      };
    case Actions.FETCH_NEXT_FILM_LIST:
      return {
        isFetching: false,
        isFilmListFinish: true,
        errors: [],
        data: state.data,
        isFetchingNextFilmList: true,
      };
    case Actions.FETCH_NEXT_FILM_LIST_SUCCESS:
      return {
        isFetching: false,
        isFilmListFinish: false,
        errors: [],
        data: uniqBy(state.data.concat(action.data), 'id'),
        isFetchingNextFilmList: false,
      };
    case Actions.FETCH_NEXT_FILM_LIST_FAIL:
      return {
        isFetching: false,
        isFilmListFinish: false,
        errors: action.errors,
        data: state.data,
        isFetchingNextFilmList: false,
      };
    case Actions.FINISH_FETCH_FILM_LIST:
      return {
        ...state,
        isFetching: false,
        isFilmListFinish: true,
        isFetchingNextFilmList: false,
      };
    default:
      return state;
  }
}

export default list;
