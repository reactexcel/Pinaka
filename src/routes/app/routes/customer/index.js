import React from 'react';
import { Route } from 'react-router-dom';

import Customer from './routes/customer/customer'
import CustomerDetails from './routes/customer/customerDetails'


// const customer = ({ match }) =>{
const customer = (props) =>{
  let { match } = props;
  return(
  <div>
    <Route path={`${match.url}/viewcustomer`} component={Customer}/>
    <Route path={`${match.url}/viewcustomerdetails/:id/:type`} component={CustomerDetails}/>
  </div>
);}

export default customer;
