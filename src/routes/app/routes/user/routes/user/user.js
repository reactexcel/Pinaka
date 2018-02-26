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
    let token = this.props.user.userLogged.data.token;
    this.props.userListRequest(token);
  }
  handleChange = props => (event, value, index) => {
    if(props == 'searchType'){
      this.setState({[props]:index});
    } else {
      this.setState({[props]:event.target.value});
      let searchvalue = this.state.searchType == 'name' ? {type:this.state.searchType,name:event.target.value} : {type:this.state.searchType,email:event.target.value}
      let token = this.props.user.userLogged.data.token;
      let apiData = {token,data:searchvalue};
      this.props.searchUserRequest(apiData);
    }
  }
  render(){
    const { isLoading } = this.state;    
    // console.log(this.props,'***********************');
    let CustomerList = _.map(this.props.user.user.data, (value, index) => (
      <tr key={index}>
        <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.name}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.email}</td>
        <td>{value.role}</td>
        {/* <td>{value.lastLogin}</td> */}
        <td></td>
        <td>
          <a href={`/#/app/user/viewuserdetails/${index}/disable`}>More Detail</a>
        </td>
      </tr>
    ));
    return(
      <div className="container-fluid no-breadcrumbs"  >
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-default">
              <div className="box-body">
                <article className="article">
                  <div>
                    <h2 className="article-title">User Details</h2>
                    <div>
                      {/* button for add update and delete */}
                      <RaisedButton label="Add User"  onClick={()=>{this.props.history.push('/app/user/viewuserdetails/0/add')}}  primary  />

                    </div>
                  </div>
                  <div className=" col-xl-12 row" >
                    <SelectField
                      hintText="Select a name"
                      style={{width:'20%',marginRight:5}}
                      value={this.state.searchType}
                      onChange={this.handleChange('searchType')}
                    >
                      <MenuItem value='name' primaryText="Full Name" />
                      <MenuItem value='email' primaryText="Email Id" />
                    </SelectField>
                    <TextField
                      hintText="Search"
                      style={{width:'75%'}}
                      value={this.state.search}
                      onChange={this.handleChange('search')}
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="box box-default table-box mdl-shadow--2dp">
                    <table className="mdl-data-table table-responsive">
                      <thead>
                        <tr>
                          <th className="mdl-data-table__cell--non-numeric">#</th>
                          <th className="mdl-data-table__cell--non-numeric">Name</th>
                          <th className="mdl-data-table__cell--non-numeric">Email Id</th>
                          <th>Role</th>
                          <th>Last Login Time</th>
                          <th>More Details</th>
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
