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

class Redeem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      search:'',
      searchType:'name',
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(props){
    if(props.redeem.redeem.isLoading){
      this.setState({isLoading:true});
    } else if (props.redeem.redeem.isLoading == false){
      this.setState({isLoading:false});
    }
  }
  componentWillMount(){
    console.log('5456456',this.props);
    let token = this.props.user.userLogged.data.token;
    this.props.redeemListRequest(token);
  }
  handleChange = props => (event, value, index) => {
    if(props == 'searchType'){
      this.setState({[props]:index});
    } else {
      this.setState({[props]:event.target.value});
      let searchvalue = this.state.searchType == 'name' ? {type:this.state.searchType,name:event.target.value} : {type:this.state.searchType,email:event.target.value}
      let token = this.props.user.userLogged.data.token;
      let apiData = {token,data:searchvalue};
      // this.props.searchUserRequest(apiData);
    }
  }
  render(){
    const { isLoading } = this.state;
    let redeemList;
     redeemList = _.map(this.props.redeem.redeem.data, (value, index) => (
      <tr key={index}>
        <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.redeem_code}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.type}</td>
        <td>{value.active_status}</td>
        {/* <td>{value.lastLogin}</td> */}
        <td>
          <a href={`/#/app/redeem/viewredeemdetails/${index}/disable`}>More Detail</a>
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
                    <h2 className="article-title">Redeem Code Details</h2>
                    <div>
                      {/* button for add update and delete */}
                      <RaisedButton label="Add Redeem Code" style={{margin: '5px',}}  onClick={()=>{this.props.history.push('/app/redeem/viewredeemdetails/0/add')}}  primary  />

                    </div>
                  </div>
                  {/* <div className=" col-xl-12 row" >
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
                  </div> */}
                  <div className="box box-default table-box mdl-shadow--2dp">
                    <table className="mdl-data-table table-responsive">
                      <thead>
                        <tr>
                          <th className="mdl-data-table__cell--non-numeric">#</th>
                          <th className="mdl-data-table__cell--non-numeric">Redeem Code</th>
                          <th className="mdl-data-table__cell--non-numeric">Type</th>
                          <th>Status</th>
                          {/* <th>Used By</th> */}
                          <th>More Details</th>
                        </tr>
                      </thead>
                      <tbody>
                      {isLoading ? 
                        <tr>
                          <td colSpan={5} style={styles.loading} >Loading Data..........</td>
                        </tr>
                          :
                          redeemList
                      }
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
    user: state.user,
    redeem: state.redeem
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Redeem));