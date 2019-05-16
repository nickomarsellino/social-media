import React, {Component} from 'react';
import FadeIn from 'react-fade-in';

import '../Explore.Component.css';

import ViewUser from "./Explore__User__Component";
import axios from "axios/index";

class Navigation__bar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: []
        };
    }

    componentWillMount() {
        this.getDataUsers()
    }

    componentWillUnmount() {
        this.getDataUsers()
    }

    getDataUsers() {
        axios.get('https://jsonplaceholder.typicode.com/users',)
            .then(res => {
                this.setState({
                    usersData: res.data
                });
            });
    }

    render() {
        return (
            <FadeIn>
                <div>
                    {this.state.usersData.map(users =>
                        <ViewUser
                            users={users}
                            history={this.props.history}
                            userLoggedIn={this.props.userLoggedIn}
                        />
                    )}
                </div>
            </FadeIn>
        );
    }
}

export default Navigation__bar;