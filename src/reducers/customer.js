import APPCONFIG from 'constants/Config';
import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'constants/ActionTypes';
import {addCustomer} from 'saga/sagaworker';

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
  },
  searchCustomer: {
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  },
  searchHeader:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  },
  customerList:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  },
  redemption:{
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  }
}

const customerListRequest = (state, action) =>{
  return update(state, {
  customer:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
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
  console.log(action);
  return update(state, {
  updateCustomer:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
const customerReset = (state, action) =>{
  return update(state, {
  updateCustomer:{
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: false},
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

const customerSearchRequest = (state, action) => update(state, {
  searchCustomer : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: ''}
  }
});

const customerSearchSuccess = (state, action) => update(state, {
  searchCustomer : {
    isSuccess: {$set: true},
    isLoading: {$set: false},
    isError:   {$set: false},
    data: {$set:action.payload},
    message:   {$set: 'Search Successfully'}
  },
  customer:{
    data:       {$set: action.payload},
  }
});

const customerSearchError = (state, action) => update(state, {
  searchCustomer : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: 'Something Went Wrong'}
  }
});

const customerHeaderSearchRequest = (state, action) => update(state, {
  searchHeader : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: ''}
  }
});

const customerHeaderSearchSuccess = (state, action) => update(state, {
  searchHeader : {
    isSuccess: {$set: true},
    isLoading: {$set: false},
    isError:   {$set: false},
    data: {$set:action.payload},
    message:   {$set: 'Search Successfully'}
  }
});

const customerHeaderSearchError = (state, action) => update(state, {
  searchHeader : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: 'Something Went Wrong'}
  }
});

const customerHeaderSearchReset = (state, action) => {
  return update(state, {
  searchHeader : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: false},
    data: {$set:''}
  }
});}

const customerListChartRequest = (state, action) =>{
  return update(state, {
    customerList:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
const customerListChartSuccess = (state, action) => update(state, {
  customerList:{
    data:       {$set: action.payload},
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'Login success'}
  }
});
const customerListChartError = (state, action) => update(state, {
  customerList:{
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});

const redemptionChartRequest = (state, action) =>{
  return update(state, {
    redemption:{
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});}
const redemptionChartSuccess = (state, action) => update(state, {
  redemption:{
    data:       {$set: action.payload},
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'Login success'}
  }
});
const redemptionChartError = (state, action) => update(state, {
  redemption:{
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
  [constants.CUSTOMER_ADD_RESET]: customerReset,

  [constants.CUSTOMER_DELETE_REQUEST]: customerDeleteRequest,
  [constants.CUSTOMER_DELETE_SUCCESS]: customerDeleteSuccess,
  [constants.CUSTOMER_DELETE_ERROR]:   customerDeleteError,

  [constants.SEARCH_CUSTOMER_REQUEST]: customerSearchRequest,
  [constants.SEARCH_CUSTOMER_SUCCESS]: customerSearchSuccess,
  [constants.SEARCH_CUSTOMER_ERROR]: customerSearchError,

  [constants.SEARCH_HEADER_CUSTOMER_REQUEST]: customerHeaderSearchRequest,
  [constants.SEARCH_HEADER_CUSTOMER_SUCCESS]: customerHeaderSearchSuccess,
  [constants.SEARCH_HEADER_CUSTOMER_ERROR]: customerHeaderSearchError,
  [constants.SEARCH_HEADER_CUSTOMER_RESET]: customerHeaderSearchReset,
  
  [constants.CUSTOMER_LIST_CHART_REQUEST]: customerListChartRequest,
  [constants.CUSTOMER_LIST_CHART_SUCCESS]: customerListChartSuccess,
  [constants.CUSTOMER_LIST_CHART_ERROR]: customerListChartError,

  [constants.REDEMPTION_CHART_REQUEST]: redemptionChartRequest,
  [constants.REDEMPTION_CHART_SUCCESS]: redemptionChartSuccess,
  [constants.REDEMPTION_CHART_ERROR]: redemptionChartError,

}, initialState);
