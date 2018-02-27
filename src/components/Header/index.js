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
import TextField from 'material-ui/TextField';
import {withRouter} from 'react-router';



class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search:''
    }
    this.handleChange = this.handleChange.bind(this);    
  }
  componentDidMount() {
    const sidebarToggler = this.sidebarBtn;
    const $sidebarToggler = $(sidebarToggler);
    const $body = $('#body');

    $sidebarToggler.on('click', (e) => {
      // _sidebar.scss, _page-container.scss
      $body.toggleClass('sidebar-mobile-open');
    });
  }
  handleChange = props => (event, value, index) => {
    console.log(event.target.value);
   if(event.target.value != ""){
     let token = this.props.user.userLogged.data.token;
     let searchvalue = {search:event.target.value};
     let apiData={token,data:searchvalue}
     this.props.searchHeaderCustomerRequest(apiData);
    } else {
      this.props.searchHeaderCustomerReset();
    }
    this.setState({[props]:event.target.value});
   
  }
  render() {
    const { isFixedHeader, colorOption } = this.props;
    console.log(this.props);
    let CustomerList = _.map(this.props.customer.searchHeader.data, (value, index) => {
      return(
      <tr key={index} >
        <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
        <td className="mdl-data-table__cell--non-numeric"> <a href={`/#/app/customer/viewcustomerdetails/${index}/disable`}>{value.name} {value.lastName}</a></td>
        <td className="mdl-data-table__cell--non-numeric">{value.email}</td>
        <td>{value.phone?value.phone.substring(2, value.phone.length):''}</td>
        <td>{value.sms_option ? "Yes" : "No"}</td>
        <td>{value.app_installed ? "Yes" : "No"}</td>

      </tr>
    )} );
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
          <TextField
            hintText="Search"
            style={{width:'60%'}}
            value={this.state.search}
            hintStyle={{color:"#ffff"}}
            inputStyle={{color:"#ffff"}}
            onChange={this.handleChange('search')}
            type="text"
          />
            {this.props.customer.searchHeader.isSuccess ?  
            <div className="box box-default table-box mdl-shadow--2dp" style={{width:"79%",marginLeft:"20%"}} >
            <table className="mdl-data-table table-responsive">
              <thead>
                <tr>
                  <th className="mdl-data-table__cell--non-numeric">#</th>
                  <th className="mdl-data-table__cell--non-numeric">Name</th>
                  <th className="mdl-data-table__cell--non-numeric">Email Id</th>
                  <th>Phone Number</th>
                  <th>SMS Option</th>
                  <th>App Installed</th>
                </tr>
              </thead>
              <tbody>
                  {CustomerList}
              </tbody>
            </table>
          </div>
          :
          null
          }

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
  user: state.user,
  customer: state.customer,
});
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

module.exports = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));
