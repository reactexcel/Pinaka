import APPCONFIG from 'constants/Config';
import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'constants/ActionTypes';

const initialState = {
  interestList: {
    isLoading:false,
    data:'',
    isError: false,
    isSuccess: false,
    message : ''
  }
}

const interestListRequest = (state, action) => update(state, {
  interestList : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: ''}
  }
});

const interestListSuccess = (state, action) => update(state, {
  interestList : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    data: {$set:action.payload},
    message:   {$set: 'Search Successfully'}
  }
});

const interestListError = (state, action) => update(state, {
  interestList : {
    isSuccess: {$set: false},
    isLoading: {$set: false},
    isError:   {$set: true},
    message:   {$set: 'Something Went Wrong'}
  }
});

export default handleActions({
  [constants.INTEREST_LIST_REQUEST]: interestListRequest,
  [constants.INTEREST_LIST_SUCCESS]: interestListSuccess,
  [constants.INTEREST_LIST_ERROR]:   interestListError,

}, initialState);
