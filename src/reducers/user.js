import APPCONFIG from 'constants/Config';
import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'constants/ActionTypes';

const initialState = {
  user:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  },
  updateUser:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  },
  userLogged:{
    isLoading:false,
    isLogged:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  },
  searchUser:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  }
}

const userListRequest = (state, action) => update(state, {
  user:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});
const userListSuccess = (state, action) => update(state, {
  user:{
    data:       {$set: action.payload},
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'Login success'}
  }
});
const userListError = (state, action) => update(state, {
  user:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

const userAddRequest = (state, action) =>{
  return update(state, {
  updateUser:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}

const userReset = (state, action) =>{
  return update(state, {
  updateUser:{
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: false},
  }
});}

const userAddSuccess = (state, action) => update(state, {
  updateUser:{
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'User Added success'}
  }
});
const userAddError = (state, action) => update(state, {
  updateUser:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

const userDeleteRequest = (state, action) =>{
  return update(state, {
  updateUser:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
const userDeleteSuccess = (state, action) => update(state, {
  updateUser:{
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'User Delete success'}
  }
});
const userDeleteError = (state, action) => update(state, {
  updateUser:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

const loginUserRequest = (state, action) =>{
  return update(state, {
  userLogged : {
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
const loginUserSuccess = (state, action) => update(state, {
  userLogged : {
    data: {$set:action.payload},
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    isLogged: {$set:true},
    message:    {$set: 'User Delete success'}
  }
});
const loginUserError = (state, action) => update(state, {
  userLogged : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

const userSearchRequest = (state, action) => update(state, {
  searchUser : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: ''}
  }
});

const userSearchSuccess = (state, action) => update(state, {
  searchUser : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: 'Search Successfully'}
  },
  user:{
    data:       {$set: action.payload},
  }
});

const userSearchError = (state, action) => update(state, {
  searchUser : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: 'Something Went Wrong'}
  }
});

const loginUserReset = (state,action) => update(state,{
  userLogged:{
    isError: {$set:false},
    isSuccess: {$set:false},
    isLoading: {$set: false}
  }
});


export default handleActions({
  [constants.USER_LIST_REQUEST]: userListRequest,
  [constants.USER_LIST_SUCCESS]: userListSuccess,
  [constants.USER_LIST_ERROR]:   userListError,

  [constants.USER_ADD_REQUEST]: userAddRequest,
  [constants.USER_ADD_SUCCESS]: userAddSuccess,
  [constants.USER_ADD_ERROR]:   userAddError,

  [constants.SEARCH_USER_REQUEST]: userSearchRequest,
  [constants.SEARCH_USER_SUCCESS]: userSearchSuccess,
  [constants.SEARCH_USER_ERROR]: userSearchError,

  [constants.USER_UPDATE_REQUEST]: userAddRequest,
  [constants.USER_UPDATE_SUCCESS]: userAddSuccess,
  [constants.USER_UPDATE_ERROR]:   userAddError,

  [constants.USER_ADD_RESET]: userReset,
  [constants.LOGIN_USER_RESET]: loginUserReset,
  

  [constants.USER_DELETE_REQUEST]: userDeleteRequest,
  [constants.USER_DELETE_SUCCESS]: userDeleteSuccess,
  [constants.USER_DELETE_ERROR]:   userDeleteError,

  [constants.LOGIN_USER_REQUEST]: loginUserRequest,
  [constants.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [constants.LOGIN_USER_ERROR]:   loginUserError,


}, initialState);
