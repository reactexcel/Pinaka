import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Chart as ChartJS} from 'chart.js/src/chart';
import * as actions from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
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
      console.log(props,'asdasd');
      this.setState({customer:props.customer.customer.data.length});
      this.initChart();      
  }

  initChart() {
    console.log(this.props,'chart',this.state)
    this.chart = new ChartJS(this.canvas, {
      type: 'bar',
      data: {
        labels: ["Total No. of Customer"],
        datasets: [{
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
    return (
      <div>
        <canvas ref={(canvas) => this.canvas = canvas} />
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