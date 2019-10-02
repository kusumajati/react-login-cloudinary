import React from 'react';
import { withRouter } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


 class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
    this.logout = this.logout.bind(this)
  }

  logout() {
    localStorage.clear();
    this.props.history.push('/')
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    var SignupCheck
    var LoginCheck
    if (localStorage.getItem('isLoggedIn')) {
      LoginCheck =
        <NavItem onClick={this.logout}>
          <NavLink >Logout</NavLink>
        </NavItem>
      SignupCheck =<div></div>

    } else {
      LoginCheck =
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      SignupCheck = 
      <NavItem>
      <NavLink href="/signup">Sign Up</NavLink>
    </NavItem>
  }

      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">mpbinar</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {LoginCheck}
                {SignupCheck}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="/user">Users</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                  </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }


  export default  withRouter(Header)