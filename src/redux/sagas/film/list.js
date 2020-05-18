import { takeLatest, all, fork, call, put, select } from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';
import isEmpty from 'lodash/isEmpty';

function* fetchFilmList({ search, movieType, callbackSuccess }) {
  try {
    const response = yield call(api.getFilmList, search, movieType);
    const json = response && response.data;
    if (json && json.data) {
      yield put(Actions.fetchFilmListSuccess(json.data));
      if (json.data.length < 10) {
        yield put(Actions.finishFetchFilmList());
      }
    } else {
      yield put(Actions.fetchFilmListFail());
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

// function* fetchNextDishes() {
//   try {
//     const currentPage = yield select(Actions.getPage);
//     const currentLocation = yield select(Actions.getCurrentLocation);
//     const dishFilter = yield select(Actions.getDishFilter);
//     yield put(Actions.setPage(currentPage + 1));

//     const data = {
//       latitude: currentLocation.lat,
//       longitude: currentLocation.lng,
//     };

//     if (dishFilter[FILTER_FIELDS.TERM]) {
//       data.term = dishFilter[FILTER_FIELDS.TERM];
//     }

//     // stringify the diet ids
//     if (!isEmpty(dishFilter[FILTER_FIELDS.DIETIDS])) {
//       data.diet_ids = dishFilter[FILTER_FIELDS.DIETIDS].join(',');
//     }

//     // prices need to be in cent
//     data.price_from = `${dishFilter[FILTER_FIELDS.PRICERANGE][0] * 100}`;
//     // send 5000 if the max price is 50
//     if (dishFilter[FILTER_FIELDS.PRICERANGE][1] === 50) {
//       data.price_to = '500000';
//     } else {
//       data.price_to = `${dishFilter[FILTER_FIELDS.PRICERANGE][1] * 100}`;
//     }

//     data.radius = `${dishFilter[FILTER_FIELDS.RADIUS]}`;
//     data.distance = dishFilter[FILTER_FIELDS.DISTANCE].toLowerCase();
//     data.page = currentPage + 1;

//     const response = yield call(api.getDishes, data);
//     const json = response && response.data;
//     if (json && json.data) {
//       if (!isEmpty(json.data)) {
//         yield put(Actions.fetchNextDishesSuccess(json.data));
//         if (json.data.length > 0 && json.data.length < 10) {
//           yield put(Actions.finishFetchDishes());
//         }
//       } else {
//         yield put(Actions.finishFetchDishes());
//       }
//     } else {
//       yield put(Actions.fetchNextDishesFail());
//     }
//   } catch (response) {
//     const json = response && response.data;
//     if (json && json.error_messages) {
//       yield put(Actions.fetchNextDishesFail(response.data.error_messages));
//     } else {
//       yield put(Actions.fetchNextDishesFail('Network error'));
//     }
//   }
// }

function* watchFetchFilmList() {
  yield takeLatest(Actions.FETCH_FILM_LIST, fetchFilmList);
}

// function* watchFetchNextDishes() {
//   yield takeLatest(Actions.FETCH_NEXT_DISHES, fetchNextDishes);
// }

export default function* list() {
  yield all([
    fork(watchFetchFilmList),
    // fork(watchFetchNextDishes),
  ]);
}
