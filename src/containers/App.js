import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainApp from 'routes/app/';
import Page404 from 'routes/404/';
import Page500 from 'routes/500/';
import PageConfirmEmail from 'routes/confirm-email/';
import PageForgotPassword from 'routes/forgot-password/';
import PageFullscreen from 'routes/fullscreen/';
import PageLockScreen from 'routes/lock-screen/';
import PageLogin from 'routes/login/';
import PageSignUp from 'routes/sign-up/';
import * as actions from 'actions';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

// = styles =
// 3rd
import 'styles/bootstrap.scss';
// custom
import 'styles/layout.scss';
import 'styles/theme.scss';
import 'styles/ui.scss';
import 'styles/app.scss';

import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';
import grayTheme from './themes/grayTheme';
import Snackbar from 'material-ui/Snackbar';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen:false,
      message:''
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillMount() {
    let data = sessionStorage.getItem('user');
    let user = JSON.parse(data);
    if( user && user.data.token && user.data.data){
      this.props.loginUserSuccess(user.data);
    }
  }
  componentWillReceiveProps(props){
    if(props.user.userLogged.isError){
      this.setState({isOpen:true,message:'Invalid Email or Password'});
    } else if (props.user.userLogged.isSuccess && props.location.pathname == '/login' && !props.user.userToken.isSuccess) {
      this.setState({isOpen:true, message:'Login Successfully'})
    }
    if(props.user.userToken.isSuccess ){
      this.setState({isOpen:true, message:'Session Expire!!'})
    }
  }
  handleRequestClose(){
    this.setState({isOpen:false})
    if(this.props.user.userLogged.isSuccess){
      this.props.loginUserReset();
    }
    if(this.props.user.userToken.isSuccess){
      this.props.loginTokenReset();
    }
  }
  render() {
    const { match, location, layoutBoxed, navCollapsed, navBehind, fixedHeader, sidebarWidth, theme } = this.props;
    let materialUITheme;
    switch (theme) {
      case 'gray':
        materialUITheme = grayTheme;
        break;
      case 'dark':
        materialUITheme = darkTheme;
        break;
      default:
        materialUITheme = lightTheme;
    }

    const isRoot = location.pathname === '/';
    if (isRoot) {
      return (<Redirect to={'/login'} />);
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(materialUITheme)}>
        <div id="app-inner">
          <div className="preloaderbar hide"><span className="bar" /></div>
          <div
            className={classnames('app-main full-height', {
              'fixed-header': fixedHeader,
              'nav-collapsed': navCollapsed,
              'nav-behind': navBehind,
              'layout-boxed': layoutBoxed,
              'theme-gray': theme === 'gray',
              'theme-dark': theme === 'dark',
              'sidebar-sm': sidebarWidth === 'small',
              'sidebar-lg': sidebarWidth === 'large'})
            }
            style={{backgroundColor:'#1b025c'}}
            >
            <Snackbar
              open={this.state.isOpen}
              style={{top:61,left:"58%",transition:"transform 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, visibility 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"}}
              message={this.state.message}
              autoHideDuration={2000}
              onRequestClose={this.handleRequestClose}
            />
            <Route exact path="/login" component={PageLogin} />
            <Route path={`${match.url}app`} component={MainApp} />
            <Route exact path="/404" component={Page404} />
            <Route exact path="/500" component={Page500} />
            <Route exact path="/confirm-email" component={PageConfirmEmail} />
            <Route exact path="/forgot-password" component={PageForgotPassword} />
            <Route exact path="/fullscreen" component={PageFullscreen} />
            <Route exact path="/lock-screen" component={PageLockScreen} />
            <Route exact path="/sign-up" component={PageSignUp} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user.userLogged,
  layoutBoxed: state.settings.layoutBoxed,
  navCollapsed: state.settings.navCollapsed,
  navBehind: state.settings.navBehind,
  fixedHeader: state.settings.fixedHeader,
  sidebarWidth: state.settings.sidebarWidth,
  theme: state.settings.theme,
  user: state.user,
  customer: state.customer,
});

const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };


module.exports = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
