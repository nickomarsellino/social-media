import React, {Component} from 'react';
import axios from 'axios';
import {Feed, Icon, Image} from 'semantic-ui-react';
import {Card, CardBody} from "mdbreact";
import './View__Component.css';
import profile from '../../daniel.jpg';

class View__Component extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            userId: '',
            username: '',
            title: '',
            body: '',
            userLoggedIn: ''
        };
    }
    componentWillMount() {
        console.log(this.props.userData);
        this.setState({
            Id: this.props.post.id,
            userId: this.props.post.userId,
            userLoggedIn: this.props.userLoggedIn,
            title: this.props.post.title,
            body: this.props.post.body
        });

        this.getDataUsers();
    }

    getDataUsers() {
        axios.get('https://jsonplaceholder.typicode.com/users/' + this.props.post.userId)
            .then(res => {
                this.setState({
                    username: res.data.username
                });
            });
    }

    viewUserProfile(username, userId) {
        return (
            <Feed.Summary content={username}
                // onClick={() => this.onClickedImage(userId, username)}
            />
        );
    }

    buttonDelete(userId) {
        if (userId === this.state.userLoggedIn) {
            return (
                <Icon
                    size='large' name='trash'
                    id="recycleIcon"
                />
            );
        }
    }
    render() {
        return (
            <div id="scrollableDiv" style={{overflow: "auto"}}>
                <Card className="post__container" id="text-warp">
                    <CardBody className="post__cart">
                        <Feed>
                            <Feed.Event>
                                <Feed.Label style={{width: "60px", padding: "8px 0"}}>
                                    <img alt=" "
                                         src={profile}
                                        // onClick={() => this.onClickedImage(userId, username)}
                                    />

                                </Feed.Label>
                                <Feed.Content className="Tweet-Content">

                                    {this.viewUserProfile(this.state.username, this.state.userId)}

                                    <Feed.Extra
                                        // onClick={() => this.openModalTweet(tweet._id)}
                                        id="tweetText" text
                                        content={this.state.title}
                                    />

                                    <Feed.Extra
                                        // onClick={() => this.openModalTweet(tweet._id)}
                                        id="tweetText" text
                                        content={this.state.body}
                                    /> <br/>

                                    <div className="buttonGroup">
                                        <Icon.Group className=""
                                            // onClick={() => this.openModalTweet(tweet._id)}
                                                    id="commentsIcon">
                                            <Icon name='comments'/>
                                            "100 Comments"
                                        </Icon.Group>
                                    </div>

                                </Feed.Content>

                                <Feed.Label className="Tweet-Delete">
                                    {this.buttonDelete(this.state.userId)}
                                </Feed.Label>

                            </Feed.Event>
                        </Feed>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default View__Component;