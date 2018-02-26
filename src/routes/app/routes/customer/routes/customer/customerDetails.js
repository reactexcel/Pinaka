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
import Snackbar from 'material-ui/Snackbar';
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
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
  }
};


const DetailsForm = (props) => {
  let isDisabled = props.type == 'disable' ? true : false;
  let cities = _.map(statecity,(value,index) => (
      <MenuItem value={value.city} key={index} primaryText={value.city} />
    ));
  const { isLoading, errors } = props;
  return(
  <div className="row">
    <div className="col-xl-12">
      <div className="box box-default">
        <div className="box-heading">
            <h3 className="article-title">Customer Detail</h3>
        </div>
        <div className="box-body">
        {props.type == 'add' ?
            null
          :
            <div>
              {/* button for add update and delete */}
              <RaisedButton label="Edit" backgroundColor="#7edbe8" labelColor="#ffffff"  onClick={()=>{props.handleEdit('edit')}} className="btn-w-md" />
              <RaisedButton label="Delete" backgroundColor="#FF0000" style={{marginLeft:5}} labelColor="#ffffff"  onClick={()=>{props.handleDelete({token:props.user.data.token,data:{_id:props.data._id}})}} className="btn-w-md" />
              <RaisedButton label="Back"  style={{marginLeft:5}}  onClick={()=>{props.handleEdit('back')}} className="btn-w-md" />
            </div>
        }
          <article className="article">
          {isLoading?
            <div className="col-md-12" style={styles.loading} >
              Adding New User...........
            </div>
            :
              <form role="form">
                <div className="form-group row">
                  <label style={styles.label1}  className="col-md-2 control-label">First Name</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="First name *"
                      value={props.data.name}
                      onChange={props.handleChange('name')}
                      type="text"
                      disabled={isDisabled}
                      errorText={errors.name == '' ? null : errors.name}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Last Name</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Last Name *"
                      value={props.data.lastName}
                      onChange={props.handleChange('lastName')}
                      type="text"
                      disabled={isDisabled}
                      errorText={errors.lastName == '' ? null : errors.lastName}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Email Id</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Email Id *"
                      value={props.data.email} onChange={props.handleChange('email')}
                      type="email"
                      disabled={isDisabled}
                      errorText={errors.email == '' ? null : errors.email}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Phone Number</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Phone Number *"
                      value={props.data.phone?props.data.phone:''}
                      onChange={props.handleChange('phone')}
                      type="number"
                      disabled={isDisabled}
                      errorText={errors.phone == '' ? null : errors.phone}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 control-label">SMS Option</label>
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
                  <label className={errors.interests != '' && errors.interests != undefined ? 'col-md-2 control-label text-danger' : 'col-md-2 control-label'}>Interest *</label>
                  <div className="col-md-10">
                    {  _.map(props.intrestList,(value,index)=>(
                        <Checkbox
                          label={value.name}
                          style={styles.checkbox}
                          onCheck={props.handleChange({props:'interests',item:value._id})}
                          checked={_.indexOf(props.data.interests, value._id) >= 0}
                          disabled={isDisabled}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Address Line 1 *</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Address Line 1"
                      value={props.data.address1}
                      onChange={props.handleChange('address1')}
                      type="text"
                      multiLine
                      disabled={isDisabled}
                      errorText={errors.address1 == '' ? null : errors.address1}
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
                      errorText={errors.address2 == '' ? null : errors.address2}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label2} className="col-md-2 control-label">City *</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select city"
                      value={props.data.city}
                      onChange={props.handleChange('city')}
                      disabled={isDisabled}
                    >
                      <MenuItem value={"1"} primaryText="A city" />
                      <MenuItem value={"2"} primaryText="B city" />
                      {/* {cities} */}
                    </SelectField>
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label2} className="col-md-2 control-label">State *</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select State"
                      value={props.data.state}
                      onChange={props.handleChange('state')}
                      disabled={isDisabled}
                    >
                      <MenuItem value={"1"} primaryText="A state" />
                      <MenuItem value={"2"} primaryText="B state" />
                    </SelectField>
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1} className="col-md-2 control-label">Zip Code *</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Zip code"
                      value={props.data.zipcode}
                      onChange={props.handleChange('zipcode')}
                      type="number"
                      disabled={isDisabled}
                      errorText={errors.zipcode == '' ? null : errors.zipcode}
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
                  <label style={styles.label1} className="col-md-2 control-label">Date of Birth *</label>
                  <div className="col-md-10">
                    <DatePicker
                      hintText="Select date"
                      container="inline"
                      mode="landscape"
                      value={props.data.birthday}
                      onChange={props.handleChange('birthday')}
                      disabled={isDisabled}
                      errorText={errors.birthday == '' ? null : errors.birthday}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label1}  className="col-md-2 control-label">Anniversary date with Year *</label>
                  <div className="col-md-10">
                    <DatePicker
                      hintText="Select date"
                      container="inline"
                      mode="landscape"
                      value={props.data.anniversary}
                      onChange={props.handleChange('anniversary')}
                      disabled={isDisabled}
                      errorText={errors.anniversary == '' ? null : errors.anniversary}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label  className="col-md-2 control-label">Gender *</label>
                  <div className="col-md-10">
                      <RadioButtonGroup disabled={isDisabled} name="gender" defaultSelected={props.data.gender} onChange={props.handleChange('gender')}>
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
                      errorText={errors.occupation == '' ? null : errors.occupation}
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
                  null
                  // <RaisedButton label="Edit" backgroundColor="#7edbe8" labelColor="#ffffff"  onClick={()=>{props.handleEdit('edit')}} className="btn-w-md" />
                :
                  <div>
                    <RaisedButton label={props.type =='add'?"Add":"Save"} backgroundColor={"#1b025c"} labelColor="#ffffff" onClick={()=>{props.handleSave()}} className="btn-w-md" />
                    <RaisedButton label="Cancel" style={styles.button} onClick={()=>{props.handleEdit('cancel')}} className="btn-w-md" />
                  </div>
                }
                  </div>
                </div>
              </form>
            }
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
      type:'',
      isLoading:false,
      errors: {},
      isOpen:false,
      message:''      
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);        
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillMount(){
    const { customer, match, interest } = this.props;
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
      city: "1",
      state: "1",
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
        type: match.params.type,
        intrestList: interest.interestList.data,
      });
    }else{
      let data = customer.customer.data[match.params.id];
      data.phone = data.phone.substring(2, data.phone.length);
      this.setState({
        data: data,
        type: match.params.type,
        intrestList: interest.interestList.data,
      });
    }
  }
  componentWillReceiveProps(props){
    const { customer, match, interest } = props;
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
      source: 1
    };
    if(match.params.type == 'add'){
      this.setState({
        data,
        type: match.params.type,
        intrestList: interest.interestList.data,
      });
    } else {
      let data = customer.customer.data[match.params.id];
      data.phone = data.phone? data.phone.substring(2, data.phone.length) : data.phone;
      this.setState({
        data: data,
        type: match.params.type,
        intrestList: interest.interestList.data,
      });
    }
    if(props.customer.updateCustomer.isSuccess == true ){
      props.customerReset()
      if(this.state.type == 'add'){
        this.setState({isOpen:true,message:"Added User Successfully"});
      } else if (this.state.type == 'disable'){
        this.setState({isOpen:true,message:"User Data Updated Successfully"});        
      }
    }
    if(props.customer.updateCustomer.isLoading){
      this.setState({isLoading:true})
    } else if(props.customer.updateCustomer.isLoading == false){
      this.setState({isLoading:false})
    }
  }
  handleRequestClose(){
    this.setState({isOpen:false})
    this.props.history.push('/app/customer/viewcustomer');
  }
  handleSave(){
    const { data } = this.state;
    const token = this.props.user.data.token;
    const apiData = {token:token,data:data};
    let errors = {};
    if(data.name != '' && data.lastName != '' && data.email != '' && data.phone != '' && data.interests.length != 0 && data.address1 != '' && data.address2 != '' && data.zipcode != '' && data.birthday != '' && data.anniversary != '' && data.occupation != ''){
        var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let email = data.email.trim();
        if(data.phone.length != 10){
            errors.phone = 'Phone should be of 10 digits.';
        }
        if(data.zipcode.length != 5){
            errors.zipcode = 'Phone should be of 5 digits.';
        }
        if (_.isEmpty(email)) {
          errors.email = 'Empty field';
        } else if (!data.email.match(pattern)) {
          errors.email = 'Not a valid email';
        } else if(data.phone.length == 10 && data.zipcode.length == 5) {
            errors.email = '';
            errors.phone = '';
            errors.zipcode = '';
            errors.others = '';
            this.setState({errors: errors});
            if(this.state.type == 'add'){
                this.props.customerAddRequest(apiData);
            } else if(this.state.type == 'edit'){
                this.props.customerUpdateRequest(apiData);
            }
        }
        this.setState({errors: errors});
    } else {
        errors.name = data.name != '' ? '' : 'Cannot be Empty.';
        errors.lastName = data.lastName != '' ? '' : 'Cannot be Empty.';
        errors.email = data.email != '' ? '' : 'Cannot be Empty.';
        errors.phone = data.phone != '' ? '' : 'Cannot be Empty.';
        errors.interests = data.interests.length != 0 ? '' : 'Cannot be Empty.';
        errors.address1 = data.address1 != '' ? '' : 'Cannot be Empty.';
        errors.address2 = data.address2 != '' ? '' : 'Cannot be Empty.';
        errors.zipcode = data.zipcode != '' ? '' : 'Cannot be Empty.';
        errors.birthday = data.birthday != '' ? '' : 'Cannot be Empty.';
        errors.anniversary = data.anniversary != '' ? '' : 'Cannot be Empty.';
        errors.occupation = data.occupation != '' ? '' : 'Cannot be Empty.';
        this.setState({errors: errors});
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
  handleDelete (data) {
    this.props.customerDeleteRequest({token:data.token,data:data.data});
    this.props.history.push('/app/customer/viewcustomer');
  }
  render(){
    return(
      <div className="container-fluid no-breadcrumbs">
        <Snackbar
          open={this.state.isOpen}
          message={this.state.message}
          autoHideDuration={1000}
          onRequestClose={this.handleRequestClose}
        />
        <DetailsForm {...this.props} intrestList={this.state.intrestList} handleDelete={this.handleDelete} handleSave={this.handleSave} handleEdit={this.handleEdit} handleChange={this.handleChange} {...this.state} />
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    user: state.user.userLogged,
    customer: state.customer,
    interest: state.interest
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetails));
