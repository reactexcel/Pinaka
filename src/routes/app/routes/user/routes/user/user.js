import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import { Link } from 'react-router';
import * as _ from 'lodash';
import ReactEcharts from 'components/ReactECharts';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import CHARTCONFIG from 'constants/ChartConfig';
import * as actions from 'actions';


class User extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      search:'',
      searchType:'name'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
    this.props.userListRequest();
  }
  handleChange = props => (event, value, index) => {
    if(props == 'searchType'){
      this.setState({[props]:index});
    } else {
      this.setState({[props]:event.target.value});
    }
  }
  render(){
    console.log(this.props,'***********************');
    let CustomerList = _.map(this.props.user.user.data, (value, index) => (
      <tr key={index}>
        <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.name}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.email}</td>
        <td>{value.role}</td>
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
                  <h2 className="article-title">User Details</h2>
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
    user: state.user
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
