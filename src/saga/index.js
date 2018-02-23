import {takeLatest} from 'redux-saga/effects';
import * as constants from 'constants/ActionTypes';
import {
  fetchUser,
  addUser,
  updateUser,
  deleteUser,
  fetchCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  loginUser,
  searchUser,
  searchCustomer,
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
    yield takeLatest(constants.SEARCH_USER_REQUEST, searchUser);
    yield takeLatest(constants.CUSTOMER_LIST_REQUEST, fetchCustomer);
    yield takeLatest(constants.CUSTOMER_ADD_REQUEST, addCustomer);
    yield takeLatest(constants.LOGIN_USER_REQUEST, loginUser);
    yield takeLatest(constants.SEARCH_CUSTOMER_REQUEST, searchCustomer);

}

export default function* rootSaga () {
  yield [
    watchActions()
  ];
}
