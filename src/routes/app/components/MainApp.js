import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import Customizer from 'components/Customizer';


import Dashboard from '../routes/dashboard/';
import customer from '../routes/customer/';
import user from '../routes/user/';



class MainApp extends React.Component {

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

module.exports = MainApp;
