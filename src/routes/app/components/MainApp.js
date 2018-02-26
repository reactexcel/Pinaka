import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import Customizer from 'components/Customizer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as actions from 'actions';


import Dashboard from '../routes/dashboard/';
import customer from '../routes/customer/';
import user from '../routes/user/';
import redeem from '../routes/redeem/';




class MainApp extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { match, location } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav />

        <section id="page-container" className="app-page-container">
          <Header />

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                <Route path={`${match.url}/dashboard`} component={Dashboard} />
                <Route path={`${match.url}/customer`} component={customer} />
                <Route path={`${match.url}/user`} component={user} />
                <Route path={`${match.url}/redeem`} component={redeem} />
                {/* <Route path={`${match.url}/chart`} component={AsyncChart} /> */}
              </div>
            </div>

            <Footer />
          </div>
        </section>

        <Customizer />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    customer: state.customer,
    user: state.user,
    redeem: state.redeem,
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp));

