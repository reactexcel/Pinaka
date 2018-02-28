import React from 'react';
import APPCONFIG from 'constants/Config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import * as actions from 'actions';


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand,
      email:'',
      password:'',
      isOpen:false,
      message:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillMount(){
    if(sessionStorage.getItem('user')){
        this.props.history.push('/app/dashboard');
    }
  }
  handleChange = props => (event, index, value) =>{
    this.setState({[props]:event.target.value});
  }
  handleSave(){
    let data = {email:this.state.email,password:this.state.password}
    this.props.loginUserRequest(data);
  }
  componentWillReceiveProps(props){
    props.user.isSuccess ? this.props.history.push('/app/dashboard') : null;
  }
  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center">
              <img src="assets/logo1.png" style={{height:'50px'}} />
            </section>

            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    fullWidth
                    value={this.state.email}
                    type="email"
                    onChange={this.handleChange('email')}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    fullWidth
                    />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            {/* <a href="#/app/dashboard" className="color-primary">Login</a> */}
            <RaisedButton label="Login"  onClick={()=>{this.handleSave()}}  primary  />

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
    user: state.user.userLogged
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
