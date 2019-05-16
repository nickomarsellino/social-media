import React, {Component} from 'react';
import axios from 'axios';
import {Card, Comment, Icon} from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import './Profile__Page.css';

import ViewData from "../Post__ViewData/View__Container";


class Profile__Page extends Component{
    constructor() {
        super();
        this.state = {
            userId: '',
            name: '',
            username: '',
            email: '',
            phone: '',
            website: ''
        };
    }

    componentWillMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users?username=`+this.props.username)
            .then(res => {
                this.setState({
                    userId: res.data[0].id,
                    name: res.data[0].name,
                    username: res.data[0].username,
                    email: res.data[0].email,
                    phone: res.data[0].phone,
                    website: res.data[0].website
                });
            });
    }
    render() {
        return (
            <div>
                <center>
                    <Card id="album__cart__container">
                        <Card.Content>
                            <Comment.Group>
                                <Comment>
                                    <Comment.Avatar as='a' src={profile} id="profile--page--image"/>
                                    <Comment.Content>
                                        <Comment.Author id="profile--page--name">{this.state.name}</Comment.Author>
                                        <Comment.Text>
                                            <Icon fitted name='user' /> {this.state.username}
                                        </Comment.Text>
                                        <Comment.Text>
                                            <Icon fitted name='mail' /> {this.state.email}
                                        </Comment.Text>
                                        <Comment.Text>
                                            <Icon fitted name='phone' /> {this.state.phone}
                                        </Comment.Text>
                                        <Comment.Text>
                                            <Icon fitted name='globe' /> {this.state.website}
                                        </Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group>
                        </Card.Content>
                    </Card>
                </center>

                <ViewData
                    userLoggedIn={this.props.userLoggedIn}
                    userId={this.state.userId}
                    location="inProfilePage"
                />

            </div>
        );
    }
}

export default Profile__Page;