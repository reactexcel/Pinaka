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

  class Dashboard extends React.Component {
    constructor (props) {
      super(props);
    }
    componentWillMount(){
      let token = this.props.user.userLogged.data.token;
      this.props.interestListRequest();
      this.props.userListRequest(token);
      this.props.customerListRequest({token,page:0});
      this.props.redeemListRequest(token);  
    this.props.searchHeaderCustomerReset();          
    }
    render(){
      return(
        <div className="container-fluid no-breadcrumbs page-dashboard">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="2"><StatBoxes {...this.props} /></div>
          </QueueAnim>
          <div className="row box box-default" >
            <div style={{margin:30}}>
              <div className="row" style={{fontSize:21,fontWeight:600,marginBottom:30,marginLeft:"6%"}} > Total No. of Customer </div>
              <Chart {...this.props} />
            </div>
          </div>
          
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
