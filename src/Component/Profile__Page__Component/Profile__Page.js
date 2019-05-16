import React, {Component} from 'react';
import axios from 'axios';
import {Card, Comment, Icon} from 'semantic-ui-react';
import profile from '../../daniel.jpg';
import './Profile__Page.css';

import ViewData from "../Post__ViewData/View__Container";
import AlbumComponent from "../Explore_Component/Explore__View__Album__Component/Explore__Album__Container";

class Profile__Page extends Component{
    constructor() {
        super();
        this.state = {
            userId: '',
            name: '',
            username: '',
            email: '',
            phone: '',
            website: '',
            current: 0
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

    renderMyComponent = () => {
        // Our switch conditional render
        switch(this.state.current) {
            case 0:
                return <ViewData
                    userLoggedIn={this.props.userLoggedIn}
                    userId={this.state.userId}
                    location="inProfilePage"
                />;
            case 1:
                return <AlbumComponent
                    userLoggedIn={this.props.userLoggedIn}
                    location="inProfilePage"
                    userId={this.state.userId}
                />;
            default:
                return null;
        }
    }

    handleChange = (event) => {
        // We are looking for data-trigger attribute
        // In this example we expect type number but trigger holds string
        // That's why we 'cast' to a number using Number()
        const current = Number(event.target.dataset.trigger);
        // Sets new state of current component and triggers new render
        this.setState({ current })
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

                <div>
                    <div id="explore__container" className="ui three item menu">
                        <div className="item itemNav"
                           data-trigger="0"
                           onClick={this.handleChange}
                        >
                            <Icon.Group size='large'>
                                <Icon name='users' />
                                <Icon corner name='add' />
                            </Icon.Group>
                            <p>&nbsp;Connect to another users</p>
                        </div>
                        <div className="item itemNav"
                           data-trigger="1"
                           onClick={this.handleChange}
                        >
                            <Icon.Group size='large'>
                                <Icon name='image' />
                                <Icon corner name='thumbs up outline' />
                            </Icon.Group>
                            <p>&nbsp;Best New Album</p>
                        </div>
                    </div>
                    {this.renderMyComponent()}
                </div>
            </div>
        );
    }
}

export default Profile__Page;