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
import {statecity} from 'constants/statecity';

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
  label1:{
    marginTop: 20,
  },
  label2:{
    marginTop: 38,
  },
  button:{
    marginLeft: 10,
  }
};


const DetailsForm = (props) => {
  let isDisabled = props.type == 'disable' ? true : false;
  let cities = _.map(statecity,(value,index)=>{
    return (
      <MenuItem value={value.city} key={index} primaryText={value.city} />

    );
  });

  return(
  <div className="row">
    <div className="col-xl-12">

      <div className="box box-default">
        <div className="box-heading"><h3>Customer Detail</h3></div>
        <div className="box-body">
          <article className="article">

              <form role="form">
                <div className="form-group row">
                  <label style={styles.label1}  className="col-md-2 control-label">First Name</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="First name"
                      value={props.data.name}
                      onChange={props.handleChange('name')}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Last Name</label>
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
                  <label style={styles.label1} className="col-md-2 control-label">Email Id</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Email Id"
                      value={props.data.email} onChange={props.handleChange('email')}
                      type="email"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Phone Number</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Phone Number"
                      value={props.data.phone}
                      onChange={props.handleChange('phone')}
                      type="number"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label  className="col-md-2 control-label">SMS Option</label>
                  <div className="col-md-10">
                    <Toggle
                      defaultToggled={props.data.sms_option}
                      onToggle={props.handleChange('sms_option')}
                      style={styles.toggle}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label  className="col-md-2 control-label">App Installed Status</label>
                  <div className="col-md-10">
                    <Toggle
                      defaultToggled={props.data.app_installed}
                      onToggle={props.handleChange('app_installed')}
                      style={styles.toggle}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label  className="col-md-2 control-label">Interest</label>
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
                  <label style={styles.label1} className="col-md-2 control-label">Address Line 1</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Address Line 1"
                      value={props.data.address1}
                      onChange={props.handleChange('address1')}
                      type="text"
                      multiLine
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Address Line 2</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Address Line 2"
                      value={props.data.address2}
                      onChange={props.handleChange('address2')}
                      type="text"
                      multiLine
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label2} className="col-md-2 control-label">City</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select city"
                      value={props.data.city}
                      onChange={props.handleChange('city')}
                      disabled={isDisabled}
                    >
                      <MenuItem value={1} primaryText="A city" />
                      <MenuItem value={2} primaryText="B city" />
                      {/* {cities} */}
                    </SelectField>
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label2} className="col-md-2 control-label">State</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select State"
                      value={props.data.state}
                      onChange={props.handleChange('state')}
                      disabled={isDisabled}
                    >
                      <MenuItem value={1} primaryText="A state" />
                      <MenuItem value={2} primaryText="B state" />
                    </SelectField>
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Zip Code</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Zip code"
                      value={props.data.zipcode}
                      onChange={props.handleChange('zipcode')}
                      type="number"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                {props.type != 'add' ?
                <div>
                <div className="form-group row">
                  <label  className="col-md-2 control-label">Code Redeem Flag</label>
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
                  <label style={styles.label1} className="col-md-2 control-label">Redeem Code</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Redeem Code"
                      value={props.data.redeemCode}
                      onChange={props.handleChange('redeemCode')}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Created By</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Created By"
                      value={props.data.createdBy}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Created Date</label>
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
                  <label style={styles.label1} className="col-md-2 control-label">Modified By</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Modified by"
                      value={props.data.updatedBy}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Last Modified Date</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Last Modified Date"
                      type="text"
                      value={props.data.updated_at}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Last Synced Date with Infusionsoft</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Sync"
                      value={props.data.Infusion_synced_date}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                </div>
                :
                null
              }
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Date of Birth</label>
                  <div className="col-md-10">
                    <DatePicker
                      hintText="Select date"
                      container="inline"
                      mode="landscape"
                      value={props.data.birthday}
                      onChange={props.handleChange('birthday')}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1}  className="col-md-2 control-label">Anniversary date with Year</label>
                  <div className="col-md-10">
                    <DatePicker
                      hintText="Select date"
                      container="inline"
                      mode="landscape"
                      value={props.data.anniversary}
                      onChange={props.handleChange('anniversary')}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label  className="col-md-2 control-label">Gender</label>
                  <div className="col-md-10">
                      <RadioButtonGroup disabled={isDisabled} name="gender" defaultSelected={props.data.gender} onChange={props.handleChange('Gender')}>
                      <RadioButton
                        value={false}
                        label="Male"
                        style={styles.radioButton}
                        disabled={isDisabled}
                      />
                      <RadioButton
                        value={true}
                        label="Female"
                        style={styles.radioButton}
                        disabled={isDisabled}
                      />
                    </RadioButtonGroup>
                  </div>
                </div>
                <div className="form-group row">
                  <label  className="col-md-2 control-label" style={styles.label} >Kids</label>
                  <div className="col-md-10">
                    <Toggle
                      defaultToggled={props.data.kids}
                      onToggle={props.handleChange('kids')}
                      style={styles.toggle}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label  className="col-md-2 control-label" style={styles.label}>Marital status</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select Source"
                      style={styles.dropFeild}
                      value={props.data.marital}
                      onChange={props.handleChange('marital')}
                      disabled={isDisabled}
                    >
                      <MenuItem value={false} primaryText="Single" />
                      <MenuItem value={true} primaryText="Married" />
                    </SelectField>
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label" style={styles.label} >Occupation</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Occupation"
                      value={props.data.occupation}
                      onChange={props.handleChange('occupation')}
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
                      value={props.data.source}
                      style={styles.dropFeild}
                      onChange={props.handleChange('source')}
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
                    <RaisedButton label={props.type =='add'?"Add":"Save"} backgroundColor={"#1b025c"} labelColor="#ffffff" onClick={()=>{props.handleSave()}} className="btn-w-md" />
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
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillMount(){
    const { customer, match } = this.props;
    let data={
      name: '',
      lastName: '',
      email: '',
      phone: '',
      sms_option: true,
      app_installed: false,
      interests: [],
      address1: '',
      address2: '',
      city: 1,
      state: 1,
      zipcode: '',
      password:'123',
      birthday: '',
      anniversary: '',
      gender: true,
      kids: false,
      marital: true,
      type:false,
      occupation: '',
      source: 1,
    };
    console.log(this.props);
    if(match.params.type == 'add'){
      this.setState({
        data,
        type: match.params.type
      });
    }else{
      this.setState({
        data: customer.customer.data[match.params.id],
        type: match.params.type
      });
    }
  }
  componentWillReceiveProps(props){
    const { user, match } = props;
    let data={
      name: '',
      lastName: '',
      email: '',
      phone: '',
      sms_option: true,
      app_installed: false,
      interests: [],
      address1: '',
      address2: '',
      city: 1,
      state: 1,
      zipcode: '',
      password:'123',
      birthday: '',
      anniversary: '',
      gender: true,
      kids: false,
      marital: true,
      type:false,
      occupation: '',
      source: 1,
    };
    if(match.params.type == 'add'){
      this.setState({
        data,
        type: match.params.type
      });
    } else {
      this.setState({
        data: user.user.data[match.params.id],
        type: match.params.type
      });
    }
    if(props.customer.updateCustomer.isSuccess == true ){
      props.customerAddReset()
      props.history.push('/app/customer/viewcustomer');
    }
  }
  handleSave(){
    const { data } = this.state;
    console.log(data);
    if(this.state.type == 'add'){
     this.props.customerAddRequest(data);
    } else if(this.state.type == 'edit'){
      this.props.customerUpdateRequest(data);
    }
  }
  handleEdit (data) {
    let type = data == "edit" ? 'edit' : this.props.match.params.type  ;
    this.setState({ type });
  }
  handleChange = props => (event, index, value) =>{
    let data = this.state.data;
    if(props == 'source' || props == 'marital' || props == 'city' || props == 'state'){
      data[props] = value;
    } else if (props == 'kids' || props == 'sms_option' || props == 'CodeRedeemFlag' || props == 'app_installed') {
      data[props] = !data[props];
    } else if (props.props == 'interests') {
      let interestsList = data["interests"];
      const dataIndex = _.indexOf(interestsList , props.item);
      index  ? _.indexOf(interestsList , props.item) >=0 ? interestsList: interestsList.push(props.item) : interestsList.splice(dataIndex, 1);
      data[props.props] = interestsList;
    } else if (props == 'birthday' || props == 'anniversary') {
      data[props] = index;
    } else {
      data[props] = event.target.value;
    }
    this.setState({ data });
  }
  render(){
    return(
      <div className="container-fluid no-breadcrumbs">
        <DetailsForm {...this.props} handleSave={this.handleSave} handleEdit={this.handleEdit} handleChange={this.handleChange} {...this.state} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetails));
