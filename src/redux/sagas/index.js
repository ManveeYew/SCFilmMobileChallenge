import { all, fork } from 'redux-saga/effects';
import film from './film';

export default function* root() {
  yield all([
    fork(film),
  ]);
}
