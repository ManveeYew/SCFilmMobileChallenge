import { takeLatest, all, fork, call, put, select } from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';

function* fetchFilm({ id, callbackSuccess }) {
  try {

    const response = yield call(api.getFilm, id);
    const json = response && response.data;
    if (json && json.Title) {
      yield put(Actions.fetchFilmSuccess(json));
      if (callbackSuccess) {
        yield call(callbackSuccess);
      }
    }
  } catch (response) {
    const json = response && response.data;
    if (json && json.error && json.error.message) {
      yield put(Actions.fetchFilmFail(json.error.message));
    } else {
      yield put(Actions.fetchFilmFail('Network error'));
    }
  }
}

function* watchFetchFilm() {
  yield takeLatest(Actions.FETCH_FILM, fetchFilm);
}

export default function* get() {
  yield all([
    fork(watchFetchFilm),
  ]);
}
