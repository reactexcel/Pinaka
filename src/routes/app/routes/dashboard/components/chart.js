import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Chart as ChartJS} from 'chart.js/src/chart';

class Chart extends Component {
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
      this.chart.data.datasets = this.props.data.datasets;
      this.chart.update();
    }
  }

  initChart() {
    this.chart = new ChartJS(this.canvas, {
      type: this.props.type,
      data: this.props.data,
      options: {
        legend: {
          display: false,
          position: this.props.type === 'bar' ? 'right' : 'top',
          onClick: (e, legendItem) => {},
          labels: {
            usePointStyle: true,
            fontColor: 'rgb(255, 99, 132)'
          }
        },
        tooltips: {
          mode: 'x',
          intersect: false,
          callbacks: {
            label(tooltipItems, data) {
              const dataset = data.datasets[tooltipItems.datasetIndex];
              const prefix = dataset.prefix ? dataset.prefix : '';
              const postfix = dataset.postfix ? dataset.postfix : '';
              return ` ${prefix}${tooltipItems.yLabel}${postfix}`;
            }
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

Chart.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.any)
    })),
    width: PropTypes.number
  })
};

export default Chart;