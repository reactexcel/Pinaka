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
    marginTop: 20,
  },
  label1:{
    marginTop: 10,
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
  const { isLoading, errors } = props;
  let isDisabled = props.type == 'disable' ? true : false;
  return(
  <div className="row">
    <div className="col-xl-12 no-padding">
      <div className="box box-default">
        <article className="article">
        <div className="box-heading"><h3 className="article-title" style={{color:'black'}} >User</h3></div>

        <div className="box-body">
        <div className="form-group row" style={styles.formGroup}>                
          {props.type == 'add' || props.type =='edit' || props.type == 'changePass' || props.isLoading ?
              null
            :
              <div className='col-md-8 col-xs-9 resp-p-x-0'>
                {/* button for add update and delete */}
                <RaisedButton label="Edit" backgroundColor="#3f6ff6" labelColor="#ffffff"  onClick={()=>{props.handleEdit('edit')}} className="btn-w-xs" />
                <RaisedButton label="Change Password" backgroundColor="#3f6ff6" style={{marginLeft:5}} labelColor="#ffffff"  onClick={()=>{props.handleEdit('changePass')}} className="btn-w-xs" />                
                <RaisedButton label="Delete" backgroundColor="#ff0051" labelColor="white" style={{marginLeft:5}} onClick={()=>{props.handleDelete({token:props.user.userLogged.data.token,data:{_id:props.data._id}})}} className="btn-w-xs btn-m-r-l-0 " />
                <RaisedButton label={props.type == 'disable'?"Back":"cancel"}  style={{marginLeft:5}}  onClick={()=>{props.type=='disable'? props.handleEdit('back'):props.handleEdit('cancel')}} className="btn-w-xs" />               
              </div>
          }
          <div className="col-md-2 col-xs-0 hidden-xs resp-p-x-0"></div>
                
        </div>
          {isLoading? 
            <div className="col-md-12" style={styles.loading} >
              {props.type == 'add' ? "Adding New User...........":'Please wait..'}
            </div>        
            :
              props.type == 'changePass'?
              <form role="form">
                 <div className="form-group row">
                  <label style={styles.label} className="col-md-2 control-label">Enter New Password</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Enter New password"
                      value={props.data.password?props.data.password:''}
                      onChange={props.handleChange('password')}
                      type="password"
                      disabled={isDisabled}
                      errorText={errors.password == '' ? null : errors.password}                      
                      />
                  </div>
                </div>
                <div>
                  <RaisedButton label={props.type =='add'?"Add":"Save"} backgroundColor={"#1b025c"} labelColor="#ffffff" onClick={()=>{props.handleSave()}} className="btn-w-md" />
                  <RaisedButton label="Cancel" style={styles.button} onClick={()=>{props.handleEdit('cancel')}} className="btn-w-md" />
                </div>
              </form>              
              :
              <form role="form">
                <div className="form-group row">
                  <label style={styles.label} className="col-md-2 control-label">Full Name</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="First name"
                      value={props.data.name?props.data.name:''}
                      onChange={props.handleChange('name')}
                      type="text"
                      disabled={isDisabled}
                      errorText={errors.name == '' ? null : errors.name}                      
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label} className="col-md-2 control-label">Email Id</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Email Id"
                      value={props.data.email?props.data.email:''}
                      onChange={props.handleChange('email')}
                      type="email"
                      disabled={isDisabled}
                      errorText={errors.email == '' ? null : errors.email}
                    />
                  </div>
                </div>
                {props.type == 'edit'?
                  null
                  :
                  <div className="form-group row">
                  <label style={styles.label} className="col-md-2 control-label">Password</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Enter password"
                      value={props.data.password?props.data.password:''}
                      onChange={props.handleChange('password')}
                      type="password"
                      disabled={isDisabled}
                      errorText={errors.password == '' ? null : errors.password}                      
                      />
                  </div>
                </div>
                }
                <div className="form-group row">
                  <label className="col-md-2 control-label" style={styles.label1}>Role</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select Source"
                      style={styles.dropFeild}
                      value={props.data.role?props.data.role:''}
                      onChange={props.handleChange('role')}
                      disabled={isDisabled}
                    >
                      <MenuItem value='Admin' primaryText="Admin" />
                      <MenuItem value='Staff' primaryText="Staff" />
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
                        <RaisedButton label={props.type =='add'?"Add":"Save"} backgroundColor={"#3f6ff6"} labelColor="#ffffff" onClick={()=>{props.handleSave()}} className="btn-w-md" />
                        <RaisedButton label="Cancel" style={styles.button} onClick={()=>{props.handleEdit('cancel')}} className="btn-w-md" />
                      </div>
                    }
                  </div>
                </div>
              </form>
                  
            }
        </div>
      </article>
      </div>
    </div>
  </div>
);
}
class UserDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: '',
      type:'',
      time: 0,
      isLoading:false,
      errors: {},      
      isOpen:false,
      message:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);        
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillReceiveProps(props){
    let token = props.user.userLogged.data.token;    
    const { user, match } = props;
    let data={
      name:'',
      email:'',
      password:'',
      role:'Admin'
    };
    if(match.params.type == 'add' && this.state.time == 0 ){
      this.setState({
        data,
        type: match.params.type,
        time: 1
      });
    } else if(match.params.type == 'disable') {
      const data = _.filter(user.user.data,{_id:match.params.id})
      this.setState({
        data: _.cloneDeep(data[0]),
        type: match.params.type
      });
    }
    if(props.user.updateUser.isSuccess == true ){
      if(this.state.type == 'add'){
        this.setState({isOpen:true,message:"Added User Successfully"});
      } else if (this.state.type == 'disable'){
        props.userListRequest(token);      
        this.setState({isOpen:true,message:"User Data Updated Successfully"});        
      }
    } else if(props.user.updateUser.isError == true){
      if(this.state.type == 'add'){
        this.setState({isOpen:true,message:props.user.updateUser.message.message});
      } else if (this.state.type == 'disable'){
        this.setState({isOpen:true,message:"Somthing went wrong"});        
      }
    }
    if(props.user.updateUser.isLoading){
      this.setState({isLoading:true})
    } else if (props.user.user.isLoading){
      this.setState({isLoading:true})
    } else if(!props.user.updateUser.isLoading && !props.user.user.isLoading ){
      this.setState({isLoading:false})
    }
  }
  componentWillMount(){
    const { user, match } = this.props;
    let data={
      name:'',
      email:'',
      password:'',
      role:'Admin'
    };
    if(match.params.type == 'add' && this.state.time == 0){
      this.setState({
        data,
        type: match.params.type,
        time: 1
      });
    }else if (match.params.type == 'disable') {
      const data = _.filter(user.user.data,{_id:match.params.id})      
      this.setState({
        data: _.cloneDeep(data[0]),
        type: match.params.type
      });
    }
  }
  handleDelete (data) {
    this.props.userDeleteRequest({token:data.token,data:data.data});
    this.props.history.push('/app/user/viewuser');
  }
  handleSave(){
    const { data } = this.state;
    let token = this.props.user.userLogged.data.token;
    const apiData = {token,data};
    let errors = {};
    
    
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(data.name != '' && data.email != '' && data.password != '' ){
      if(!data.email.match(pattern)){
        errors.email = 'Not a valid email';
      } else {
        if(this.state.type == 'add'){
          this.props.userAddRequest(apiData);
        } else if(this.state.type == 'edit'){
          this.props.userUpdateRequest(apiData);
        } else if (this.state.type == 'changePass'){
          this.props.userUpdatePasswordRequest(apiData)
        }
      }
      this.setState({errors: errors});
    } else {
      errors.name = data.name != '' ? '' : 'Cannot be Empty.';
      errors.email = data.email != '' ? !data.email.match(pattern)?'Not a valid email' :'' : 'Cannot be Empty.';
      errors.password = data.password != '' ? '' : 'Cannot be Empty.';
      this.setState({errors: errors});
    }
  }
  handleEdit (data) {
    let type = data == "edit" ? 'edit' : this.props.match.params.type  ;
    this.setState({ type });
    if(data == 'back'){
      this.props.history.goBack();
    } else if (data == 'cancel' && this.state.type == 'edit') {
      const data = _.filter(this.props.user.user.data,{_id:this.props.match.params.id})
      this.setState({type:'disable',data:_.cloneDeep(data[0])})
    } else if (data == 'cancel' && this.state.type == 'add') {
      this.props.history.goBack();
    } else if(data == 'changePass'){
      this.setState({type:data});
    }
  }
  handleChange = props => (event, value, index) =>{
    let data = this.state.data;
    if(props == 'role'){
      data[props] = index;
    } else {
      data[props] = event.target.value;
    }
    this.setState({ data });
  }
  handleRequestClose(){
    this.setState({isOpen:false},()=>{ if(this.state.type == 'add' && this.props.user.updateUser.isSuccess ) {this.props.history.push('/app/user/viewuser'); this.props.userReset();} });

    if(this.props.user.updateUser.isSuccess){
      this.props.userReset();      
    }
  }
  render(){
    return(
      <div className="container-fluid no-breadcrumbs">
      <Snackbar
          open={this.state.isOpen}
          style={{top:61,left:"58%",transition:"transform 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, visibility 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"}}
          message={this.state.message}
          autoHideDuration={1000}
          onRequestClose={this.handleRequestClose}
        />
        <DetailsForm {...this.props} handleSave={this.handleSave} handleDelete={this.handleDelete} handleEdit={this.handleEdit} handleChange={this.handleChange} {...this.state} />
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    user: state.user
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetails));
