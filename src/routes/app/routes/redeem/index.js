import React from 'react';
import { Route } from 'react-router-dom';

import Redeem from './routes/redeem/redeem'
import redeemDetails from './routes/redeem/redeemDetails'


// const customer = ({ match }) =>{
const customer = (props) =>{
  let { match } = props;
  return(
  <div>
    <Route path={`${match.url}/viewredeem`} component={Redeem}/>
    <Route path={`${match.url}/viewredeemdetails/:id/:type`} component={redeemDetails}/>
  </div>
);}

export default customer;
