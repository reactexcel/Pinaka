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
    marginTop: 20,
  },
  label1:{
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
        <article className="article">
        <div className="box-heading"><h3 className="article-title">User Detail</h3></div>

        <div className="box-body">
          {props.type == 'add' ?
              null
            :
              <div>
                {/* button for add update and delete */}
                <RaisedButton label="Edit" backgroundColor="#7edbe8" labelColor="#ffffff"  onClick={()=>{props.handleEdit('edit')}} className="btn-w-md" />
                <RaisedButton label="Delete" backgroundColor="#FF0000" style={{marginLeft:5}} labelColor="#ffffff"  onClick={()=>{props.userDeleteRequest({token:props.user.userLogged.data.token,data:{_id:props.data._id}})}} className="btn-w-md" />
                <RaisedButton label="Back"  style={{marginLeft:5}}  onClick={()=>{props.handleEdit('back')}} className="btn-w-md" />

              </div>
          }
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
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label style={styles.label} className="col-md-2 control-label">Password</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Enter password"
                      value={props.data.password?props.data.password:''}
                      onChange={props.handleChange('password')}
                      type="password"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
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
                        <RaisedButton label={props.type =='add'?"Add":"Save"} backgroundColor={"#1b025c"} labelColor="#ffffff" onClick={()=>{props.handleSave()}} className="btn-w-md" />
                        <RaisedButton label="Cancel" style={styles.button} onClick={()=>{props.handleEdit('cancel')}} className="btn-w-md" />
                      </div>
                    }
                  </div>
                </div>
              </form>
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
      type:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillReceiveProps(props){
    const { user, match } = props;
    let data=[{
      name:'',
      email:'',
      password:'',
      role:''
    }];
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
    if(props.user.updateUser.isSuccess == true ){
      props.userAddReset()
      props.history.push('/app/user/viewuser');
    }
  }
  componentWillMount(){
    const { user, match } = this.props;
    let data={
      name:'',
      email:'',
      password:'',
      role:''
    };
    if(match.params.type == 'add'){
      this.setState({
        data,
        type: match.params.type
      });
    }else{
      this.setState({
        data: user.user.data[match.params.id],
        type: match.params.type
      });
    }
  }
  handleSave(){
    const { data } = this.state;
    let token = this.props.user.userLogged.data.token;
    if(this.state.type == 'add'){
      this.props.userAddRequest({token,data});
    } else if(this.state.type == 'edit'){
      this.props.userUpdateRequest({token,data});
    }
  }
  handleEdit (data) {
    let type = data == "edit" ? 'edit' : this.props.match.params.type  ;
    this.setState({ type });
    if(data == 'back'){
      this.props.history.push('/app/user/viewuser');
    } else if (data == 'cancel' && this.state.type == 'edit') {
      this.setState({type:'disable'})
    } else if (data == 'cancel' && this.state.type == 'add') {
      this.props.history.push('/app/user/viewuser');
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
    user: state.user
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetails));
