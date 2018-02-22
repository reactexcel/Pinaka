import React from 'react';
import { Route } from 'react-router-dom';

import User from './routes/user/user'
import UserDetails from './routes/user/userDetails'


const user = ({ match }) => (
  <div>
    <Route path={`${match.url}/viewuser`} component={User}/>
    <Route path={`${match.url}/viewuserdetails/:id/:type`} component={UserDetails}/>
  </div>
)

export default user;
