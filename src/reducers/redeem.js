import APPCONFIG from 'constants/Config';
import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'constants/ActionTypes';

const initialState = {
  redeem:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  },
  updateRedeem:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  },
  redeemRedeem:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  }
}

const redeemListRequest = (state, action) => update(state, {
  redeem:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});
const redeemListSuccess = (state, action) => update(state, {
  redeem:{
    data:       {$set: action.payload},
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'Login success'}
  }
});
const redeemListError = (state, action) => update(state, {
  redeem:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

const redeemAddRequest = (state, action) =>{
  return update(state, {
  updateRedeem:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}

const redeemReset = (state, action) =>{
  return update(state, {
  updateRedeem:{
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: false},
  }
});}

const redeemAddSuccess = (state, action) => update(state, {
  updateRedeem:{
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'redeem Added success'}
  }
});
const redeemAddError = (state, action) => update(state, {
  updateRedeem:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

const redeemDeleteRequest = (state, action) =>{
  return update(state, {
  updateRedeem:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
const redeemDeleteSuccess = (state, action) => update(state, {
  updateRedeem:{
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'redeem Delete success'}
  }
});
const redeemDeleteError = (state, action) => update(state, {
  updateRedeem:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

const redeemSearchRequest = (state, action) => update(state, {
  redeemRedeem : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: ''}
  }
});

const redeemSearchSuccess = (state, action) => update(state, {
  redeemRedeem : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: 'Search Successfully'}
  },
  redeem:{
    data:       {$set: action.payload},
  }
});

const redeemSearchError = (state, action) => update(state, {
  redeemRedeem : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: 'Something Went Wrong'}
  }
});


export default handleActions({
  [constants.REDEEM_LIST_REQUEST]: redeemListRequest,
  [constants.REDEEM_LIST_SUCCESS]: redeemListSuccess,
  [constants.REDEEM_LIST_ERROR]:   redeemListError,

  [constants.REDEEM_ADD_REQUEST]: redeemAddRequest,
  [constants.REDEEM_ADD_SUCCESS]: redeemAddSuccess,
  [constants.REDEEM_ADD_ERROR]:   redeemAddError,

  // [constants.SEARCH_USER_REQUEST]: redeemSearchRequest,
  // [constants.SEARCH_USER_SUCCESS]: redeemSearchSuccess,
  // [constants.SEARCH_USER_ERROR]: redeemSearchError,

  [constants.REDEEM_UPDATE_REQUEST]: redeemAddRequest,
  [constants.REDEEM_UPDATE_SUCCESS]: redeemAddSuccess,
  [constants.REDEEM_UPDATE_ERROR]:   redeemAddError,

  [constants.REDEEM_ADD_RESET]: redeemReset,

  [constants.REDEEM_DELETE_REQUEST]: redeemDeleteRequest,
  [constants.REDEEM_DELETE_SUCCESS]: redeemDeleteSuccess,
  [constants.REDEEM_DELETE_ERROR]:   redeemDeleteError,



}, initialState);
