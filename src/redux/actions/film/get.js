const NAME = 'FILM';

export const FETCH_FILM = `${NAME}/FETCH_FILM`;
export const FETCH_FILM_SUCCESS = `${NAME}/FETCH_FILM_SUCCESS`;
export const FETCH_FILM_FAIL = `${NAME}/FETCH_FILM_FAIL`;
export const CLEAR_FILM = `${NAME}/CLEAR_FILM`;

export const getFilm = store => store[NAME].get.data;
export const isFetchingFilm = store => store[NAME].get.isFetching;

export const fetchFilm = (id, callbackSuccess) => ({
  type: FETCH_FILM,
  id,
  callbackSuccess,
});

export const fetchFilmSuccess = data => ({
  type: FETCH_FILM_SUCCESS,
  data,
});

export const fetchFilmFail = errors => ({
  type: FETCH_FILM_FAIL,
  errors,
});

export const clearDish = () => ({
  type: CLEAR_DISH,
});
