import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import QueueAnim from 'rc-queue-anim';
import KPIsChart from './KPIsChart';
import AquisitionChart from './AquisitionChart';
import StatBoxes from './StatBoxes';
import EngagementStats from './EngagementStats';
import BenchmarkChart from './BenchmarkChart';
import * as actions from 'actions';
import Chart from './chart';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

const styles = {
  icon: {
    color:'red !important'
  }
}

  class Dashboard extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        selector:'',
        start_date:'',
        end_date:'',
        redemptionOption:1
      }
      this.handleSelect = this.handleSelect.bind(this);
      this.handleRedemption = this.handleRedemption.bind(this);
      this.redemption = this.redemption.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }
    componentWillMount(){
      let token = this.props.user.userLogged.data.token;
      this.props.interestListRequest();
      this.props.userListRequest(token);
      this.props.customerListRequest({token,page:0});
      this.props.redeemListRequest(token);  
      this.props.searchHeaderCustomerReset();   
      this.props.customerListChartRequest(token);
      this.redemption(1);
    }
    handleSelect(val){
      this.setState({selector:val})
    }
    handleRedemption(val){
      this.setState({redemptionOption: val});
      this.redemption(val);
    }
    redemption(val){
      let token = this.props.user.userLogged.data.token;
      const currDate = new Date();
      const endDate = new Date();
      if(val == 1){
        endDate.setDate(endDate.getDate() - 7 );
      } else if(val == 2) {
        endDate.setMonth(endDate.getMonth() - 1 );        
      } else if(val == 3) {
        endDate.setMonth(endDate.getMonth() - 4 );                
      } else if(val == 4){
        endDate.setFullYear(endDate.getFullYear() - 1 );                        
      }
      const apiData = {
        token,
        data:{
          end_date: currDate.toISOString(),
          start_date: endDate.toISOString()
        }
      }
      this.props.redemptionChartRequest(apiData)
    }
    handleDelete (data) {      
      this.props.customerDeleteRequest({token:data.token,data:data.data});
      this.props.customerListChartRequest(data.token);      
    }
    render(){
      let CustomerList = _.map(this.props.customer.customerList.data, (value, index) => (
        <tr key={index}>
          <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
          <td className="mdl-data-table__cell--non-numeric"> <a href={`/#/app/customer/viewcustomerdetails/${index}/disable`}>{value.name} {value.lastName}</a></td>
          <td className="mdl-data-table__cell--non-numeric">{value.email}</td>
          <td className="mdl-data-table__cell--non-numeric" ><a href={`/#/app/customer/viewcustomerdetails/${index}/disable`}>{value.phone?value.phone.substring(2, value.phone.length):''}</a></td>
          <td className="mdl-data-table__cell--non-numeric" >{value.CodeRedeemFlag ? "Yes" : "No"}</td>        
          <td className="mdl-data-table__cell--non-numeric" >{value.sms_option ? "Yes" : "No"}</td>
          <td className="mdl-data-table__cell--non-numeric" >{value.app_installed ? "Yes" : "No"}</td>
          <td className="mdl-data-table__cell--non-numeric" >
            <IconButton style={{boxShadow:'none'}}  onClick={()=>{ this.handleDelete({token:this.props.user.userLogged.data.token,data:{_id:value._id,infusion_id:value.infusion_id?value.infusion_id :'' }})  }} >
              <i className="material-icons" color="red" style={{color:'red'},styles.icon} >delete_forever</i>
            </IconButton>
          </td>          
        </tr>
      ));
      const customerData =( <table style={{marginLeft:'-1%', display: 'inherit' }} className="mdl-data-table table-responsive">
      <thead>
        <tr>
        <th className="mdl-data-table__cell--non-numeric">#</th>
        <th className="mdl-data-table__cell--non-numeric">Name</th>
        <th className="mdl-data-table__cell--non-numeric">Email Id</th>
        <th>Phone Number</th>
        <th>Redeem Code</th>
        <th>SMS Option</th>
        <th>App Installed</th>
        <th>Deactivate</th>
        </tr>
      </thead>
      <tbody>
        {CustomerList}
      </tbody>  
    </table>);

    let redemptionList = _.map(this.props.customer.redemption.data, (value, index) => {
      let date = new Date(value.reddeemed_date);
      return(
      <tr key={index}>
        <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.name} {value.lastName}</td>
        <td className="mdl-data-table__cell--non-numeric">{date.getDate()}/{date.getMonth()}/{date.getFullYear()}  {date.getHours()}:{date.getMinutes()} </td>
        
      </tr>
    )});
    const redemptionData =( <table style={{marginLeft:'1%',width:"94%"}} className="table mdl-data-table table-responsive">
      <thead>
        <tr>
        <th className="mdl-data-table__cell--non-numeric">#</th>
        <th className="mdl-data-table__cell--non-numeric">Customer Name</th>
        <th className="mdl-data-table__cell--non-numeric">Redemption Date and Time</th>
        </tr>
      </thead>
      <tbody>
        {redemptionList}
      </tbody>  
    </table>);

      return(
        <div className="container-fluid no-breadcrumbs page-dashboard">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="2"><StatBoxes {...this.props} handleSelect={this.handleSelect} {...this.state} /></div>
          </QueueAnim>
            <div className="row box box-default" style={{marginBottom:80}} >
                <Chart {...this.props} redemption={this.props.customer.redemption.data}  handleRedemption={this.handleRedemption} {...this.state} />
            </div>
          
          { this.state.selector == 'customer' || this.state.selector == 'redemption' ?
            
            <div  className="row box box-default" >
              <div className="col-md-12" >
                <h3>{this.state.selector == 'customer'? "Customer List" : this.state.selector == 'redemption'? "Redemption List" : null}</h3>
              {this.state.selector == 'customer'?
                customerData
                :
                this.state.selector == 'redemption' ? 
                this.props.customer.redemption.data.length > 0 ? redemptionData : null
                :
                null
              }
              </div>
            </div>
            :
            null
            }
        </div>
      );
    }
  }
  function mapStateToProps (state) {
    return {
      interest: state.interest,
      user: state.user,
      customer: state.customer
    };
  }
  const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
