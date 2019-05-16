import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Image} from 'semantic-ui-react';
import {
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavItem
} from 'mdbreact';
import profile from '../../daniel.jpg';
import logo from '../../logo.png';
import './Navigation__bar.css'

class Navigation__bar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userId: nextProps.userData.id,
            username: nextProps.userData.username
        });
    }


    render() {
        return (
            <Navbar light={true} color="white" expand="md" dark={true} scrolling={true} id="navigation__container">
                <NavbarBrand id="logoText">
                    <Link to={'/'}>
                        <img src={logo} alt="" height="33px"/>
                    </Link>
                </NavbarBrand>
                <Link to={'/'}>
                    <p id="navigation__title">Social Media</p>
                </Link>
                <NavbarNav right={true}>
                    <NavItem id="profileContainer">
                        <Link
                            to={`/Profile/${this.state.username}`}
                        >
                            <Image className="navigation__profile" id="navigation--picture" src={profile} avatar={true}>
                                <img alt=" " src={profile}/>
                            </Image>
                            <span className="navigation__profile" id="navigation--name">{this.state.username}</span>
                        </Link>
                    </NavItem>
                </NavbarNav>
            </Navbar>
        );
    }
}

export default withRouter(Navigation__bar);