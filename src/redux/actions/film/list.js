const NAME = 'FILM';

export const FETCH_FILM_LIST = `${NAME}/FETCH_FILM_LIST`;
export const FETCH_FILM_LIST_SUCCESS = `${NAME}/FETCH_FILM_LIST_SUCCESS`;
export const FETCH_FILM_LIST_FAIL = `${NAME}/FETCH_FILM_LIST_FAIL`;
export const FETCH_NEXT_FILM_LIST = `${NAME}/FETCH_NEXT_FILM_LIST`;
export const FETCH_NEXT_FILM_LIST_SUCCESS = `${NAME}/FETCH_NEXT_FILM_LIST_SUCCESS`;
export const FETCH_NEXT_FILM_LIST_FAIL = `${NAME}/FETCH_NEXT_FILM_LIST_FAIL`;
export const FINISH_FETCH_FILM_LIST = `${NAME}/FINISH_FETCH_FILM_LIST`;

export const getFilmList = store => store[NAME].list.data;
export const isFetchingFilmList = store => store[NAME].list.isFetching;
export const isFetchingNextFilmList = store => store[NAME].list.isFetchingNextFilmList;
export const isFilmListFinish = store => store[NAME].list.isFilmListFinish;

export const fetchFilmList = (search, movieType, callbackSuccess) => ({
  type: FETCH_FILM_LIST,
  search,
  movieType,
  callbackSuccess,
});

export const fetchFilmListSuccess = data => ({
  type: FETCH_FILM_LIST_SUCCESS,
  data,
});

export const fetchFilmListFail = errors => ({
  type: FETCH_FILM_LIST_FAIL,
  errors,
});

export const fetchNextFilmList = callbackSuccess => ({
  type: FETCH_NEXT_FILM_LIST,
  callbackSuccess,
});

export const fetchNextFilmListSuccess = data => ({
  type: FETCH_NEXT_FILM_LIST_SUCCESS,
  data,
});

export const fetchNextFilmListFail = errors => ({
  type: FETCH_NEXT_FILM_LIST_FAIL,
  errors,
});

export const finishFetchFilmList = () => ({
  type: FINISH_FETCH_FILM_LIST,
});
