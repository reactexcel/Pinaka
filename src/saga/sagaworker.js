import { API } from '../constants';
import * as actions from 'actions';
import {call, put} from 'redux-saga/effects';

export function* fetchUser(action){
  let token = action.payload;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/getAllAdminStaff?accessToken='+token,{
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
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/addAdminStaff?accessToken='+token,{
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
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/updateAdminStaff?accessToken='+token,{
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
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/deleteAdminStaff?accessToken='+token,{
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

export function* fetchCustomer(action){
  let token = action.payload;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/getAllCustomer?accessToken='+token,{
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
  let params = data.payload.data;
  console.log(params)
  let token = data.payload.token;
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
    formData.append('interests', params.interest);
    formData.append('source', params.source);
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
        return fetch(API.SERVER_DEV_URL+'admin/addCustomer?accessToken='+token,{
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
             reject(err);
         });
     });



     let res = yield call(api);
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
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/updateCustomer?accessToken='+token,{
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
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.customerUpdateSuccess(res.data));
       } else {
         yield put (actions.customerUpdateError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* deleteCustomer(data){
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/deleteCustomer?accessToken='+token,{
             method: 'DELETE',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> { return res.json()})
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             reject(err);
         });
     });

     let res = yield call(api);
     console.log(res)
       if(res.status == 1){
         yield put( actions.customerDeleteSuccess(res.data));
       } else {
         yield put (actions.customerDeleteError(res));
       }
     } catch (e){
       console.log(e);
     }
}


export function* searchUser(data){
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/searchAdminStaff?accessToken='+token,{
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
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'admin/search_allCustomers?accessToken='+token,{
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
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'RedeemCode/AddRedeemCode?accessToken='+token,{
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
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.redeemAddSuccess(res.data));
       } else {
         yield put (actions.redeemAddError(res));
       }
     } catch (e){
       console.log(e);
     }
}


export function* updateRedeem(data){
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'RedeemCode/updateRedeemCode?accessToken='+token,{
             method: 'PUT',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=>{ return res.json()})
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.redeemUpdateSuccess(res.data));
       } else {
         yield put (actions.redeemUpdateError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* deleteRedeem(data){
  let body = JSON.stringify(data.payload.data);
  let token = data.payload.token;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'RedeemCode/deleteRedeemCode?accessToken='+token,{
             method: 'DELETE',
             cache: 'no-cache',
             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> { return res.json()})
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             reject(err);
         });
     });

     let res = yield call(api);
     console.log(res)
       if(res.status == 1){
         yield put( actions.redeemDeleteSuccess(res.data));
       } else {
         yield put (actions.redeemDeleteError(res));
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

             headers: {
              'content-type': 'application/json'
            },
            body,
         })
         .then((res)=> {  return res.json()})
         .then(data => {
             resolve(data);
         })
         .catch(err => {
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         let payload = {token:res.token,data:res.data};
         yield put( actions.loginUserSuccess(payload));
       } else {
         yield put (actions.loginUserError(res));
       }
     } catch (e){
       console.log(e);
     }
}

export function* fetchRedeem(action){
  let token = action.payload;
  try{
    const api = () =>  new Promise((resolve, reject) => {
        return fetch(API.SERVER_DEV_URL+'RedeemCode/getAllRedeemCode?accessToken='+token,{
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
             reject(err);
         });
     });

     let res = yield call(api);
       if(res.status == 1){
         yield put( actions.redeemListSuccess(res.data));
       } else {
         yield put (actions.redeemListError(res));
       }
     } catch (e){
       console.log(e);
     }
}


export function* getInterests(){
  try{
    const api = () => new Promise((resolve, reject) => {
        fetch(API.SERVER_DEV_URL + 'interest', {
            method: "GET",
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => res.json())
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    });
    let res = yield call(api);
      if(res){
        yield put( actions.interestListSuccess(res));
      } else {
        yield put (actions.interestListError(res));
      }
    } catch (e){
      console.log(e);
    }
}
