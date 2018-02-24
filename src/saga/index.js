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
  getInterests,
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
    yield takeLatest(constants.INTEREST_LIST_REQUEST, getInterests);
    yield takeLatest(constants.CUSTOMER_UPDATE_REQUEST, updateCustomer);
    yield takeLatest(constants.REDEEM_LIST_REQUEST, fetchRedeem);
    yield takeLatest(constants.REDEEM_ADD_REQUEST, addRedeem);
    yield takeLatest(constants.REDEEM_UPDATE_REQUEST, updateRedeem);
    

}

export default function* rootSaga () {
  yield [
    watchActions()
  ];
}
