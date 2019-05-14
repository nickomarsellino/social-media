import React, {Component} from 'react';
import axios from 'axios';
import {Button, Feed, Form, Message} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import './Comments__Component.css';
import ReactDOM from "react-dom";

class Input__Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            commentName: '',
            commentEmail: '',
            commentBody: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getDataUsers()
    }

    getDataUsers() {
        axios.get('https://jsonplaceholder.typicode.com/users/' + this.props.userLoggedIn)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    commentName: res.data.name,
                    commentEmail: res.data.email
                });
            });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('https://jsonplaceholder.typicode.com/posts/' + this.props.postId + '/comments', {
            postId: this.props.postId,
            name: this.state.commentName,
            email: this.state.commentEmail,
            body: this.state.commentBody
        })
            .then(response => {
                ReactDOM.render(
                    <Message positive>
                        <Message.Header>Success Post Comment</Message.Header>
                    </Message>
                    , document.getElementById('comment__message'));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <Form className="comments__form" onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <Feed>
                        <h4>Comments</h4>
                        <Feed.Event>
                            <Feed.Label id="profile--commment">
                                <img src={profile} alt={""}/>
                            </Feed.Label>
                            <Feed.Content>
                                <a>{this.state.username}</a>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            name="commentName"
                            value={this.state.commentName}
                            onChange={this.handleInputChange}

                        />
                        <Form.Input
                            fluid
                            name="commentEmail"
                            value={this.state.commentEmail}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.TextArea
                        placeholder="Comments ... "
                        id='form-textarea-control-opinion'
                        type="text"
                        name="commentBody"
                        style={{maxHeight: "100px", minHeight: "90px"}}
                        onChange={this.handleInputChange}
                    />
                    <Button
                        id="comment__button"
                        type="submit"
                        style={{borderRadius: "5px"}}
                    >Post Comment</Button>

                    <div id="comment__message"/>
                </Form>
            </div>
        );
    }
}

export default Input__Comments;