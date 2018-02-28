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

  class Dashboard extends React.Component {
    constructor (props) {
      super(props);
    }
    componentWillMount(){
      let token = this.props.user.userLogged.data.token;
      this.props.interestListRequest();
      this.props.userListRequest(token);
      this.props.customerListRequest(token);
      this.props.redeemListRequest(token);  
    this.props.searchHeaderCustomerReset();          
    }
    render(){
      return(
        <div className="container-fluid no-breadcrumbs page-dashboard">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="2"><StatBoxes {...this.props} /></div>
          </QueueAnim>
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
