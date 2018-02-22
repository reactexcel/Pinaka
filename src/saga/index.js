import {takeLatest} from 'redux-saga/effects';
import * as constants from 'constants/ActionTypes';
import {
  fetchUser,
  addUser,
  updateUser,
  deleteUser,
  fethCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  loginUser,
  searchUser,
  deleteRedeem,
  updateRedeem,
  addRedeem,
  fetchRedeem
} from './sagaworker';

export function* watchActions () {
    yield takeLatest(constants.USER_LIST_REQUEST, fetchUser);
    yield takeLatest(constants.USER_ADD_REQUEST, addUser);
    yield takeLatest(constants.USER_UPDATE_REQUEST, updateUser);
    yield takeLatest(constants.USER_DELETE_REQUEST, deleteUser);

}

export default function* rootSaga () {
  yield [
    watchActions()
  ];
}
