import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button, Image, Icon} from 'semantic-ui-react';
import {
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavItem
} from 'mdbreact';
import profile from '../../daniel.jpg';
import logo from '../../logo.png';
import './Navigation__bar.css'

class Navigation__bar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            isInbox: false,
            userName: "",
            userId: "",
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false,
            profilePicture: "",
            messageData: "",
            isHaveNewMessage: ""
        };
        // this.onClick = this.onClick.bind(this);
        // this.toggle = this.toggle.bind(this);
        // this.logout = this.logout.bind(this);
        // this.searchClicked = this.searchClicked.bind(this);
        // this.inboxClicked = this.inboxClicked.bind(this);
    }

    imagedisplay(){

    }

    render() {
        return (
            <Navbar light={true} color="white" expand="md" dark={true} scrolling={true} id="navigation__container">
                <NavbarBrand id="logoText">
                    <img src={logo} alt="" height="33px"/>
                </NavbarBrand>
                <p id="navigation__title">Social Media</p>
                <NavbarNav right={true}>
                        <NavItem id="profileContainer">
                            <Link to={'/home/myProfile/' + this.state.userName.replace(' ', '')}>
                                <Image className="navigation__profile" id="navigation--picture" src={profile} avatar={true}>
                                    <img alt=" " src={profile}/>
                                </Image>
                                <span className="navigation__profile" id="navigation--name">Otong</span>
                            </Link>
                        </NavItem>
                    </NavbarNav>
            </Navbar>
        );
    }
}

export default Navigation__bar;
