import React, {Component} from 'react';
import axios from 'axios';
import {Feed, Icon, Image} from 'semantic-ui-react';
import {Card, CardBody} from "mdbreact";
import './View__Component.css';
import profile from '../../daniel.jpg';

import ModalComponent from "../Modal__Component/Modal_Component";


class View__Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            userId: '',
            username: '',
            title: '',
            body: '',
            userLoggedIn: '',
            openModal: false,
            modalCondition: ''
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
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

    openProfilePage(userId, username) {
        if (this.props.located === "profile") {

        }
        else {
            this.props.history.push({
                pathname: `/Profile/${username}`.replace(' ', ''),
                state: {
                    userId: userId
                }
            })
        }
    }


    buttonDelete(userId) {
        if (userId === this.state.userLoggedIn) {
            return (
                <Icon
                    size='large' name='trash'
                    id="recycleIcon"
                    onClick={() => this.openModal()}
                />
            );
        }
    }

    openModal() {
        this.setState({
            openModal: true,
            modalCondition: "Delete Modal"
        });
    }

    closeModal(isOpen) {
        if (isOpen) {
            this.setState({
                openModal: false,
                modalCondition: ""
            })
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
                                         onClick={() => this.openProfilePage(this.state.userId, this.state.username)}
                                    />

                                </Feed.Label>
                                <Feed.Content className="post__container">

                                    <Feed.Summary
                                        id="post--title"
                                        content={this.state.title}
                                    />

                                    <Feed.Extra
                                        // onClick={() => this.openModalTweet(tweet._id)}
                                        id="post--username" text
                                        content={this.state.username}
                                        onClick={() => this.openProfilePage(this.state.userId, this.state.username)}
                                    />

                                    <Feed.Extra
                                        // onClick={() => this.openModalTweet(tweet._id)}
                                        text
                                        content={this.state.body}
                                    /> <br/>

                                    <Icon.Group className=""
                                        // onClick={() => this.openModalTweet(tweet._id)}
                                                id="commentsIcon">
                                        <Icon name='comments'/>
                                        "100 Comments"
                                    </Icon.Group>

                                </Feed.Content>

                                <Feed.Label>
                                    {this.buttonDelete(this.state.userId)}
                                </Feed.Label>
                            </Feed.Event>
                        </Feed>
                    </CardBody>
                </Card>

                {/*Modal Component*/}
                <ModalComponent
                    openModal={this.state.openModal}
                    closeModal={this.closeModal}
                    condition={this.state.modalCondition}
                    title={this.state.title}
                    username={this.state.username}
                />
            </div>
        );
    }
}

export default View__Component;