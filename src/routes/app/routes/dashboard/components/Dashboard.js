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
          start_date: currDate.toISOString(),
          end_date: endDate.toISOString()
        }
      }
      this.props.redemptionChartRequest(apiData)
      console.log(this.props);
    }
    render(){
      let CustomerList = _.map(this.props.customer.customerList.data, (value, index) => (
        <tr key={index}>
          <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
          <td className="mdl-data-table__cell--non-numeric"> <a href={`/#/app/customer/viewcustomerdetails/${index}/disable`}>{value.name} {value.lastName}</a></td>
          <td className="mdl-data-table__cell--non-numeric">{value.email}</td>
          <td><a href={`/#/app/customer/viewcustomerdetails/${index}/disable`}>{value.phone?value.phone.substring(2, value.phone.length):''}</a></td>
          <td>{value.CodeRedeemFlag ? "Yes" : "No"}</td>        
          <td>{value.sms_option ? "Yes" : "No"}</td>
          <td>{value.app_installed ? "Yes" : "No"}</td>
        </tr>
      ));
      const customerData =( <table style={{marginLeft:'3%'}} className="mdl-data-table table-responsive">
      <thead>
        <tr>
        <th className="mdl-data-table__cell--non-numeric">#</th>
        <th className="mdl-data-table__cell--non-numeric">Name</th>
        <th className="mdl-data-table__cell--non-numeric">Email Id</th>
        <th>Phone Number</th>
        <th>Redeem Code</th>
        <th>SMS Option</th>
        <th>App Installed</th>
        </tr>
      </thead>
      <tbody>
        {CustomerList}
      </tbody>  
    </table>);

      return(
        <div className="container-fluid no-breadcrumbs page-dashboard">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="2"><StatBoxes {...this.props} handleSelect={this.handleSelect} {...this.state} /></div>
          </QueueAnim>
          {/* <div className="row box box-default" >
            <div style={{margin:30}}>
              <div className="row" style={{fontSize:21,fontWeight:600,marginBottom:30,marginLeft:"6%"}} > Total No. of Customer </div>
              <Chart {...this.props} />
            </div>
          </div> */}
          { this.state.selector != ''?
            <div  className="row box box-default" >
              <div className="col-md-12" >
                <h3>{this.state.selector == 'customer'? "Customer List" : this.state.selector == 'redemption'? "Redemption List" : null}</h3>
              {this.state.selector == 'redemption'?
                <div style={{float:"right",marginRight:7}} >
                <RaisedButton label="Week" style={{boxShadow:'none' }}  onClick={()=>{this.handleRedemption(1)}}   />
                <RaisedButton label="Month" style={{boxShadow:'none'}}  onClick={()=>{this.handleRedemption(2)}} />
                <RaisedButton label="Quarter" style={{boxShadow:'none'}}  onClick={()=>{this.handleRedemption(3)}} />
                <RaisedButton label="Year" style={{boxShadow:'none'}}  onClick={()=>{this.handleRedemption(4)}} />                  
                </div>
                :
                null
              }
              {this.state.selector == 'customer'?
                customerData
                :
                this.state.selector == 'redemption' ? 
                "redemptionData"
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
