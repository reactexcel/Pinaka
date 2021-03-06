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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
    console.log(event.target.value=="");
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
    let CustomerList = _.map(this.props.customer.searchHeader.data, (value, index) => {
      return(
      <tr key={index} >
        <td className="mdl-data-table__cell--non-numeric"> <a href={`/#/app/customer/viewcustomerdetails/${index}/disable`}>{value.name} {value.lastName}</a></td>
        <td className="mdl-data-table__cell--non-numeric">{value.email}</td>
        <td>{value.phone?value.phone.substring(2, value.phone.length):''}</td>
      </tr>
    )} );
    return (
      <section className="app-header">
        <div
          className={classnames('app-header-inner')}
          style={{backgroundColor:'white'}}
                >
          <div className="d-lg-none d-xl-none float-left">
            <a href="javascript:;" className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          <div className="brand d-none d-lg-inline-block d-xl-inline-block">
            <h2><Link to="/">{APPCONFIG.brand}</Link></h2>
          </div>
          <div className="top-nav-left" >
            <RaisedButton label="Add Customer" labelColor="white" style={{marginTop: 13,marginLeft:13,}}  onClick={()=>{this.props.history.push('/app/customer/viewcustomerdetails/0/add')}} backgroundColor="#3f6ff6"  />
          </div>

          <div className="top-nav-right">
            {/* <FloatingActionButton mini style={{marginTop: '10%',}} onClick={()=>{this.props.history.push('/app/customer/viewcustomerdetails/0/add')}}  primary  >
              <ContentAdd />
            </FloatingActionButton> */}
            <NavRightList {...this.props} />
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
