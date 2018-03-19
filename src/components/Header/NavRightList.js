import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { withRouter } from 'react-router-dom';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};

class NavRightList extends React.Component {

  handleChange = (event, value) => {
    if(value == '/logout'){
      sessionStorage.removeItem('user');
      this.props.loginUserReset();
      this.props.history.push('/login');
    } else {
      this.props.history.push(value);      
    }
  }

  render() {
    return (
      <ul className="list-unstyled float-right">
        <li style={{marginRight: '10%'}}>
          <IconMenu
            iconButtonElement={<IconButton style={ImgIconButtonStyle,{color:'white',width:"50px",height:"50px", marginRight: 20,marginTop: 6,}}><i className="material-icons">settings</i></IconButton>}
            onChange={this.handleChange}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            menuStyle={{minWidth: '150px'}}
                    >
            <MenuItem
              value="/app/dashboard"
              primaryText="Dashboard"
              style={{fontSize: '14px', lineHeight: '48px'}}
              innerDivStyle={listItemStyle}
              leftIcon={<i className="material-icons">home</i>}
                        />
            {/* <MenuItem
              value="/app/page/about"
              primaryText="About"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">person_outline</i>}
                        /> */}
            <MenuItem
              value="/logout"
              primaryText="Log Out"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">forward</i>}
                        />
          </IconMenu>
        </li>
      </ul>
    );
  }
}

module.exports = withRouter(NavRightList);
