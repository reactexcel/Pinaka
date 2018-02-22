import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import ReactEcharts from 'components/ReactECharts';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import CHARTCONFIG from 'constants/ChartConfig';
import * as actions from 'actions';

const styles = {
  toggle: {
    maxWidth: 250,
    marginBottom: 16
  },
  radioButton: {
    marginBottom: 16,
  },
  dropFeild:{
    marginTop: -30,
  },
  label:{
    marginTop: 10,
  },
  button:{
    marginLeft: 10,
  }
};


const DetailsForm = (props) => {
  let isDisabled = props.type == 'disable' ? true : false;
  return(
  <div className="row">
    <div className="col-xl-12">

      <div className="box box-default">
        <div className="box-heading"><h3>Customer Detail</h3></div>
        <div className="box-body">
          <article className="article">

              <form role="form">
                <div className="form-group row">
                  <label htmlFor="inputEmail3" className="col-md-2 control-label">First Name</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="First name"
                      value={props.data.firstName}
                      onChange={props.handleChange('firstName')}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Last Name</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Last Name"
                      value={props.data.lastName}
                      onChange={props.handleChange('lastName')}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Email Id</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Email Id"
                      value={props.data.emailId} onChange={props.handleChange('emailId')}
                      type="email"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Phone Number</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Phone Number"
                      value={props.data.phoneNumber}
                      onChange={props.handleChange('phoneNumber')}
                      type="number"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">SMS Option</label>
                  <div className="col-md-10">
                    <Toggle
                      defaultToggled={props.data.smsOption}
                      onToggle={props.handleChange('smsOption')}
                      style={styles.toggle}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">App Installed Status</label>
                  <div className="col-md-10">
                    <Toggle
                      defaultToggled={props.data.appInstalledStatus}
                      onToggle={props.handleChange('appInstalledStatus')}
                      style={styles.toggle}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Interest</label>
                  <div className="col-md-10">
                    <Checkbox
                      label="Laser Tag"
                      style={styles.checkbox}
                      onCheck={props.handleChange({props:'interests',item:'Laser Tag'})}
                      checked={_.indexOf(props.data.interests, 'Laser Tag') >= 0}
                      disabled={isDisabled}
                    />
                    <Checkbox
                      label="Arcade"
                      style={styles.checkbox}
                      onCheck={props.handleChange({props:'interests',item:'Arcade'})}
                      checked={_.indexOf(props.data.interests, 'Arcade') >= 0}
                      disabled={isDisabled}
                    />
                    <Checkbox
                      label="League"
                      style={styles.checkbox}
                      onCheck={props.handleChange({props:'interests',item:'League'})}
                      checked={_.indexOf(props.data.interests, 'League') >= 0}
                      disabled={isDisabled}
                    />
                    <Checkbox
                      label="Cosmic bowling"
                      style={styles.checkbox}
                      onCheck={props.handleChange({props:'interests',item:'Cosmic bowling'})}
                      checked={_.indexOf(props.data.interests, 'Cosmic bowling') >= 0}
                      disabled={isDisabled}
                    />
                    <Checkbox
                      label="Kids party"
                      style={styles.checkbox}
                      onCheck={props.handleChange({props:'interests',item:'Kids party'})}
                      checked={_.indexOf(props.data.interests, 'Kids party') >= 0}
                      disabled={isDisabled}
                    />
                    <Checkbox
                      label="Bowling"
                      style={styles.checkbox}
                      onCheck={props.handleChange({props:'interests',item:'Bowling'})}
                      checked={_.indexOf(props.data.interests, 'Bowling') >= 0}
                      disabled={isDisabled}
                    />
                    <Checkbox
                      label="Food"
                      style={styles.checkbox}
                      onCheck={props.handleChange({props:'interests',item:'Food'})}
                      checked={_.indexOf(props.data.interests, 'Food') >= 0}
                      disabled={isDisabled}
                    />
                    <Checkbox
                      label="Adult Party"
                      style={styles.checkbox}
                      onCheck={props.handleChange({props:'interests',item:'Adult Party'})}
                      checked={_.indexOf(props.data.interests, 'Adult Party') >= 0}
                      disabled={isDisabled}
                    />
                    <Checkbox
                      label="Group Event"
                      style={styles.checkbox}
                      onCheck={props.handleChange({props:'interests',item:'Group Event'})}
                      checked={_.indexOf(props.data.interests, 'Group Event') >= 0}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Address Line 1</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Address Line 1"
                      value={props.data.AddressLine1}
                      onChange={props.handleChange('AddressLine1')}
                      type="text"
                      multiLine
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Address Line 2</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Address Line 2"
                      value={props.data.AddressLine2}
                      onChange={props.handleChange('AddressLine2')}
                      type="text"
                      multiLine
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">City</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select city"
                      value={props.data.City}
                      onChange={props.handleChange('City')}
                      disabled={isDisabled}
                    >
                      <MenuItem value={1} primaryText="A city" />
                      <MenuItem value={2} primaryText="B city" />
                    </SelectField>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">State</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select State"
                      value={props.data.State}
                      onChange={props.handleChange('State')}
                      disabled={isDisabled}
                    >
                      <MenuItem value={1} primaryText="A state" />
                      <MenuItem value={2} primaryText="B state" />
                    </SelectField>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Zip Code</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Zip code"
                      value={props.data.zipCode}
                      onChange={props.handleChange('zipCode')}
                      type="number"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Code Redeem Flag</label>
                  <div className="col-md-10">
                    <Toggle
                      defaultToggled={props.data.CodeRedeemFlag}
                      onToggle={props.handleChange('CodeRedeemFlag')}
                      style={styles.toggle}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Redeem Code</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Redeem Code"
                      value={props.data.RedeemCode}
                      onChange={props.handleChange('RedeemCode')}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Created By</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Created By"
                      value={props.data.CreatedBy}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Created Date</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Created date"
                      value={props.data.CreatedDate}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Modified By</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Modified by"
                      value={props.data.Modifiedby}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Last Modified Date</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Last Modified Date"
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Last Synced Date with Infusionsoft</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Sync"
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Date of Birth</label>
                  <div className="col-md-10">
                    <DatePicker
                      hintText="Select date"
                      container="inline"
                      mode="landscape"
                      value={props.data.DateofBirth}
                      onChange={props.handleChange('DateofBirth')}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Anniversary date with Year</label>
                  <div className="col-md-10">
                    <DatePicker
                      hintText="Select date"
                      container="inline"
                      mode="landscape"
                      value={props.data.DateofBirth}
                      onChange={props.handleChange('AnniversarydatewithYear')}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label">Gender</label>
                  <div className="col-md-10">
                      <RadioButtonGroup disabled={isDisabled} name="gender" defaultSelected={props.data.Gender} onChange={props.handleChange('Gender')}>
                      <RadioButton
                        value="Male"
                        label="Male"
                        style={styles.radioButton}
                        disabled={isDisabled}
                      />
                      <RadioButton
                        value="Female"
                        label="Female"
                        style={styles.radioButton}
                        disabled={isDisabled}
                      />
                    </RadioButtonGroup>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label" style={styles.label} >Kids</label>
                  <div className="col-md-10">
                    <Toggle
                      defaultToggled={props.data.Kids}
                      onToggle={props.handleChange('Kids')}
                      style={styles.toggle}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label" style={styles.label}>Marital status</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select Source"
                      style={styles.dropFeild}
                      value={props.data.Maritalstatus}
                      onChange={props.handleChange('Maritalstatus')}
                      disabled={isDisabled}
                    >
                      <MenuItem value={1} primaryText="Single" />
                      <MenuItem value={2} primaryText="Married" />
                    </SelectField>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-md-2 control-label" style={styles.label} >Occupation</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Occupation"
                      value={props.data.Occupation}
                      onChange={props.handleChange('Occupation')}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 control-label" style={styles.label}>Source</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select Source"
                      value={props.data.Source}
                      style={styles.dropFeild}
                      onChange={props.handleChange('Source')}
                      disabled={isDisabled}
                    >
                      <MenuItem value={1} primaryText="Mobile App" />
                      <MenuItem value={2} primaryText="SMS" />
                      <MenuItem value={3} primaryText="Manual" />
                      <MenuItem value={4} primaryText="Other" />
                    </SelectField>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-2"></div>
                  <div className="col-md-10">
                    {props.type == 'disable' ?
                      <RaisedButton label="Edit" backgroundColor="#7edbe8" labelColor="#ffffff"  onClick={()=>{props.handleEdit('edit')}} className="btn-w-md" />
                    :
                    <RaisedButton label="Save" backgroundColor={"#1b025c"} labelColor="#ffffff" href="#/app/customer/viewcustomer" className="btn-w-md" />
                    }
                    <RaisedButton label="Cancel" style={styles.button} onClick={()=>{props.handleEdit('cancel')}} className="btn-w-md" />
                  </div>
                </div>
              </form>

          </article>
        </div>
      </div>

    </div>
  </div>
);
}
class CustomerDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: '',
      type:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentWillMount(){
    const { user, match } = this.props;
    let data=[{
      firstName: '',
      lastName: '',
      emailId: '',
      phoneNumber: '',
      smsOption: true,
      appInstalledStatus: true,
      interests: [],
      AddressLine1: '',
      AddressLine2: '',
      City: 1,
      State: 1,
      zipCode: '',
      CodeRedeemFlag: false,
      RedeemCode: '',
      CreatedBy: '',
      CreatedDate: '',
      Modifiedby: '',
      LastModifiedDate: '',
      LastSyncedDatewithInfusionsoft: '',
      DateofBirth: '',
      AnniversarydatewithYear: '',
      Gender: "Male",
      Kids: false,
      Maritalstatus: 1,
      Occupation: '',
      Source: 1,
      accountStatus: ''
    }];
    if(match.params.type == 'add'){
      this.setState({
        data,
        type: match.params.type
      });
    }else{
      this.setState({
        data: user.data[match.params.id],
        type: match.params.type
      });
    }
  }
  handleEdit (data) {
    let type = data == "edit" ? 'edit' : this.props.match.params.type  ;
    this.setState({ type });
  }
  handleChange = props => (event, index, value) =>{
    let data = this.state.data;
    console.log(props,'props',index);
    if(props == 'Source' || props == 'Maritalstatus' || props == 'City' || props == 'State'){
      data[props] = value;
    } else if (props == 'Kids' || props == 'smsOption' || props == 'CodeRedeemFlag' || props == 'appInstalledStatus') {
      data[props] = !data[props];
    } else if (props.props == 'interests') {
      let interestsList = data["interests"];
      const dataIndex = _.indexOf(interestsList , props.item);
      index  ? _.indexOf(interestsList , props.item) >=0? interestsList: interestsList.push(props.item) : interestsList.splice(dataIndex, 1);
      data[props.props] = interestsList;
    } else if (props == 'DateofBirth') {
      data[props] = index;
    } else {
      data[props] = event.target.value;
    }
    this.setState({ data });
  }
  render(){
    console.log(this.props,'state',this.state);
    return(
      <div className="container-fluid no-breadcrumbs">
        <DetailsForm {...this.props} handleEdit={this.handleEdit} handleChange={this.handleChange} {...this.state} />
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    customer: state.customer.customer
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetails));
