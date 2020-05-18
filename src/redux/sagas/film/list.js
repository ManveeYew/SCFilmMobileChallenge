import { takeLatest, all, fork, call, put, select } from 'redux-saga/effects';
import Actions from 'actions';
import _get from 'lodash/get';
import * as api from 'api';
import isEmpty from 'lodash/isEmpty';

function* fetchFilmList({ search, movieType, page, isReload, callbackSuccess }) {
  try {
    const response = yield call(api.getFilmList, search, movieType, page);
    const json = response && response.data;
    console.log(response);
    if (json && json.Search) {
      if (isReload) {
        // reset the items
        yield put(Actions.fetchFilmListSuccess(json.Search, Number(json.totalResults)));
        return;
      }
      // append items
      const oldItems = yield select(state => state.FILM.list.data);
      const state = yield select();
      console.log(state.FILM.list.data);
      console.log(json.Search);
      // _get(state.FILM, `list.data`, [])
      yield put(Actions.fetchFilmListSuccess([...oldItems, ...json.Search], Number(json.totalResults)));
    } else {
      yield put(Actions.fetchFilmListFail(['Network error']));
    }
  } catch (response) {
    const json = response && response.data;
    if (json && json.error_messages) {
      yield put(Actions.fetchFilmFail(response.data.error_messages));
    } else {
      yield put(Actions.fetchFilmFail('Network error'));
    }
  }
}

function* watchFetchFilmList() {
  yield takeLatest(Actions.FETCH_FILM_LIST, fetchFilmList);
  yield takeLatest(Actions.FETCH_NEXT_FILM_LIST, fetchFilmList)
}

export default function* list() {
  yield all([
    fork(watchFetchFilmList),
  ]);
}
