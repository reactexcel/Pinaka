import React from 'react';
import APPCONFIG from 'constants/Config';

class Footer extends React.Component {
  render() {
    return (
      <section className="app-footer"
        style={{backgroundColor:'#1b025c',position:'fixed'}}
         >
        <div className="container-fluid" >
          <span className="float-left">
            <span>Copyright © <a className="brand" target="_blank" style={{color:'white'}} >{APPCONFIG.brand}</a> {APPCONFIG.year}</span>
          </span>
        </div>
      </section>
    );
  }
}

module.exports = Footer;
