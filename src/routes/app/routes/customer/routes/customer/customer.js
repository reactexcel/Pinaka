import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import ReactEcharts from 'components/ReactECharts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import CHARTCONFIG from 'constants/ChartConfig';
import * as actions from 'actions';


class Customer extends React.Component {
  constructor (props) {
    super(props);
  }
  render(){
    console.log(this.props,'props');
    let CustomerList = _.map(this.props.customer.data, (value, index) => (
      <tr key={index}>
        <td className="mdl-data-table__cell--non-numeric">{index+1}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.firstName} {value.lastName}</td>
        <td className="mdl-data-table__cell--non-numeric">{value.email}</td>
        <td>{value.phoneNumber}</td>
        <td>{value.Gender}</td>
        <td>
          <a href={`/#/app/customer/viewcustomerdetails/${index}/disable`}>More Detail</a>
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
                  <h2 className="article-title">Customer Details</h2>
                  <div className="box box-default table-box mdl-shadow--2dp">
                    <table className="mdl-data-table table-responsive">
                      <thead>
                        <tr>
                          <th className="mdl-data-table__cell--non-numeric">#</th>
                          <th className="mdl-data-table__cell--non-numeric">Name</th>
                          <th className="mdl-data-table__cell--non-numeric">Email Id</th>
                          <th>Phone Number</th>
                          <th>Gender</th>
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
    customer: state.customer
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customer));
