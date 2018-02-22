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

export function* fetchCustomer(){
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

export function* addCustomer(data){
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
         yield put( actions.userAddSuccess(res.data));
       } else {
         yield put (actions.userAddError(res));
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
