import APPCONFIG from 'constants/Config';
import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'constants/ActionTypes';

const initialState = {
  customer:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  },
  updateCustomer:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  }
}

const customerListRequest = (state, action) => update(state, {
  customer:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});
const customerListSuccess = (state, action) => update(state, {
  customer:{
    data:       {$set: action.payload},
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'Login success'}
  }
});
const customerListError = (state, action) => update(state, {
  customer:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

const customerAddRequest = (state, action) =>{
  return update(state, {
  updateCustomer:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
const customerAddReset = (state, action) =>{
  return update(state, {
  updateCustomer:{
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
const customerAddSuccess = (state, action) => update(state, {
  updateCustomer:{
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'Customer Added success'}
  }
});
const customerAddError = (state, action) => update(state, {
  updateCustomer:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});
const customerDeleteRequest = (state, action) =>{
  return update(state, {
  updateCustomer:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
const customerDeleteSuccess = (state, action) => update(state, {
  updateCustomer:{
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'Customer Delete success'}
  }
});
const customerDeleteError = (state, action) => update(state, {
  updateCustomer:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

export default handleActions({
  [constants.CUSTOMER_LIST_REQUEST]: customerListRequest,
  [constants.CUSTOMER_LIST_SUCCESS]: customerListSuccess,
  [constants.CUSTOMER_LIST_ERROR]:   customerListError,

  [constants.CUSTOMER_ADD_REQUEST]: customerAddRequest,
  [constants.CUSTOMER_ADD_SUCCESS]: customerAddSuccess,
  [constants.CUSTOMER_ADD_ERROR]:   customerAddError,
  [constants.CUSTOMER_UPDATE_REQUEST]: customerAddRequest,
  [constants.CUSTOMER_UPDATE_SUCCESS]: customerAddSuccess,
  [constants.CUSTOMER_UPDATE_ERROR]:   customerAddError,
  [constants.CUSTOMER_ADD_RESET]: customerAddReset,

  [constants.CUSTOMER_DELETE_REQUEST]: customerDeleteRequest,
  [constants.CUSTOMER_DELETE_SUCCESS]: customerDeleteSuccess,
  [constants.CUSTOMER_DELETE_ERROR]:   customerDeleteError,

}, initialState);
