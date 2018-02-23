import { API } from '../constants';
import * as actions from 'actions';
import {call, put} from 'redux-saga/effects';

export function* fetchUser(){
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/getAllAdminStaff',{
             method: 'GET',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Deleting Card API Error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userListSuccess(res.data));
       } else {
         yield put (actions.userListError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* addUser(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/addAdminStaff',{
             method: 'POST',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userAddSuccess(res.data));
       } else {
         yield put (actions.userAddError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* updateUser(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/updateAdminStaff',{
             method: 'PUT',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userUpdateSuccess(res.data));
       } else {
         yield put (actions.userUpdateError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* deleteUser(data){
  let body = JSON.stringify(data.payload);
  console.log(body,'deleteuser');
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/deleteAdminStaff',{
             method: 'DELETE',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userDeleteSuccess(res.data));
       } else {
         yield put (actions.userDeleteError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* fetchCustomer(){
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/getAllCustomer',{
          method: 'GET',
          headers: {
           'content-type': 'application/json'
         },
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Deleting Card API Error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.customerListSuccess(res.data));
       } else {
         yield put (actions.customerListError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* addCustomer(data){
  let params = data.payload;
  var formData = new FormData();
    formData.append('name', params.name);
    formData.append('email', params.email);
    formData.append('birthday', params.birthday);
    formData.append('zipcode', params.zipcode);
    formData.append('gender', params.gender?1:0);
    formData.append('marital', params.marital?1:0);
    formData.append('kids', params.kids?1:0);
    if(params.phone != undefined){
        formData.append('phone', '+1' + params.phone);
    }
    formData.append('interests', ['5a41e46065925d20e5b4fbea']);
    formData.append('source', 0);
    formData.append('type', 0);
    formData.append('password', params.password);
    formData.append('occupation', params.occupation);
    formData.append('anniversary', params.anniversary);
    formData.append('lastName', params.lastName);
    formData.append('sms_option', params.sms_option);
    formData.append('app_installed', params.app_installed);
    formData.append('address1', params.address1);
    formData.append('address2', params.address2);
    formData.append('state', params.state);
    formData.append('city', params.city);

  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/addCustomer',{
             method: 'POST',
            body:formData,
         })
         .then((res)=> {
           return res.json()
         })
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });



     let res = yield call(api);
     console.log(res);
        if(res.status == 1){
         yield put( actions.customerAddSuccess(res.data));
       } else {
         yield put (actions.customerAddError(res));
       }
     } catch (e){
       console.log(e);
     }
}


export function* updateCustomer(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/updateCustomer',{
             method: 'PUT',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userUpdateSuccess(res.data));
       } else {
         yield put (actions.userUpdateError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* deleteCustomer(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/deleteAdminStaff',{
             method: 'DELETE',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userUpdateSuccess(res.data));
       } else {
         yield put (actions.userUpdateError(res));
       }
     } catch (e){
       console.log(e);
     }
}


export function* searchUser(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/searchAdminStaff',{
             method: 'POST',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.searchUserSuccess(res.data));
       } else {
         yield put (actions.searchUserError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* searchCustomer(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/search_allCustomers',{
             method: 'POST',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.searchCustomerSuccess(res.data));
       } else {
         yield put (actions.searchCustomerError(res));
       }
     } catch (e){
       console.log(e);
     }
}


export function* addRedeem(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/addCustomer',{
             method: 'POST',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userAddSuccess(res.data));
       } else {
         yield put (actions.userAddError(res));
       }
     } catch (e){
       console.log(e);
     }
}


export function* updateRedeem(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/updateCustomer',{
             method: 'PUT',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userUpdateSuccess(res.data));
       } else {
         yield put (actions.userUpdateError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* deleteRedeem(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/deleteAdminStaff',{
             method: 'DELETE',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userUpdateSuccess(res.data));
       } else {
         yield put (actions.userUpdateError(res));
       }
     } catch (e){
       console.log(e);
     }
}


export function* loginUser(data){
  let body = JSON.stringify(data.payload);
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/Adminlogin',{
             method: 'POST',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Add api error", err);
             reject(err);
         });
     });

     let res = yield call(api);
     console.log(res);
       if(res.status == 1){
         yield put( actions.loginUserSuccess(res.data));
       } else {
         yield put (actions.loginUserError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* fetchRedeem(){
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/getAllAdminStaff',{
             method: 'GET',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
         })
         .then((res)=> res.json())
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             console.log("Deleting Card API Error", err);
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.userListSuccess(res.data));
       } else {
         yield put (actions.userListError(res));
       }
     } catch (e){
       console.log(e);
     }
}
