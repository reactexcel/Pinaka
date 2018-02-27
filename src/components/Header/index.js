import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import NavRightList from './NavRightList';
import * as actions from 'actions';
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/RaisedButton';



class Header extends React.Component {
  componentDidMount() {
    const sidebarToggler = this.sidebarBtn;
    const $sidebarToggler = $(sidebarToggler);
    const $body = $('#body');

    $sidebarToggler.on('click', (e) => {
      // _sidebar.scss, _page-container.scss
      $body.toggleClass('sidebar-mobile-open');
    });
  }

  render() {
    const { isFixedHeader, colorOption } = this.props;

    return (
      <section className="app-header">
        <div
          className={classnames('app-header-inner')}
          style={{backgroundColor:'#1b025c'}}
                >
          <div className="d-lg-none d-xl-none float-left">
            <a href="javascript:;" className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          <div className="brand d-none d-lg-inline-block d-xl-inline-block">
            <h2><Link to="/">{APPCONFIG.brand}</Link></h2>
          </div>

          <div className="top-nav-left d-none d-lg-inline-block d-xl-inline-block">
            <NavLeftList />
          </div>

          <div className="top-nav-right">
          <RaisedButton label="Add Customer" style={{marginTop: 13,}}  onClick={()=>{this.props.history.push('/app/customer/viewcustomerdetails/0/add')}}  primary  />
          
            <NavRightList />
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  colorOption: state.settings.colorOption,
  isFixedHeader: state.settings.isFixedHeader,
  user: state.user
});
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
