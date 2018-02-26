import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';

export function toggleBoxedLayout(isLayoutBoxed) {
  return { type: types.TOGGLE_BOXED_LAYOUT, isLayoutBoxed };
}
export function toggleCollapsedNav(isNavCollapsed) {
  return { type: types.TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}
export function toggleNavBehind(isNavBehind) {
  return { type: types.TOGGLE_NAV_BEHIND, isNavBehind };
}
export function toggleFixedHeader(isFixedHeader) {
  return { type: types.TOGGLE_FIXED_HEADER, isFixedHeader };
}
export function changeSidebarWidth(sidebarWidth) {
  return { type: types.CHANGE_SIDEBAR_WIDTH, sidebarWidth };
}
export function changeColorOption(colorOption) {
  return { type: types.CHANGE_COLOR_OPTION, colorOption };
}
export function changeTheme(themeOption) {
  return { type: types.CHANGE_THEME, theme: themeOption };
}

export const userListRequest = createAction(types.USER_LIST_REQUEST);
export const userListSuccess = createAction(types.USER_LIST_SUCCESS);
export const userListError = createAction(types.USER_LIST_ERROR);

export const userReset = createAction(types.USER_ADD_RESET);
export const userAddRequest = createAction(types.USER_ADD_REQUEST);
export const userAddSuccess = createAction(types.USER_ADD_SUCCESS);
export const userAddError = createAction(types.USER_ADD_ERROR);

export const userUpdateRequest = createAction(types.USER_UPDATE_REQUEST);
export const userUpdateSuccess = createAction(types.USER_UPDATE_SUCCESS);
export const userUpdateError = createAction(types.USER_UPDATE_ERROR);

export const userDeleteRequest = createAction(types.USER_DELETE_REQUEST);
export const userDeleteSuccess = createAction(types.USER_DELETE_SUCCESS);
export const userDeleteError = createAction(types.USER_DELETE_ERROR);

// Customer


export const customerListRequest = createAction(types.CUSTOMER_LIST_REQUEST);
export const customerListSuccess = createAction(types.CUSTOMER_LIST_SUCCESS);
export const customerListError = createAction(types.CUSTOMER_LIST_ERROR);

export const customerReset = createAction(types.CUSTOMER_ADD_RESET);
export const customerAddRequest = createAction(types.CUSTOMER_ADD_REQUEST);
export const customerAddSuccess = createAction(types.CUSTOMER_ADD_SUCCESS);
export const customerAddError = createAction(types.CUSTOMER_ADD_ERROR);

export const customerUpdateRequest = createAction(types.CUSTOMER_UPDATE_REQUEST);
export const customerUpdateSuccess = createAction(types.CUSTOMER_UPDATE_SUCCESS);
export const customerUpdateError = createAction(types.CUSTOMER_UPDATE_ERROR);

export const customerDeleteRequest = createAction(types.CUSTOMER_DELETE_REQUEST);
export const customerDeleteSuccess = createAction(types.CUSTOMER_DELETE_SUCCESS);
export const customerDeleteError = createAction(types.CUSTOMER_DELETE_ERROR);


// Redeem

export const redeemListRequest = createAction(types.REDEEM_LIST_REQUEST);
export const redeemListSuccess = createAction(types.REDEEM_LIST_SUCCESS);
export const redeemListError = createAction(types.REDEEM_LIST_ERROR);

export const redeemReset = createAction(types.REDEEM_ADD_RESET);
export const redeemAddRequest = createAction(types.REDEEM_ADD_REQUEST);
export const redeemAddSuccess = createAction(types.REDEEM_ADD_SUCCESS);
export const redeemAddError = createAction(types.REDEEM_ADD_ERROR);

export const redeemUpdateRequest = createAction(types.REDEEM_UPDATE_REQUEST);
export const redeemUpdateSuccess = createAction(types.REDEEM_UPDATE_SUCCESS);
export const redeemUpdateError = createAction(types.REDEEM_UPDATE_ERROR);

export const redeemDeleteRequest = createAction(types.REDEEM_DELETE_REQUEST);
export const redeemDeleteSuccess = createAction(types.REDEEM_DELETE_SUCCESS);
export const redeemDeleteError = createAction(types.REDEEM_DELETE_ERROR);


// interest list

export const interestListRequest = createAction(types.INTEREST_LIST_REQUEST);
export const interestListSuccess = createAction(types.INTEREST_LIST_SUCCESS);
export const interestListError = createAction(types.INTEREST_LIST_ERROR);


// searchUser

export const searchUserRequest = createAction(types.SEARCH_USER_REQUEST);
export const searchUserSuccess = createAction(types.SEARCH_USER_SUCCESS);
export const searchUserError = createAction(types.SEARCH_USER_ERROR);

export const searchCustomerRequest = createAction(types.SEARCH_CUSTOMER_REQUEST);
export const searchCustomerSuccess = createAction(types.SEARCH_CUSTOMER_SUCCESS);
export const searchCustomerError = createAction(types.SEARCH_CUSTOMER_ERROR);

// loginUser

export const loginUserRequest = createAction(types.LOGIN_USER_REQUEST);
export const loginUserSuccess = createAction(types.LOGIN_USER_SUCCESS);
export const loginUserError = createAction(types.LOGIN_USER_ERROR);
export const loginUserReset = createAction(types.LOGIN_USER_RESET);
