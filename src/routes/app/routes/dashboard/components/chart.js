import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Chart as ChartJS} from 'chart.js/src/chart';
import * as actions from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  chart: {
    position: "relative",
    margin: "auto",
    height: "90vh",
    width: "80vw",
  }
}

class Chart extends Component {
constructor(props){
    super(props);
    this.state = {
        customer:0,
    }
}
  chart = null;
  updates = false;

  componentDidMount() {
    this.initChart();
  }

  componentWillUnmount() {
    // this.destroyChart();
  }

  componentDidUpdate() {
    if (this.chart) {
        this.chart.update();
    }
  }

  componentWillReceiveProps(props){
      this.setState({customer:props.customer.redemption.data.length});
      this.initChart();      
  }

  initChart() {
    this.chart = new ChartJS(this.canvas, {
      type: 'bar',
      data: {
        labels: ["Total No. of Redemption"],
        datasets: [{
          label:'time',
            data: [this.state.customer],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }],
    },
      options: {
        title: {
          display: true,
          text: 'Total No. Of Redemption'
        },
        legend: {
          display: false,
          position: this.props.type === 'bar' ? 'right' : 'top',
          labels: {
            usePointStyle: true,
            fontColor: 'rgb(255, 99, 132)'
          }
        }
      }
    });
  }

  destroyChart() {
    this.chart.destroy();
  }

  render() {
    const { redemptionOption } = this.props
    let redeem;
    switch(redemptionOption)   {
      case 1:
          redeem = 'of This Week';
          break;
      case 2:
          redeem = 'of This Month';
          break;
      case 3:
          redeem = 'of This Quater';
          break;
      case 4:
          redeem = 'of This Year';
          break; 
    }
    return (
      <div>
        <div className="col-md-12" >
          <div style={{margin:20}} > <h4>Redemption {redeem} </h4> </div>
          <div  style={{float:"right",marginRight:30,transform: "translateY(-20px)"}} >
            <RaisedButton label="Week" style={{boxShadow:'none' }}  onClick={()=>{ this.props.handleRedemption(1) }}   />
            <RaisedButton label="Month" style={{boxShadow:'none'}}  onClick={()=>{ this.props.handleRedemption(2) }} />
            <RaisedButton label="Quarter" style={{boxShadow:'none'}}  onClick={()=>{ this.props.handleRedemption(3) }} />
            <RaisedButton label="Year" style={{boxShadow:'none'}}  onClick={()=>{ this.props.handleRedemption(4) }} />                  
          </div>
        </div>
        <div style={{marginTop:50,marginBottom:50},styles.chart} >
          <canvas ref={(canvas) => this.canvas = canvas} />
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Chart));