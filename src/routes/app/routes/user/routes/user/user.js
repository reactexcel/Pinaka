import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import { Link } from 'react-router';
import * as _ from 'lodash';
import ReactEcharts from 'components/ReactECharts';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import CHARTCONFIG from 'constants/ChartConfig';
import * as actions from 'actions';

const styles = {
  loading: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
  }
}

class User extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      search:'',
      searchType:'name',
      isLoading:false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(props){
    if(props.user.user.isLoading){
      this.setState({isLoading:true});
    } else if (props.user.user.isLoading == false){
      this.setState({isLoading:false});
    }
  }
  componentWillMount(){
    this.props.searchHeaderCustomerReset();
    let token = this.props.user.userLogged.data.token;
    this.props.userListRequest(token);
  }
  handleChange = props => (event, value, index) => {
    if(props == 'searchType'){
      this.setState({[props]:index});
    } else {
      this.setState({[props]:event.target.value});
      let searchvalue = {search:event.target.value};
      let token = this.props.user.userLogged.data.token;
      let apiData = {token,data:searchvalue};
      this.props.searchUserRequest(apiData);
    }
  }
  render(){
    const { isLoading } = this.state;    
    let CustomerList = _.map(this.props.user.user.data, (value, index) =>{
      const lastLogin = value.lastLogin ? new Date(value.lastLogin) : '';
      return (
      <tr key={index}>
        <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
        <td className="mdl-data-table__cell--non-numeric"><a href={`/#/app/user/viewuserdetails/${value._id}/disable`}>{value.name}</a></td>
        <td className="mdl-data-table__cell--non-numeric">{value.email}</td>
        <td>{value.role}</td>
        <td>
         {lastLogin != '' ? <span>{lastLogin.getDate()}/{lastLogin.getMonth()}/{lastLogin.getFullYear()} {lastLogin.getHours()}:{lastLogin.getMinutes()}</span> : ''}
       </td>
      </tr>
    )});
    return(
      <div className="container-fluid no-breadcrumbs"  >
        <div className="row">
          <div className="col-xl-12 no-padding">
            <div className="box box-default">
              <div className="box-body">
                <article className="article">
                  <h2 className="article-title">User List</h2>
                  
                  {/* <div className="row">
                    <div className="col-xs-4 search-resp" style={{border:"1px solid #e9e8ec", borderRadius:5,marginBottom:10,marginLeft:14}} >
                        <i className="material-icons" style={{transform: 'translateY(8px)',color:'#e9e8ec'}}>search</i>
                        <TextField
                          hintText="Search"
                          icon={<i className="material-icons">search</i>}
                          style={{width:'90%' }}
                          underlineStyle={{display: 'none'}}
                          value={this.state.search}
                          onChange={this.handleChange('search')}
                          type="text"
                          fullWidth
                        />
                    </div>
                    <div className="col-xs-2 hidden-xs" />                    
                  </div> */}
                  <div className="row">
                      {/* <div className="col-md-6" > */}
                      <div className="col-xs-4 search-resp" style={{border:"1px solid #e9e8ec", borderRadius:5,marginBottom:10,marginLeft:14,marginRight:"3%"}} >
                        <i className="material-icons" style={{transform: 'translateY(8px)',color:'#e9e8ec'}}>search</i>
                        <TextField
                          hintText="Search"
                          icon={<i className="material-icons">search</i>}
                          style={{width:'90%' }}
                          underlineStyle={{display: 'none'}}
                          value={this.state.search}
                          onChange={this.handleChange('search')}
                          type="text"
                          fullWidth
                        />
                    </div>
                      {/* </div> */}
                    <div className="col-xs-2 hidden-xs" />                                          
                      <div className="col-md-6" >
                      <div style={{float:"right",paddingTop:'3%'}} >
                        <RaisedButton label="Add User" labelColor='white' style={{boxShadow:'none',marginBottom:"5px",}}  onClick={()=>{this.props.history.push('/app/user/viewuserdetails/0/add')}}  backgroundColor="#3f6ff6"  />
                      </div>
                      </div>
                    </div>

                  <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                    <table className="mdl-data-table table">
                      <thead style={{backgroundColor:'#3f6ff6'}} >
                        <tr>
                          <th className="mdl-data-table__cell--non-numeric" style={{color:'white'}} >#</th>
                          <th className="mdl-data-table__cell--non-numeric" style={{color:'white'}} >Name</th>
                          <th className="mdl-data-table__cell--non-numeric" style={{color:'white'}} >Email Id</th>
                          <th style={{color:'white'}} >Role</th>
                          <th style={{color:'white'}} >Last Login Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? 
                          <tr>
                            <td colSpan={6} style={styles.loading} >Loading Data..........</td>
                          </tr>
                          :
                          CustomerList}
                      </tbody>
                    </table>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    user: state.user
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
