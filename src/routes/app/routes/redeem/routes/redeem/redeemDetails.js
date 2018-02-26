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
import Snackbar from 'material-ui/Snackbar';
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
    <div className="col-xl-12">
      <div className="box box-default">
        <article className="article">
        <div className="box-heading"><h3 className="article-title">Redeem Code Detail</h3></div>

        <div className="box-body">
          {props.type == 'add' ?
              null
            :
              <div>
                {/* button for add update and delete */}
                <RaisedButton label="Edit" backgroundColor="#7edbe8" labelColor="#ffffff"  onClick={()=>{props.handleEdit('edit')}} className="btn-w-md" />
                <RaisedButton label="Delete" backgroundColor="#FF0000" style={{marginLeft:5}} labelColor="#ffffff"  onClick={()=>{props.handleDelete({token:props.user.userLogged.data.token,data:{_id:props.data._id} })}} className="btn-w-md" />
                <RaisedButton label="Back"  style={{marginLeft:5}}  onClick={()=>{props.handleEdit('back')}} className="btn-w-md" />
              </div>
          }
            {isLoading? 
              <div className="col-md-12" style={styles.loading} >
                Adding New Redeem Code...........
              </div>        
              :
              <form role="form" style={{margin:20}} >
                <div className="form-group row">
                  <label style={styles.label} className="col-md-2 control-label">Redeem Code</label>
                  <div className="col-md-10">
                    <TextField
                      hintText="Redeem Code"
                      value={props.data.redeem_code?props.data.redeem_code:''}
                      onChange={props.handleChange('redeem_code')}
                      type="text"
                      disabled={isDisabled}
                      errorText={errors.redeem == '' ? null : errors.redeem}                      
                    />
                  </div>
                </div>
                {props.type == 'edit'?
                <div className="form-group row">
                  <label className="col-md-2 control-label" style={styles.label1}>Type</label>
                  <div className="col-md-10">
                    <SelectField
                      floatingLabelText="Select Type"
                      style={styles.dropFeild}
                      value={props.data.type?props.data.type:''}
                      onChange={props.handleChange('type')}
                      disabled={isDisabled}
                    >
                      <MenuItem value='Universal' primaryText="Universal" />
                      <MenuItem value='General' primaryText="General" />
                    </SelectField>
                  </div>
                </div>
                : 
                  null
                }
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
              </div>
      </article>
      </div>
    </div>
  </div>
);
}
class redeemDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redeem_code: '',
      type:'',
      isLoading: false,
      isOpen:false,
      message:'',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);    
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillReceiveProps(props){
    const { user, match, redeem } = props;
    let data={
      redeem_code:'',
      type:'General',
    };
    if(match.params.type == 'add'){
      this.setState({
        data,
        type: match.params.type
      });
    } else {
      this.setState({
        data: redeem.redeem.data[match.params.id],
        type: match.params.type
      });
    }
    if(props.redeem.updateRedeem.isLoading){
      this.setState({isLoading:true})
    } else if(props.redeem.isLoading == false){
      this.setState({isLoading:false})
    }
    if(props.redeem.updateRedeem.isSuccess == true ){
      props.redeemReset()
      if(this.state.type == 'add'){
        this.setState({isOpen:true,message:"Added Redeem Code Successfully"});
      } else if (this.state.type == 'disable'){
        this.setState({isOpen:true,message:"Redeem Code Updated Successfully"});        
      }
    }
  }
  componentWillMount(){
    const { user, match, redeem } = this.props;
    let data={
      redeem_code:'',
      type:'General'
    };
    if(match.params.type == 'add'){
      this.setState({
        data,
        type: match.params.type
      });
    }else{
      this.setState({
        data: redeem.redeem.data[match.params.id],
        type: match.params.type
      });
    }
  }
  handleSave(){
    const { data } = this.state;
    let token = this.props.user.userLogged.data.token;
    const apiData = {token,data};
    let errors = {};
    if(data.redeem_code != ''){
      errors.redeem = '';
      if(this.state.type == 'add'){
        this.props.redeemAddRequest(apiData);
      } else if(this.state.type == 'edit'){
        this.props.redeemUpdateRequest(apiData);
      }
      this.setState({errors})
    } else {
      errors.redeem = data.redeem_code != '' ? '' : 'Cannot be Empty.';
      this.setState({errors: errors});      
    }
  }
  handleDelete (data) {
    this.props.redeemDeleteRequest({token:data.token,data:data.data});
    this.props.history.push('/app/redeem/viewredeem');    
  }
  handleEdit (data) {
    let type = data == "edit" ? 'edit' : this.props.match.params.type  ;
    this.setState({ type });
    if(data == 'back'){
      this.props.history.push('/app/redeem/viewredeem');
    } else if (data == 'cancel' && this.state.type == 'edit') {
      this.setState({type:'disable'})
    } else if (data == 'cancel' && this.state.type == 'add') {
      this.props.history.push('/app/redeem/viewredeem');
    }
  }
  handleChange = props => (event, value, index) =>{
    let data = this.state.data;
    if(props == 'type'){
      data[props] = index;
    } else {
      data[props] = event.target.value;
    }
    this.setState({ data });
  }
  handleRequestClose(){
    this.setState({isOpen:false})
    this.props.history.push('/app/redeem/viewredeem');
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
        <DetailsForm {...this.props} handleSave={this.handleSave} handleDelete={this.handleDelete} handleEdit={this.handleEdit} handleChange={this.handleChange} {...this.state} />
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    user: state.user,
    redeem: state.redeem
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(redeemDetails));
