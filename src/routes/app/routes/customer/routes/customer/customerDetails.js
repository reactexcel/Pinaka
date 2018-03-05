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
import {API} from 'constants/api';

const styles = {
  toggle: {
    maxWidth: 250,
    marginTop: 8
  },
  radioButton: {
    marginBottom: 16,
    float: 'left',
    width: '41%'
  },
  checkbox: {
    width: '20%',
    float: 'left',
  },
  dropFeild:{
    marginTop: 0,
  },
  label:{
    marginTop: 10,
  },
  label1:{
    marginTop: 14,
    paddingRight: 0
  },
  label2:{
    marginTop: 38,
  },
  button:{
    marginLeft: 10,
  },
  formGroup: {
    marginBottom: 5,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
  }
};


const DetailsForm = (props) => {
  let isDisabled = props.type == 'disable' ? true : false;
  const { isLoading, data, errors } = props;
  const statesList = _.sortBy(Object.keys(_.groupBy(statecity, function(o){ return o.state; })), function(o){return o;});
  const cityList = props.data.state == '' ? null : _.filter(statecity, function(o){ return o.state == props.data.state; });
  const dobDate = props.type == 'disable' || props.type == 'edit' ? new Date(props.data.birthday) : '';
  const anniversaryDate = props.type == 'disable' || props.type == 'edit' ? new Date(props.data.anniversary) : '';
  return(
  <div className="row">
    <div className="col-xl-12 no-padding">
      <div className="box box-default">
        <div className="box-heading">
            <h3 className="article-title">Customer Detail</h3>
        </div>
        <div className="box-body">
          <div className="form-group row" style={styles.formGroup}>
            {props.type == 'add' ?
              null
              :
              <div className='col-md-6 col-xs-9 resp-p-x-0'>
                <RaisedButton label="Edit" backgroundColor="#7edbe8" labelColor="#ffffff"  onClick={()=>{props.handleEdit('edit')}} className="btn-w-xs" />
                <RaisedButton label="Delete" backgroundColor="#FF0000" style={{marginLeft:5}} labelColor="#ffffff"  onClick={()=>{props.handleDelete({token:props.user.data.token,data:{_id:props.data._id}})}} className="btn-w-xs" />
                <RaisedButton label={props.type == 'disable'?"Back":"cancel"}  style={{marginLeft:5}}  onClick={()=>{props.type == 'disable'? props.handleEdit('back'):props.handleEdit('cancel')}} className="btn-w-xs" />
              </div>
            }
          <div className="col-md-2 col-xs-0 hidden-xs resp-p-x-0"></div>
          {props.type == 'disable' ?
              null
              :
                <div className='col-md-4 col-xs-3 resp-p-x-0'>
                  <RaisedButton style={{marginLeft:5}} label={props.type =='add'?"Add":"Save"} backgroundColor={"#1b025c"} labelColor="#ffffff" onClick={()=>{props.handleSave()}} className="btn-w-xs" />
                  {props.type == 'edit' ?
                    null
                    :
                    <RaisedButton label="Cancel" style={styles.button} onClick={()=>{props.handleEdit('cancel')}} className="btn-w-xs" />
                  }
                </div>
            }
          </div>
          <article className="article">
          {isLoading?
            <div className="col-md-12" style={{marginTop:40,fontSize:20,fontWeight:600,textAlign:'center'}}>
              {props.type == 'add'?"Adding New User..........." : 'Please Wait.....'}
            </div>
            :
              <form role="form" >
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label1}  className="col-md-2 control-label">First Name</label>
                  <div className="col-md-4">
                    <TextField
                      hintText="First name *"
                      value={props.data.name}
                      onChange={props.handleChange('name')}
                      type="text"
                      disabled={isDisabled}
                      errorText={errors.name == '' ? null : errors.name}
                    />
                  </div>
                  <label style={styles.label1} className="col-md-2 control-label">Last Name</label>
                  <div className="col-md-4">
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
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label1} className="col-md-2 control-label">Email Id</label>
                  <div className="col-md-4">
                    <TextField
                      hintText="Email Id *"
                      value={props.data.email} onChange={props.handleChange('email')}
                      type="email"
                      disabled={isDisabled}
                      errorText={errors.email == '' ? null : errors.email}
                    />
                  </div>
                  <label style={styles.label1} className="col-md-2 control-label">Phone Number</label>
                  <div className="col-md-4">
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
                {props.type == "add" && props.type == 'edit' ? 
                  null
               :
                  <div className="form-group row" style={styles.formGroup}>
                    {/* <label  className="col-md-2 control-label" style={{paddingTop: 14, paddingBottom: 20}}>Code Redeem Flag</label> */}
                    {/* <div className="col-md-4">
                      <div style={{paddingTop: 14, paddingBottom: 20, color: 'grey'}} > {props.data.CodeRedeemFlag ? "Yes" : "No"} </div>
                    </div> */}
                    <label style={styles.label1} className="col-md-2 control-label">Date of Birth *</label>
                  <div className="col-md-4">
                    <DatePicker
                      hintText="Select date"
                      container="inline"
                      mode="landscape"
                      value={dobDate}
                      onChange={props.handleChange('birthday')}
                      disabled={isDisabled}
                      errorText={errors.birthday == '' ? null : errors.birthday}
                    />
                  </div>
                    <label style={styles.label1} className="col-md-2 control-label">Redeem Code</label>
                    <div className="col-md-4">
                      <TextField
                        hintText="Redeem Code"
                        value={props.type =='add'?props.data.redeemCode:props.data.CodeRedeemFlag ? 'Yes': 'No'}
                        onChange={props.handleChange('redeemCode')}
                        type="text"
                        disabled = {props.type == 'add'? false:true}
                        />
                    </div>
                  </div>
                }
                <div className="form-group row" style={styles.formGroup}>
                  <label className="col-md-2 control-label" style={{paddingTop: 14, paddingBottom: 20}}>SMS Option</label>
                  <div className="col-md-4" style={{paddingTop: 14, paddingBottom: 20}}>
                    <Toggle
                      defaultToggled={props.data.sms_option}
                      onToggle={props.handleChange('sms_option')}
                      disabled={isDisabled}
                    />
                  </div>
                  <label  className="col-md-2 control-label" style={{paddingTop: 14, paddingBottom: 20}}>App Installed Status</label>
                  <div className="col-md-4" style={{paddingTop: 14, paddingBottom: 20}}>
                    <Toggle
                      defaultToggled={props.data.app_installed}
                      onToggle={props.handleChange('app_installed')}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row" style={styles.formGroup}>
                  <label className={errors.interests != '' && errors.interests != undefined ? 'col-md-2 control-label text-danger' : 'col-md-2 control-label'}>Interest *</label>
                  <div className="col-md-10">
                    {  _.map(props.intrestList,(value,index)=>(
                        <Checkbox
                          key={index}
                          label={value.name}
                          style={styles.checkbox}
                          onCheck={props.type == 'add'?props.handleChange({props:'interests',item:value,index:index}):props.handleChange({props:'interestsFlag',item:value,index:index})}
                          checked={_.indexOf(props.data.interest, value._id) >= 0}
                          disabled={isDisabled}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label1} className="col-md-2 control-label">Address Line 1 *</label>
                  <div className="col-md-4">
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
                  <label style={styles.label1} className="col-md-2 control-label">Address Line 2</label>
                  <div className="col-md-4">
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
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label2} className="col-md-2 control-label">State *</label>
                  <div className="col-md-4">
                    <SelectField
                      floatingLabelText="Select State"
                      value={props.data.state}
                      onChange={props.handleChange('state')}
                      disabled={isDisabled}
                    >
                    {_.map(statesList, (val, i) => <MenuItem value={val} primaryText={val} key={i} /> )}
                    </SelectField>
                  </div>
                    <label style={styles.label2} className="col-md-2 control-label">City *</label>
                    <div className="col-md-4">
                      <SelectField
                        floatingLabelText="Select city"
                        value={props.data.city}
                        onChange={props.handleChange('city')}
                        disabled={props.data.state == '' || isDisabled}
                        >
                        {_.map(cityList, (val, i) => <MenuItem value={val.city} primaryText={val.city} key={i} />)}
                      </SelectField>
                    </div>
                </div>
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label1} className="col-md-2 control-label">Zip Code *</label>
                  <div className="col-md-4">
                    <TextField
                      hintText="Zip code"
                      value={props.data.zipcode}
                      onChange={props.handleChange('zipcode')}
                      type="number"
                      disabled={isDisabled}
                      errorText={errors.zipcode == '' ? null : errors.zipcode}
                    />
                  </div>
                  {/* <label style={styles.label1} className="col-md-2 control-label">Date of Birth *</label>
                  <div className="col-md-4">
                    <DatePicker
                      hintText="Select date"
                      container="inline"
                      mode="landscape"
                      value={props.data.birthday}
                      onChange={props.handleChange('birthday')}
                      disabled={isDisabled}
                      errorText={errors.birthday == '' ? null : errors.birthday}
                    />
                  </div> */}
                {/* </div>
                <div className="form-group row" style={styles.formGroup}> */}
                  <label style={styles.label1}  className="col-md-2 control-label">Anniversary Date/Year *</label>
                  <div className="col-md-4">
                    <DatePicker
                      hintText="Select date"
                      container="inline"
                      mode="landscape"
                      value={anniversaryDate}
                      onChange={props.handleChange('anniversary')}
                      disabled={isDisabled}
                      errorText={errors.anniversary == '' ? null : errors.anniversary}
                    />
                  </div>
                </div>
                <div className="form-group row" style={styles.formGroup}>
                  <label className="col-md-2 control-label" style={{'paddingTop': 14}}>Gender *</label>
                  <div className='col-md-10' style={{'paddingTop': 14}}>
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
                <div className="form-group row" style={styles.formGroup}>
                  <label  className="col-md-2 control-label" style={styles.label} >Kids</label>
                  <div className="col-md-4">
                    <Toggle
                      defaultToggled={props.data.kids}
                      onToggle={props.handleChange('kids')}
                      style={styles.toggle}
                      disabled={isDisabled}
                    />
                  </div>
                  <label  className="col-md-2 control-label" style={styles.label}>Marital status</label>
                  <div className="col-md-4">
                    <SelectField
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
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label1} className="col-md-2 control-label" style={styles.label} >Occupation</label>
                  <div className="col-md-4">
                    <TextField
                      hintText="Occupation"
                      value={props.data.occupation}
                      onChange={props.handleChange('occupation')}
                      type="text"
                      disabled={isDisabled}
                      errorText={errors.occupation == '' ? null : errors.occupation}
                    />
                  </div>
                  <label className="col-md-2 control-label" style={styles.label}>Source</label>
                  <div className="col-md-4">
                    <SelectField
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
                <div className="form-group row" style={styles.formGroup}>
                  <div className="col-md-2"></div>
                  <div className="col-md-10">
                  {props.type == 'disable' ?
                  null
                :
                  <div>
                    <RaisedButton label={props.type =='add'?"Add":"Save"} backgroundColor={"#1b025c"} labelColor="#ffffff" onClick={()=>{props.handleSave()}} className="btn-w-md" />
                    {props.type == 'edit'?
                      null
                    :
                      <RaisedButton label="Cancel" style={styles.button} onClick={()=>{props.handleEdit('cancel')}} className="btn-w-md" />
                    }
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
      message:'',
      time: 0
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
      interest: [],      
      address1: '',
      address2: '',
      city: '',
      redeemCode:'',
      CodeRedeemFlag:false,
      state: '',
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
    this.setState({intrestList: interest.interestList.data,});
    if(match.params.type == 'add' && this.state.time == 0){
      this.setState({
        data,
        type: match.params.type,
        intrestList: interest.interestList.data,
        time : 1
      });
    }else if(match.params.type == 'disable' ){
      let data = customer.customer.data[match.params.id];
      data.phone = data.phone? data.phone.substring(2, data.phone.length) : data.phone;
      data.interest = [];
      _.map(data.interests,(value,index)=>{ return data.interest.push(value.id)}); 
      let interests = [];
      for(var i = 0; i < interest.interestList.data.length; i++){
        interests.push(false);
      }
      _.map(data.interest, (value) =>{
        let dataIndex =  _.findIndex(interest.interestList.data , {_id:value} )
        interests[dataIndex] = !interests[dataIndex];
      })
      data.interestsFlag = interests;
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
      interest: [],    
      redeemCode:'',
      CodeRedeemFlag:false,  
      address1: '',
      address2: '',
      city: '',
      state: '',
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
    this.setState({intrestList: interest.interestList.data,});    
    for(var i = 0; i < interest.interestList.data.length; i++){
        data.interests.push(false);
    }
    if(match.params.type == 'add' && this.state.time == 0){
      this.setState({
        data,
        type: match.params.type,
        intrestList: interest.interestList.data,
        time : 1        
      });
    } else if(match.params.type == 'disable') {
      let data = customer.customer.data[match.params.id];
      const item = customer.customer.data[match.params.id];
      data.phone = data.phone? data.phone.substring(2, data.phone.length) : data.phone;
      data.interest = [];
      const interest = data.interests;
      _.map(data.interests,(value,index)=>{ return data.interest.push(value.id)}); 
      let interests = [];
      if(interest.interestList != undefined) {

        for(var i = 0; i < interest.interestList.data.length; i++){
          interests.push(false);
        }
        _.map(data.interest, (value) =>{
          let dataIndex =  _.findIndex(interest.interestList.data , {_id:value} )
          interests[dataIndex] = !interests[dataIndex];
        })
        data.interestsFlag = interests;
      }
      this.setState({
        data: data,
        type: match.params.type,
        intrestList: interest.interestList != undefined? interest.interestList.data : '',
      });
    }
    if(props.customer.updateCustomer.isSuccess == true ){
      if(this.state.type == 'add'){
        this.setState({isOpen:true,message:"Added User Successfully"});
      } else if (this.state.type == 'disable' || this.state.type == 'edit' ){
        this.setState({isOpen:true,message:"User Data Updated Successfully"});
      }
    } else if(props.customer.updateCustomer.isError){
      if(this.state.type == 'add'){
        let message = '';
        const code = props.customer.updateCustomer.message.code;
        switch(code){
          case API.RESPONSE.SIGNUP.DUPLICATEEMAIL:
              message= 'This email already used, Please try again.';
              break;
          case API.RESPONSE.SIGNUP.DUPLICATEPHONE:
              message= 'This phone number already used, Pleae try again.';
              break;
          case API.RESPONSE.SIGNUP.INVALIDEMAIL:
              message = 'This email is invalid now. Please try again.';
              break;
          case API.RESPONSE.SIGNUP.INVALIDZIPCODE:
              message= 'This zipcode is invalid now. Please try again';
              break;
        }
        this.setState({isOpen:true,message});
      } else if (this.state.type == 'disable'){
        this.setState({isOpen:true,message:"Somthing went wrong"});        
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
    if(this.props.customer.updateCustomer.isSuccess){
      this.props.customerReset();
      this.props.history.push('/app/customer/viewcustomer');
    }
  }
  handleSave(){
    let { data } = this.state;
    let cloneData = _.cloneDeep(data);
    
    const token = this.props.user.data.token;
    let intrestList ='';
    if(this.state.type == 'add'){
      for(var i = 0; i < cloneData.interests.length; i++){
        if(cloneData.interests[i] == true){
          intrestList +=this.props.interest.interestList.data[i]._id+":";
        }
      }
    } else {
      for(var i = 0; i < cloneData.interestsFlag.length; i++){
        if(cloneData.interestsFlag[i] == true){
          intrestList +=this.props.interest.interestList.data[i]._id+":";
        }
      }
    }
    
    if(intrestList != ''){
      intrestList  = intrestList.substring(0,intrestList.length -1);
    }
    cloneData.interest = intrestList;
    const apiData = {token:token,data:cloneData};
    let interestCheck = this.state.type == 'add' ? cloneData.interest.length != 0 : true;  
    let errors = {};
    if(cloneData.name != '' && cloneData.lastName != '' && cloneData.email != ''&& cloneData.interest.length != 0  && cloneData.phone != '' && cloneData.address1 != '' && cloneData.address2 != '' && cloneData.zipcode != '' && cloneData.birthday != '' && cloneData.anniversary != '' && cloneData.occupation != ''){
      var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let email = cloneData.email.trim();
        if(cloneData.phone.length != 10){
            errors.phone = 'Phone should be of 10 digits.';
        }
        if(cloneData.zipcode.length != 5){
            errors.zipcode = 'Phone should be of 5 digits.';
        }
        if (_.isEmpty(email)) {
          errors.email = 'Empty field';
        } else if (!cloneData.email.match(pattern)) {
          errors.email = 'Not a valid email';
        } else if(cloneData.phone.length == 10 && cloneData.zipcode.length == 5) {
          errors.email = '';
          errors.phone = '';
          errors.zipcode = '';
          errors.others = '';
          this.setState({errors: errors});
          if(this.state.type == 'add'){
              this.props.customerAddRequest(apiData);
          } else if(this.state.type == 'disable' || this.state.type == "edit" ){
            this.setState({isLoading:true})
            this.props.customerUpdateRequest(apiData);
          }
        }
        this.setState({errors: errors});
    } else {
        errors.name = cloneData.name != '' ? '' : 'Cannot be Empty.';
        errors.lastName = cloneData.lastName != '' ? '' : 'Cannot be Empty.';
        errors.email = cloneData.email != '' ? '' : 'Cannot be Empty.';
        errors.phone = cloneData.phone != '' ? '' : 'Cannot be Empty.';
        errors.interests = cloneData.interest.length != 0 ? '' : 'Cannot be Empty.';
        errors.address1 = cloneData.address1 != '' ? '' : 'Cannot be Empty.';
        errors.address2 = cloneData.address2 != '' ? '' : 'Cannot be Empty.';
        errors.zipcode = cloneData.zipcode != '' ? '' : 'Cannot be Empty.';
        errors.birthday = cloneData.birthday != '' ? '' : 'Cannot be Empty.';
        errors.anniversary = cloneData.anniversary != '' ? '' : 'Cannot be Empty.';
        errors.occupation = cloneData.occupation != '' ? '' : 'Cannot be Empty.';
        this.setState({errors: errors});
    }
  }
  handleEdit (data) {
    let type = data == "edit" ? 'edit' : this.props.match.params.type  ;
    this.setState({ type });
    if(data == 'back'){
      this.props.history.goBack();
    } else if (data == 'cancel' && this.state.type == 'edit') {
      this.setState({type:'disable'})
    } else if (data == 'cancel' && this.state.type == 'add') {
      this.props.history.goBack();
    }
  }
  handleChange = props => (event, index, value) =>{
    let data = this.state.data;
    if(props == 'source' || props == 'marital' || props == 'city' || props == 'state'){
      data[props] = value;
    } else if (props == 'kids' || props == 'sms_option' || props == 'CodeRedeemFlag' || props == 'app_installed') {
      data[props] = !data[props];
    } else if (props.props == 'interests' || props.props == 'interestsFlag' ) {
      let interestsList = this.state.type== 'add'? data["interests"]:data["interestsFlag"];
      let interestList = data["interest"];
      const dataIndex = _.indexOf(interestList , props.item._id);
      interestsList[props.index] = !interestsList[props.index];
      index  ? _.indexOf(interestList , props.item) >=0 ? interestList: interestList.push(props.item._id) : interestList.splice(dataIndex, 1);
      data[props.props] = interestsList;
      data['interest'] = interestList;
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
    console.log(this.state,'edit customer')
    return(
      <div className="container-fluid no-breadcrumbs">
        <Snackbar
          open={this.state.isOpen}
          message={this.state.message}
          autoHideDuration={900}
          onRequestClose={this.handleRequestClose}
        />
        <DetailsForm {...this.props} intrestList={this.state.intrestList} handleDelete={this.handleDelete} handleSave={this.handleSave} handleEdit={this.handleEdit} handleChange={this.handleChange}  {...this.state} />
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
