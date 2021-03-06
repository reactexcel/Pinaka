import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const Statboxes = (props) =>{
  return (
  <div className="row">
    
    {/* <div className="col-xl-3 col-sm-6" style={{cursor:'pointer'}} onClick={()=>{ props.handleSelect('customer') }} >  */}
    <div className="col-xl-3 col-sm-6" style={{cursor:'pointer'}} > 
      <div className="box box-default">
        <div className="box-top">
          <span>{props.customer.customerList.data.length}</span>
        </div>
        <div className="box-info">
          <span>Customer</span>
        </div>
        <div className="box-bottom">
          <i className="material-icons color-info">supervisor_account</i>
        </div>
      </div>
    </div>

    {/* {props.user.userLogged.data.data.role == 'Admin'? 
      <div className="col-xl-3 col-sm-6" style={{cursor:'pointer'}} > */}
      {/* <div className="col-xl-3 col-sm-6" style={{cursor:'pointer'}} onClick={()=>{props.history.push('/app/user/viewuser')}} > */}
        {/* <div className="box box-default">
          <div className="box-top">
            <span>{props.user.user.data.length}</span>
          </div>
          <div className="box-info">
            <span>User</span>
          </div>
          <div className="box-bottom">
            <i className="material-icons color-info">person</i>
          </div>
        </div>
      </div>
      :
      null
      } */}

      {props.user.userLogged.data.data.role == 'Admin'? 
      <div className="col-xl-3 col-sm-6" style={{cursor:'pointer'}}  >
      {/* <div className="col-xl-3 col-sm-6" style={{cursor:'pointer'}} onClick={()=>{props.handleSelect('redemption')}} > */}
        <div className="box box-default"> 
          <div className="box-top">
            <span>{props.customer.redemption.data.length}</span>
          </div>
          <div className="box-info">
            <span>Redemption</span>
          </div>
          <div className="box-bottom">
            <i className="material-icons color-info">card_membership</i>
          </div>
        </div>
      </div>
      :
      null
      }
    
  </div>
);}

module.exports = Statboxes;
