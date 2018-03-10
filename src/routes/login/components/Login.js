import React from 'react';
import APPCONFIG from 'constants/Config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import * as actions from 'actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';


const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand,
      email:'',
      password:'',
      isOpen:false,
      message:'',
      error:{},
      isLoading:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillMount(){
    if(sessionStorage.getItem('user') && this.props.user.userLogged.isSuccess){
        this.props.history.push('/app/dashboard');
    }
  }
  handleChange = props => (event, index, value) =>{
    this.setState({[props]:event.target.value});
  }
  handleSave(){
    let data = {email:this.state.email,password:this.state.password}
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;    
    let error = {};
    this.props.loginTokenReset();
    if(this.state.email != '' && this.state.password != ''){
      if(!this.state.email.match(pattern)){
        error.email = 'Not a valid email';
      } else {
        this.props.loginUserRequest(data);
      }
    } else {
      error.email =this.state.email != ''? '': 'Cannot be Empty';
      error.password =this.state.password != '' ? '' : 'Cannot be Empty';
    } 
    this.setState({error})
  }
  componentWillReceiveProps(props){
      
    if(props.user.userLogged.isSuccess) {
      sessionStorage.setItem('user',JSON.stringify(props.user.userLogged)) 
      props.history.push('/app/dashboard') 
    } 
      
    props.user.userLogged.isLoading ? this.setState({isLoading: true}) : this.setState({isLoading:false});
    if(props.user.userToken.isSuccess) {
      sessionStorage.removeItem('user');
      props.loginTokenReset()
    } 
  }
  render() {
    const { isLoading, error } = this.state;
    const { userLogged } = this.props.user;
    const isDisabled = userLogged.isLoading ? true : false;
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center">
              <img src="assets/logo1.png" style={{height:'50px'}} />
            </section>
            {isLoading ? 
                <RefreshIndicator
                size={40}
                left={160}
                top={50}
                status="loading"
                style={style.refresh}
              />
              :
              null
            }

            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    fullWidth
                    value={this.state.email}
                    type="email"
                    onChange={this.handleChange('email')}
                    disabled={isDisabled}
                    errorText={error.email == '' ? null : error.email}                    
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    fullWidth
                    disabled={isDisabled}                    
                    errorText={error.password == '' ? null : error.password}                    
                    />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            {/* <a href="#/app/dashboard" className="color-primary">Login</a> */}
            <RaisedButton label="Login"  onClick={()=>{this.handleSave()}}  primary disabled={isDisabled} />

          </div>
        </div>


      </div>
    );
  }
}

const Page = (props) => (
  <div className="page-login">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <Login {...props}/>
        </div>
      </QueueAnim>
    </div>
  </div>
);
function mapStateToProps (state) {
  return {
    user: state.user
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
