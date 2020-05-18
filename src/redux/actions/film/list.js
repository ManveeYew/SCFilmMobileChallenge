const NAME = 'FILM';

export const FETCH_FILM_LIST = `${NAME}/FETCH_FILM_LIST`;
export const FETCH_NEXT_FILM_LIST = `${NAME}/FETCH_NEXT_FILM_LIST`;
export const FETCH_FILM_LIST_SUCCESS = `${NAME}/FETCH_FILM_LIST_SUCCESS`;
export const FETCH_FILM_LIST_FAIL = `${NAME}/FETCH_FILM_LIST_FAIL`;

export const getFilmList = store => store[NAME].list.data;
export const isFetchingFilmList = store => store[NAME].list.isFetching;
export const getTotalResults = store => store[NAME].list.totalResults;
export const getErrors = store => store[NAME].list.errors;

export const fetchFilmList = (search, movieType, page, isReload, callbackSuccess) => ({
  type: FETCH_FILM_LIST,
  search,
  movieType,
  page,
  isReload,
  callbackSuccess,
});

export const fetchNextFilmList = (search, movieType, page, isReload, callbackSuccess) => ({
  type: FETCH_NEXT_FILM_LIST,
  search,
  movieType,
  page,
  isReload,
  callbackSuccess,
});

export const fetchFilmListSuccess = (data, totalResults) => ({
  type: FETCH_FILM_LIST_SUCCESS,
  data,
  totalResults,
});

export const fetchFilmListFail = errors => ({
  type: FETCH_FILM_LIST_FAIL,
  errors,
});
