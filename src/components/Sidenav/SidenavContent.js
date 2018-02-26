import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import 'jquery-slimscroll/jquery.slimscroll.min';


class SidebarContent extends React.Component {

  componentDidMount() {
    const { history } = this.props;
    const nav = this.nav;
    const $nav = $(nav);

    // scroll
    $nav.slimscroll({
      height: '100%'
    });


    // Append icon to submenu
    // Append to child `div`
    $nav.find('.prepend-icon').children('div').prepend('<i class="material-icons">keyboard_arrow_right</i>');


    // AccordionNav
    const slideTime = 250;
    const $lists = $nav.find('ul').parent('li');
    $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down</i>');
    const $As = $lists.children('a');

    // Disable A link that has ul
    $As.on('click', event => event.preventDefault());

    // Accordion nav
    $nav.on('click', (e) => {

      const target = e.target;
      const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons
      if (!$parentLi.length) return; // return if doesn't click on li
      const $subUl = $parentLi.children('ul');


      // let depth = $subUl.parents().length; // but some li has no sub ul, so...
      const depth = $parentLi.parents().length + 1;

      // filter out all elements (except target) at current depth or greater
      const allAtDepth = $nav.find('ul').filter(function () {
        if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
          return true;
        }
        return false;
      });
      allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

      // Toggle target
      if ($parentLi.has('ul').length) {
        $parentLi.toggleClass('open');
      }
      $subUl.stop().slideToggle(slideTime);

    });


    // HighlightActiveItems
    const $links = $nav.find('a');
    const currentLocation = history.location;
    function highlightActive(pathname) {
      const path = `#${pathname}`;

      $links.each((i, link) => {
        const $link = $(link);
        const $li = $link.parent('li');
        const href = $link.attr('href');
        // console.log(href);

        if ($li.hasClass('active')) {
          $li.removeClass('active');
        }
        if (path.indexOf(href) === 0) {
          $li.addClass('active');
        }
      });
    }
    highlightActive(currentLocation.pathname);
    history.listen((location) => {
      highlightActive(location.pathname);
    });
  }


  render() {

    return (
      <ul className="nav" style={{backgroundColor:'#1b025c'}} ref={(c) => { this.nav = c; }}>
        <li><FlatButton href="#/app/dashboard"><i className="nav-icon material-icons">dashboard</i><span className="nav-text">Dashboard</span></FlatButton></li>
        <li>
          <FlatButton href="#/app/customer"><i className="nav-icon material-icons">people</i><span className="nav-text">Customer</span></FlatButton>
          <ul>
            {/* <li><FlatButton className="prepend-icon" href="#/app/customer/viewcustomerdetails/0/add"><span>Add Customer</span></FlatButton></li> */}
            <li><FlatButton className="prepend-icon" href="#/app/customer/viewcustomer"><span>View Customer</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/user"><i className="nav-icon material-icons">person</i><span className="nav-text">User</span></FlatButton>
          <ul>
            {/* <li><FlatButton className="prepend-icon" href="#/app/user/viewuserdetails/0/add"><span>Add User</span></FlatButton></li> */}
            <li><FlatButton className="prepend-icon" href="#/app/user/viewuser"><span>View User</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/customer/viewredeem"><span>View Redeem</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/redeem"><i className="nav-icon material-icons">credit_card
          </i><span className="nav-text">Redeem Code</span></FlatButton>
          <ul>
            {/* <li><FlatButton className="prepend-icon" href="#/app/user/viewuserdetails/0/add"><span>Add User</span></FlatButton></li> */}
            <li><FlatButton className="prepend-icon" href="#/app/redeem/viewredeem"><span>View Redeem</span></FlatButton></li>
          </ul>
        </li>
        {/* <li>
          <FlatButton href="#/app/chart"><i className="nav-icon material-icons">pie_chart_outlined</i><span className="nav-text">Charts</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/chart/line"><span>Line & Area</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/bar"><span>Bar</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/pie"><span>Pie</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/scatter"><span>Scatter</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/radar"><span>Radar</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/funnel"><span>Funnel</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/more"><span>More</span></FlatButton></li>
          </ul>
        </li> */}
      </ul>
    );
  }
}

module.exports = withRouter(SidebarContent);
