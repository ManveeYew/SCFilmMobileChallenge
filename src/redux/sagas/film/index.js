import { all, fork } from 'redux-saga/effects';
import get from './get';
import list from './list';

export default function* film() {
  yield all([
    fork(get),
    fork(list),
  ]);
}
