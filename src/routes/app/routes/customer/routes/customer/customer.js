import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import ReactEcharts from 'components/ReactECharts';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import CHARTCONFIG from 'constants/ChartConfig';
import * as actions from 'actions';


class Customer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      search:'',
      searchType:'email'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
    this.props.customerListRequest();
  }
  handleChange = props => (event, value, index) => {
    if(props == 'searchType'){
      this.setState({[props]:index});
    } else {
      this.setState({[props]:event.target.value});
      let searchvalue = this.state.searchType == 'phone' ? {type:this.state.searchType,phone:event.target.value} : {type:this.state.searchType,email:event.target.value}
      this.props.searchCustomerRequest(searchvalue);
    }
  }
  render(){
    console.log(this.props.customer.data);
    let CustomerList = _.map(this.props.customer.data, (value, index) => {
      return(
      <tr key={index}>
        <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.name} {value.lastName}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.email}</td>
        <td>{value.phone}</td>
        <td>{value.sms_option ? "Yes" : "No"}</td>
        <td>{value.app_installed ? "Yes" : "No"}</td>

        <td>
          <a href={`/#/app/customer/viewcustomerdetails/${index}/disable`}>More Detail</a>
        </td>
      </tr>
    )} );
    return(
      <div className="container-fluid no-breadcrumbs"  >
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-default">
              <div className="box-body">
                <article className="article">
                  <h2 className="article-title">Customer Details</h2>
                  <div>
                    {/* button for add update and delete */}
                    <RaisedButton label="Add User" style={{marginBottom:5}}  onClick={()=>{this.props.history.push('/app/customer/viewcustomerdetails/0/add')}}  primary  />

                  </div>
                  <div className=" col-xl-12 row" >
                    <SelectField
                      hintText="Select a name"
                      style={{width:'20%',marginRight:5}}
                      value={this.state.searchType}
                      onChange={this.handleChange('searchType')}
                    >
                      <MenuItem value='email' primaryText="Email Id" />
                      <MenuItem value='phone' primaryText="Phone Number" />
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
                          <th>Phone Number</th>
                          <th>SMS Option</th>
                          <th>App Installed</th>
                          <th>More Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CustomerList}
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
    customer: state.customer.customer
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customer));
