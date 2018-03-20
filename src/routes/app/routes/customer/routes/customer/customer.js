import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import ReactEcharts from 'components/ReactECharts';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import CHARTCONFIG from 'constants/ChartConfig';
import * as actions from 'actions';

const styles = {
  loading: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
  }
}

class Customer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      search:'',
      isLoading:false,
      page:0
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
    let token = this.props.user.userLogged.data.token;
    this.props.customerListRequest({token,page:0});
    this.props.interestListRequest();
    this.props.customerListChartRequest(token);    
    this.props.searchHeaderCustomerReset();    
  }
  componentWillReceiveProps(props){
    if(props.customer.isLoading){
      this.setState({isLoading:true});
    } else if (props.customer.isLoading == false){
      this.setState({isLoading:false});
    }
  }
  handleDelete (data) {     
    this.props.customerDeleteRequest({token:data.token,data:data.data});
      let searchvalue = {search:this.state.search};
      let apiData={token:data.token,data:searchvalue};
      setTimeout(()=>{this.props.searchCustomerRequest(apiData)}, 5000);    
  }
  handleChange = props => (event, value, index) => {
    if(props == 'searchType'){
      this.setState({[props]:index});
    } else {
      let token = this.props.user.userLogged.data.token;
      this.setState({[props]:event.target.value});
      let searchvalue = {search:event.target.value};
      let apiData={token,data:searchvalue}
      this.props.searchCustomerRequest(apiData);
    }
  }
  handleNext(val){
    const { page } = this.state;
    let token = this.props.user.userLogged.data.token;    
    if(val == 'next'){
      this.setState({page:page+1});
      this.props.customerListRequest({token,page:page+1});    
    } else if(val == 'prev'){
      this.setState({page:page-1});
      this.props.customerListRequest({token,page:page-1});      
    }
  }
  render(){
    const { page } = this.state;
    let totalPage = Math.ceil(this.props.allCustomer.customerList.data.length / 20);
    totalPage = totalPage == 0 ? 1 : totalPage;
    const { isLoading, search } = this.state;
    let CustomerList = _.map(this.props.customer.data, (value, index) => {
      const itemNo = page == 0? index+1 : (page*20)+(index+1);
      return(
      <tr key={index} >
        <td className="mdl-data-table__cell--non-numeric"><a href={`/#/app/customer/viewcustomerdetails/${value._id}/disable`}>{value.phone?value.phone.length > 10 ? value.phone.substring(2, value.phone.length) : value.phone : ''}</a></td>
        <td className="mdl-data-table__cell--non-numeric"><a href={`/#/app/customer/viewcustomerdetails/${value._id}/disable`}> {value.email}</a> </td>
        <td className="mdl-data-table__cell--non-numeric"> <a href={`/#/app/customer/viewcustomerdetails/${value._id}/disable`}>{value.name} {value.lastName}</a></td>
        <td>{value.CodeRedeemFlag ? "Yes" : "No"}</td>        
        <td>{value.sms_option ? "Yes" : "No"}</td>
        <td>{value.app_installed ? "Yes" : "No"}</td>
        {/* {this.state.search !='' ? 
            <td>
              <IconButton style={{boxShadow:'none'}}  onClick={()=>{ this.handleDelete({token:this.props.user.userLogged.data.token,data:{_id:value._id,infusion_id:value.infusion_id?value.infusion_id :'' }})  }} >
                <i className="material-icons" style={{color:'red'}} >delete_forever</i>
              </IconButton>
            </td>
          :
            null
        } */}
      </tr>
    )} );
    return(
      <div className="container-fluid no-breadcrumbs"  >
        <div className="row">
          <div className="col-xl-12 no-padding">
            <div className="box box-default">
              <div className="box-body">
                <article className="article">
                  <h2 className="article-title" style={{color:'black'}} >Customer</h2>
                  
                  <div className="row">
                    <div className="col-xs-4 search-resp" style={{border:"1px solid #e9e8ec", borderRadius:5,marginBottom:10,marginLeft:14}} >
                      {/* <RaisedButton label="Add Customer"  style={{boxShadow:'none',marginRight:5}}  onClick={()=>{this.props.history.push('/app/customer/viewcustomerdetails/0/add')}} primary /> */}
                        <i className="material-icons" style={{transform: 'translateY(8px)',color:'#e9e8ec'}}>search</i>
                        <TextField
                          hintText="Search"
                          icon={<i className="material-icons">search</i>}
                          style={{width:'90%' }}
                          value={this.state.search}
                          onChange={this.handleChange('search')}
                          type="text"
                          fullWidth
                        />
                    </div>
                    <div className="col-xs-2 hidden-xs" />
                    <div className="col-xs-6 btn-nxt-pre" style={{display:'flex'}} >
                      <span style={{marginRight:"10%",marginTop:"2%",color:"#grey"}} >{this.state.page + 1} out of {totalPage}</span>
                      <div  className="btn-s-m" style={{float:'right'}} >
                        <a style={{color:this.state.page!= 0 ? '#414afa':'grey',cursor:this.state.page !=0?'pointer':"not-allowed",marginRight:15}} onClick={()=>{this.state.page != 0 ?this.handleNext('prev'):null}} ><span><i className="material-icons" style={{transform:"translateY(7px)",color:this.state.page!= 0 ? '#414afa':'grey'}} >keyboard_arrow_left </i> Previous </span></a>
                        <a style={{color:this.props.customer.data.length > 20 ? '#414afa':'grey',cursor:this.props.customer.data.length > 20?'pointer':"not-allowed",marginRight:15}} onClick={()=>{this.props.customer.data.length > 20 ?this.handleNext('next'):null}} ><span> Next <i className="material-icons" style={{transform:"translateY(7px)",color:this.props.customer.data.length > 20? '#414afa':'grey'}} >keyboard_arrow_right </i> </span></a>
                      </div>
                      {/* {this.state.page != 0 ? <a style={{color:'#00bcd6',cursor:'pointer',marginRight:15}} onClick={()=>{this.handleNext('prev')}} > Previous </a>: null  } */}
                      {/* {this.props.customer.data.length < 20 ? null : <a style={{color:'#00bcd6',cursor:'pointer'}} onClick={()=>{this.handleNext('next')}} > Next </a>} */}
                    </div>
                  </div>
                  <div className="box box-default table-box mdl-shadow--2dp">
                    <table className="mdl-data-table table-responsive table-resp " >
                      <thead style={{backgroundColor:'#3f6ff6'}} >
                        <tr>
                          <th className="mdl-data-table__cell--non-numeric" style={{color:'white'}} >Phone Number</th>
                          <th className="mdl-data-table__cell--non-numeric" style={{color:'white'}} >Email Id</th>
                          <th className="mdl-data-table__cell--non-numeric" style={{color:'white'}} >Name</th>
                          <th style={{color:'white'}} >Redeem Code</th>
                          <th style={{color:'white'}} >SMS Option</th>
                          <th style={{color:'white'}} >App Installed</th>
                          {/* {this.state.search != ''? 
                          <th> Deactivate </th>
                          : null } */}
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ?
                          <tr>
                            <td colSpan={7} style={styles.loading} >Loading Data..........</td>
                          </tr>
                        :
                          search != '' && this.props.customer.data.length == 0 ?
                          <td colSpan={7} style={styles.loading} >No Data Found</td>                          
                          :
                          CustomerList
                        }
                      </tbody>
                    </table>
                  </div>
                  <div>
                    {this.state.page != 0 ? <a style={{color:'#00bcd6',cursor:'pointer',marginRight:15}} onClick={()=>{this.handleNext('prev')}} > Previous </a>: null  }
                    {this.props.customer.data.length < 20 ? null : <a style={{color:'#00bcd6',cursor:'pointer'}} onClick={()=>{this.handleNext('next')}} > Next </a>}
                    <span style={{float:"right",marginRight:5}} >{this.state.page + 1} of {totalPage}</span>
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
    allCustomer: state.customer,
    customer: state.customer.customer,
    user: state.user
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customer));
