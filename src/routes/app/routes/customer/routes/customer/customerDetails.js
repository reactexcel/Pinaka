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
import Popover from 'material-ui/Popover';
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
    width: '42%',
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
    marginBottom: 15,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
  }
};


const DetailsForm = (props) => {
  let token = props.user.data.token;  
  let isDisabled = props.type == 'disable' ? true : false;
  const { isLoading, data, errors } = props;
  const genderVaalue = props.data.gender;
  const statesList = _.sortBy(Object.keys(_.groupBy(statecity, function(o){ return o.state; })), function(o){return o;});
  const cityList = props.data.state == '' ? null : _.filter(statecity, function(o){ return o.state == props.data.state; });
  const dobDate = props.type == 'disable' || props.type == 'edit' ? props.data.birthday ? new Date(props.data.birthday): null : props.type == 'add' ? props.data.birthday : '';
  const anniversaryDate = props.type == 'disable' || props.type == 'edit' ? props.data.anniversary? new Date(props.data.anniversary): null : props.type == 'add' ? props.data.anniversary : '';
  return(
  <div className="row">
    <div className="col-xl-12 no-padding">
      <div className="box box-default">
        <div className="box-heading">
            <h3 className="article-title">Customer Detail</h3>
        </div>
        <div className="box-body">
          <div className="form-group row" style={styles.formGroup}>
            {props.type == 'add' || props.type == 'edit' ?
              isLoading ? 
              null
              :
              <div className='col-md-6 col-xs-9 resp-p-x-0 no-padding' >
                <RaisedButton style={{marginLeft:5}} label={props.type =='add'?"Add":"Save"} backgroundColor={"#1b025c"} labelColor="#ffffff" onClick={()=>{props.handleSave()}} className="btn-w-xs" />
                <RaisedButton label="Cancel" style={styles.button} onClick={()=>{props.handleEdit('cancel')}} className="btn-w-xs" />
              </div>  
              :
              isLoading ?
              null
              :
              <div className='col-md-6 col-xs-9 resp-p-x-0'>
                <RaisedButton label="Edit" backgroundColor="#7edbe8" labelColor="#ffffff"  onClick={()=>{props.handleEdit('edit')}} className="btn-w-xs" />
                <RaisedButton label="Delete" backgroundColor="#FF0000" style={{marginLeft:5}} labelColor="#ffffff"  onClick={()=>{props.handleDelete({token:props.user.data.token,data:{_id:props.data._id,infusion_id:props.data.infusion_id?props.data.infusion_id :'' }}) }} className="btn-w-xs" />
                <RaisedButton label={props.type == 'disable'?"Back":"cancel"}  style={{marginLeft:5}}  onClick={()=>{props.type == 'disable'? props.handleEdit('back'):props.handleEdit('cancel')}} className="btn-w-xs" />
              </div>
            }

            <div className="col-md-2 col-xs-0 hidden-xs resp-p-x-0"></div>
           {props.type =='add'?
              null
             :
              <div className="col-md-4 resp-p-x-0"  >
                <RaisedButton label={"Activity"}  style={{marginLeft:5, float:'right' }}  onClick={ props.handleActivity } className="btn-w-xs" />              
              </div>
            }
          </div>
          <article className="article">
          {isLoading?
            <div className="col-md-12" style={{marginTop:40,fontSize:20,fontWeight:600,textAlign:'center'}}>
              {props.type == 'add'?"Adding New Customer..........." : 'Please Wait.....'}
            </div>
            :
              <form role="form" >
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label1}  className="col-md-2 control-label">First Name </label>
                  <div className="col-md-4">
                    <TextField
                      hintText="First name"
                      value={props.data.name}
                      onChange={props.handleChange('name')}
                      type="text"
                      style={{width:'95%', display:'inherit'}}
                      disabled={isDisabled}
                    />
                  </div>
                  <label style={styles.label1} className="col-md-2 control-label">Last Name </label>
                  <div className="col-md-4">
                    <TextField
                      hintText="Last Name"
                      value={props.data.lastName}
                      onChange={props.handleChange('lastName')}
                      style={{width:'auto', display:'inherit'}}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label1} className="col-md-2 control-label">Email *</label>
                  <div className="col-md-4">
                    <TextField
                      hintText="Email ID"
                      value={props.data.email} onChange={props.handleChange('email')}
                      style={{width:'95%', display:'inherit'}}
                      type="email"
                      disabled={isDisabled}
                      errorText={errors.email == '' ? null : errors.email}
                    />
                  </div>
                  <label style={styles.label1} className="col-md-2 control-label">Phone Number *</label>
                  <div className="col-md-4">
                    <TextField
                      hintText="Phone Number "
                      className='spin-remove'
                      value={props.data.phone?props.data.phone:''}
                      onChange={props.handleChange('phone')}
                      style={{width:'auto', display:'inherit'}}
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
                    <label style={styles.label1} className="col-md-2 control-label">Date of Birth</label>
                  <div className="col-md-4">
                    <DatePicker
                      hintText="Select date"
                      textFieldStyle={{width:'95%', display:'inherit'}}
                      value={dobDate}
                      onChange={props.handleChange('birthday')}
                      disabled={isDisabled}
                      errorText={errors.birthday == '' ? null : errors.birthday}
                    />
                  </div>
                    <label style={styles.label1} className="col-md-2 control-label">Redeem Code</label>
                    <div className="col-md-4">
                      {!props.data.CodeRedeemFlag && props.type =='edit'?
                        <TextField
                        hintText="Redeem Code"
                        value={props.data.redeemCode ? props.data.redeemCode : ''}
                        onChange={props.handleChange('redeemCode')}
                        style={{width:'auto', display:'inherit'}}
                        type="text"
                        />
                        :
                        <TextField
                        hintText="Redeem Code"
                        value={props.type =='add'?props.data.redeemCode:props.data.CodeRedeemFlag ? 'Yes': 'No'}
                        onChange={props.handleChange('redeemCode')}
                        style={{width:'auto', display:'inherit'}}
                        type="text"
                        disabled = {props.type == 'add'? false:true}
                        />
                      }
                    </div>
                  </div>
                }

                  <div className="form-group row" style={styles.formGroup}>
                    <label style={styles.label1} className="col-md-2 control-label">Age Group</label>
                    <div className="col-md-4">
                    <SelectField
                        hintText="Select Age group"
                        value={props.data.age_group}
                        style={{width:"auto", display:'inherit'}}
                        onChange={props.handleChange('age_group')}
                        disabled={isDisabled}
                        >
                      <MenuItem value="0-18" primaryText="0-18" />
                      <MenuItem value="18-25" primaryText="18-25" />
                      <MenuItem value="25-35" primaryText="25-35" />
                      <MenuItem value="35-50" primaryText="35-50" />
                      <MenuItem value="50 + " primaryText="50 + " />                          
                      </SelectField>
                    </div>
                  </div>

                {props.type == 'add' || props.type == 'edit' ? 
                null:
                <div className="form-group row" style={styles.formGroup}>
                  <label className="col-md-2 control-label" style={{paddingTop: 14, paddingBottom: 20}}>SMS Option</label>
                  <div className="col-md-4" style={{paddingTop: 14, paddingBottom: 20}}>
                    <Toggle
                      defaultToggled={props.data.sms_option}
                      onToggle={props.handleChange('sms_option')}
                      disabled
                    />
                  </div>
                  <label  className="col-md-2 control-label" style={{paddingTop: 14, paddingBottom: 20}}>App Installed Status</label>
                  <div className="col-md-4" style={{paddingTop: 14, paddingBottom: 20}}>
                    <Toggle
                      defaultToggled={props.data.app_installed}
                      onToggle={props.handleChange('app_installed')}
                      disabled
                    />
                  </div>
                </div>
                }
                <div className="form-group row" style={styles.formGroup}>
                  <label className={'col-md-2 control-label'}>Interests </label>
                  <div className="col-md-10">
                    {  _.map(props.intrestList,(value,index)=>(
                        <Checkbox
                          key={index}
                          label={value.name}
                          style={styles.checkbox}
                          className="col-xs-12"
                          onCheck={props.type == 'add'?props.handleChange({props:'interests',item:value,index:index}):props.handleChange({props:'interestsFlag',item:value,index:index})}
                          checked={_.indexOf(props.data.interest, value._id) >= 0}
                          disabled={isDisabled}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label1} className="col-md-2 control-label">Address Line 1 </label>
                  <div className="col-md-4">
                    <TextField
                      hintText="Address Line 1"
                      value={props.data.address1}
                      onChange={props.handleChange('address1')}
                      type="text"
                      style={{width:'95%', display:'inherit'}}
                      multiLine
                      disabled={isDisabled}
                    />
                  </div>
                  <label style={styles.label1} className="col-md-2 control-label">Address Line 2</label>
                  <div className="col-md-4">
                    <TextField
                      hintText="Address Line 2"
                      value={props.data.address2}
                      onChange={props.handleChange('address2')}
                      style={{width:'auto', display:'inherit'}}
                      type="text"
                      multiLine
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label2} className="col-md-2 control-label">State </label>
                  <div className="col-md-4">
                    <SelectField
                      hintText="Select State"
                      style={{width:"95%", display:'inherit',marginTop: 20}}
                      value={props.data.state}
                      onChange={props.handleChange('state')}
                      disabled={isDisabled}
                    >
                    {_.map(statesList, (val, i) => <MenuItem value={val} primaryText={val} key={i} /> )}
                    </SelectField>
                  </div>
                    <label style={styles.label2} className="col-md-2 control-label">City </label>
                    <div className="col-md-4">
                      <SelectField
                        hintText="Select city"
                        value={props.data.city}
                        style={{width:"auto", display:'inherit',marginTop: 20}}
                        onChange={props.handleChange('city')}
                        disabled={props.data.state == '' || isDisabled}
                        >
                        {_.map(cityList, (val, i) => <MenuItem value={val.city} primaryText={val.city} key={i} />)}
                      </SelectField>
                    </div>
                </div>
                <div className="form-group row" style={styles.formGroup}>
                  <label style={styles.label1} className="col-md-2 control-label">Zip Code </label>
                  <div className="col-md-4">
                    <TextField
                      className='spin-remove'
                      hintText="Zip code"
                      value={props.data.zipcode}
                      onChange={props.handleChange('zipcode')}
                      style={{width:'95%', display:'inherit'}}
                      type="number"
                      disabled={isDisabled}
                      errorText={errors.zipcode == '' ? null : errors.zipcode}
                    />
                  </div>
                  <label style={styles.label1}  className="col-md-2 control-label">Anniversary Date/Year </label>
                  <div className="col-md-4">
                    <DatePicker
                      hintText="Select date"
                      textFieldStyle={{width:'auto', display:'inherit'}}
                      value={anniversaryDate}
                      onChange={props.handleChange('anniversary')}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="form-group row" style={styles.formGroup}>
                  <label className="col-md-2 control-label" style={{'paddingTop': 14}}>Gender </label>
                  <div className='col-md-10' style={{'paddingTop': 14}}>
                    <RadioButtonGroup disabled={isDisabled} name="gender" valueSelected={genderVaalue}  defaultSelected={genderVaalue} onChange={props.handleChange('gender')}>
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
                  <label  className="col-md-2 control-label" style={styles.label,{marginTop:14}}>Marital status</label>
                  <div className="col-md-4">
                    <SelectField
                      style={styles.dropFeild}
                      style={{width:"auto", display:'inherit'}}
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
                  <label style={styles.label1} className="col-md-2 control-label" style={styles.label} >Occupation </label>
                  <div className="col-md-4">
                    <TextField
                      hintText="Occupation"
                      value={props.data.occupation}
                      onChange={props.handleChange('occupation')}
                      style={{width:'95%', display:'inherit'}}
                      type="text"
                      disabled={isDisabled}
                    />
                  </div>
                  {props.type == 'add' ? 
                   null :
                  <label className="col-md-2 control-label" style={styles.label,{marginTop:14}}>Source</label>
                  }
                 {props.type == 'add' ? 
                   null :
                   <div className="col-md-4">
                    <SelectField
                      hintText="Select Source"
                      value={props.data.source}
                      style={styles.dropFeild,{width:"auto", display:'flow-root'}}
                      onChange={props.handleChange('source')}
                      disabled
                    >
                      <MenuItem value={1} primaryText="Mobile App" />
                      <MenuItem value={2} primaryText="SMS" />
                      <MenuItem value={3} primaryText="Manual" />
                      <MenuItem value={4} primaryText="Other" />
                    </SelectField>
                  </div>
                  }
                </div>
                <div className="form-group row" style={styles.formGroup,{marginTop:10}}>
                  {props.type == 'disable' ?
                  isLoading ?
                  null
                  :
                  <div className='col-md-6 col-xs-9 resp-p-x-0 ' style={{paddingLeft:13}} >
                    <RaisedButton label="Edit" backgroundColor="#7edbe8" labelColor="#ffffff"  onClick={()=>{props.handleEdit('edit')}} className="btn-w-xs" />
                    <RaisedButton label="Delete" backgroundColor="#FF0000" style={{marginLeft:5}} labelColor="#ffffff"  onClick={()=>{props.handleDelete({token:props.user.data.token,data:{_id:props.data._id,infusion_id:props.data.infusion_id?props.data.infusion_id :'' }})}} className="btn-w-xs" />
                    <RaisedButton label={props.type == 'disable'?"Back":"cancel"}  style={{marginLeft:5}}  onClick={()=>{props.type == 'disable'? props.handleEdit('back'):props.handleEdit('cancel')}} className="btn-w-xs" />
                  </div>
                :
                  <div className="col-md-6 col-xs-9 resp-p-x-0 " style={{paddingLeft:4}} >
                    <RaisedButton label={props.type =='add'?"Add":"Save"} backgroundColor={"#1b025c"} labelColor="#ffffff" onClick={()=>{props.handleSave()}} className="btn-w-xs" />
    
                      <RaisedButton label="Cancel" style={styles.button} onClick={()=>{props.handleEdit('cancel')}} className="btn-w-xs" />
                    
                  </div>
                }
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
      time: 0,
      open: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleActivity = this.handleActivity.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount(){
    let token = this.props.user.data.token;     
    this.props.customerListChartRequest(token);    
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
      age_group:'',
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
      const select = _.filter(customer.customerList.data,{_id:match.params.id})            
      let data = select[0];
      data.name = data.name ? data.name : '';
      data.lastName = data.lastName ? data.lastName:'';
      data.email = data.email ? data.email : '';
      data.address1 = data.address1 ? data.address1 : '';
      data.address2 = data.address2? data.address2 : '';
      data.anniversary = data.anniversary ? data.anniversary : '';
      data.birthday = data.birthday ? data.birthday : '';
      data.occupation = data.occupation ? data.occupation : '';
      data.state = data.state ? data.state : '';
      data.city = data.city ? data.city : '';
      data.zipcode = data.zipcode ? data.zipcode : '';
      data.source = data.source ? data.source : 1;
      data.phone = data.phone? data.phone.length > 10 ? data.phone.substring(2, data.phone.length) : data.phone : '';
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
        data: _.cloneDeep(data),
        type: match.params.type,
        intrestList: interest.interestList.data,
      });
    }
  }
  componentDidMount(){
    document.onkeydown = function(e) {
      e = e || window.event;
      switch(e.which || e.keyCode) {
        case 38: {
          e.preventDefault();
          break;
        }

        case 40: {
          e.preventDefault();
          break;
        }

        default: return;
      }
    }
  }
  componentWillReceiveProps(props){
    let token = props.user.data.token; 
    const { customer, match, interest } = props;
    let data={
      name: '',
      lastName: '',
      email: '',
      phone: '',
      sms_option: false,
      app_installed: false,
      interests: [],
      interest: [],    
      redeemCode:'',
      CodeRedeemFlag:false,  
      address1: '',
      address2: '',
      city: '',
      state: '',
      age_group:'',
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
      const select = _.filter(customer.customerList.data,{_id:match.params.id})      
      
      let data = select[0];
      const item = select[0]
      data.name = data.name ? data.name : '';
      data.lastName = data.lastName ? data.lastName:'';
      data.email = data.email ? data.email : '';
      data.address1 = data.address1 ? data.address1 : '';
      data.address2 = data.address2? data.address2 : '';
      data.anniversary = data.anniversary ? data.anniversary : '';
      data.birthday = data.birthday ? data.birthday : '';
      data.occupation = data.occupation ? data.occupation : '';
      data.state = data.state ? data.state : '';
      data.city = data.city ? data.city : '';
      data.zipcode = data.zipcode ? data.zipcode : '';
      data.phone = data.phone? data.phone.length > 10 ? data.phone.substring(2, data.phone.length) : data.phone : '';
      data.interest = [];
      const interest = data.interests;
      _.map(data.interests,(value,index)=>{ return data.interest.push(value.id)}); 
      let interests = [];
      if(props.interest.interestList != undefined) {
        for(var i = 0; i < props.interest.interestList.data.length; i++){
          interests.push(false);
        }
        _.map(data.interest, (value) =>{
          let dataIndex =  _.findIndex(props.interest.interestList.data , {_id:value} )
          interests[dataIndex] = !interests[dataIndex];
        })
        data.interestsFlag = interests;
      }
      this.setState({
        data: _.cloneDeep(data),
        type: match.params.type,
        intrestList: props.interest.interestList != undefined? props.interest.interestList.data : '',
      });
    }
    if(props.customer.updateCustomer.isSuccess == true ){
      
      if(this.state.type == 'add'){
        this.setState({isOpen:true,message:"Added User Successfully"});
      } else if (this.state.type == 'disable' || this.state.type == 'edit' ){
        props.customerListChartRequest(token);
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
        if(props.customer.updateCustomer.message.error == 1) {
          message = props.customer.updateCustomer.message.message.toUpperCase();
        }
        this.setState({isOpen:true,message});
      } else if (this.state.type == 'disable'){
        this.setState({isOpen:true,message:props.customer.updateCustomer.message.message});        
      }
    }
    if(props.customer.updateCustomer.isLoading){
      this.setState({isLoading:true})
    } else if (props.customer.customer.isLoading) {
      this.setState({isLoading:true})      
    } else if(!props.customer.updateCustomer.isLoading && !props.customer.customer.isLoading ){
      this.setState({isLoading:false})
    }
  }
  handleRequestClose(){
    this.setState({isOpen:false},()=>{ if(this.state.type == 'add' && this.props.customer.updateCustomer.isSuccess) { this.props.history.push('/app/customer/viewcustomer'); this.props.customerReset(); }})
    if(this.props.customer.updateCustomer.isSuccess){
      this.props.customerReset();
      this.setState({time:0})
    }
  }
  handleActivity = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
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
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(cloneData.email != '' && cloneData.phone != ''){
        let email = cloneData.email.trim();
        if( cloneData.phone == undefined){
          errors.phone = 'Please Enter Phone Number';          
        } else if( cloneData.phone != undefined && cloneData.phone.length != 10 ){
            errors.phone = 'Phone should be of 10 digits.';
        }
        if(cloneData.zipcode !='' && cloneData.zipcode.length != 5){
            errors.zipcode = 'ZipCode should be of 5 digits.';
        }
        if (_.isEmpty(email)) {
          errors.email = 'Empty field';
        } else if (!cloneData.email.match(pattern)) {
          errors.email = 'Not a valid email';
        } else if(cloneData.phone.length == 10 ) {
          errors.email = '';
          errors.phone = '';
          errors.zipcode = '';
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
        errors.email = cloneData.email != '' ? !cloneData.email.match(pattern)? 'Not a valid email':'' : 'Cannot be Empty.';
        errors.phone = cloneData.phone != '' ? '' : 'Cannot be Empty.';
        this.setState({errors: errors});
    }
  }
  handleEdit (data) {
    let type = data == "edit" ? 'edit' : this.props.match.params.type  ;
    this.setState({ type });
    if(data == 'back'){
      this.props.history.goBack();
    } else if (data == 'cancel' && this.state.type == 'edit') {
      const select = _.filter(this.props.customer.customerList.data,{_id:this.props.match.params.id})            
      let data = select[0]
      const item = select[0];
      data.name = data.name ? data.name : '';
      data.lastName = data.lastName ? data.lastName:'';
      data.email = data.email ? data.email : '';
      data.address1 = data.address1 ? data.address1 : '';
      data.address2 = data.address2? data.address2 : '';
      data.anniversary = data.anniversary ? data.anniversary : '';
      data.birthday = data.birthday ? data.birthday : '';
      data.occupation = data.occupation ? data.occupation : '';
      data.state = data.state ? data.state : '';
      data.city = data.city ? data.city : '';
      data.zipcode = data.zipcode ? data.zipcode : '';
      data.phone = data.phone? data.phone.length > 10 ? data.phone.substring(2, data.phone.length) : data.phone : '';      
      data.interest = [];
      const interest = data.interests;
      _.map(data.interests,(value,index)=>{ return data.interest.push(value.id)}); 
      let interests = [];
      if(this.props.interest.interestList != undefined) {
        for(var i = 0; i < this.props.interest.interestList.data.length; i++){
          interests.push(false);
        }
        _.map(data.interest, (value) =>{
          let dataIndex =  _.findIndex(this.props.interest.interestList.data , {_id:value} )
          interests[dataIndex] = !interests[dataIndex];
        })
        data.interestsFlag = interests;
      }
      this.setState({type:'disable',data:_.cloneDeep(data)})
    } else if (data == 'cancel' && this.state.type == 'add') {
      this.props.history.push('/app/customer/viewcustomer');
    }
  }
  handleChange = props => (event, index, value) =>{
    let data = this.state.data;
    if(props == 'source' || props == 'marital' || props == 'city' || props == 'state' || props == 'age_group' ){
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
    } else if ( props == 'gender'){
      data[props] = event.target.value == 'false' ? false : true
    }  else {
      data[props] = event.target.value;
    }
    this.setState({ data });
  }
  handleDelete (data) {
    this.props.customerDeleteRequest({token:data.token,data:data.data});
    this.props.customerListRequest({token,page:0});
    this.props.customerListChartRequest(token)
    this.props.history.push('/app/customer/viewcustomer');
  }
  render(){
    const { data } = this.state;
    const created_at = data.created_at != undefined ? new Date(data.created_at) : '';
    const reddeemed_date = data.reddeemed_date != undefined ? new Date(data.reddeemed_date) : '';
    const updated_at = data.updated_at != undefined ? new Date(data.updated_at) : '';
    const Infusion_synced_date = data.Infusion_synced_date != undefined ? new Date(data.Infusion_synced_date) : '';
    
    const createdOn = created_at != ''? `${created_at.getDate()}/${created_at.getMonth()}/${created_at.getFullYear()}  ${created_at.getHours()}:${created_at.getMinutes()} `:'';
    const updatedOn = updated_at != ''? `${updated_at.getDate()}/${updated_at.getMonth()}/${updated_at.getFullYear()}  ${updated_at.getHours()}:${updated_at.getMinutes()} `:'';
    const redeemedOn = reddeemed_date != ''? `${reddeemed_date.getDate()}/${reddeemed_date.getMonth()}/${reddeemed_date.getFullYear()}  ${reddeemed_date.getHours()}:${reddeemed_date.getMinutes()} `:'Not Yet Redeem';
    const syncOn = Infusion_synced_date != ''? `${Infusion_synced_date.getDate()}/${Infusion_synced_date.getMonth()}/${Infusion_synced_date.getFullYear()}  ${Infusion_synced_date.getHours()}:${Infusion_synced_date.getMinutes()} `:'';
    
    return(
      <div className="container-fluid no-breadcrumbs">
        <Snackbar
          open={this.state.isOpen}
          style={{top:61,left:"58%",transition:"transform 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, visibility 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"}}
          message={this.state.message}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleClose}
      >
        <table className="mdl-data-table table-responsive" >
          <tbody>
            <tr>
              <td className="mdl-data-table__cell--non-numeric"  >Created on - </td>
              <td> {createdOn} </td>
            </tr>
            <tr>
              <td className="mdl-data-table__cell--non-numeric" >Updated On - </td>
              <td> {updatedOn} </td>
            </tr>
            <tr>
              <td className="mdl-data-table__cell--non-numeric" >Infusion Sync on - </td>
              <td> {syncOn} </td>
            </tr>
            <tr>
              <td className="mdl-data-table__cell--non-numeric" >Code Redeem On - </td>
              <td> {redeemedOn} </td>
            </tr>
          </tbody>
        </table>
      </Popover>

        <DetailsForm {...this.props} intrestList={this.state.intrestList} handleActivity={this.handleActivity} handleDelete={this.handleDelete} handleSave={this.handleSave} handleEdit={this.handleEdit} handleChange={this.handleChange}  {...this.state} />
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
