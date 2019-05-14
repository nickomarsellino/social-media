import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Modal, ModalBody, ModalHeader} from 'mdbreact';
import {Button, Image, Icon, Form, Message} from 'semantic-ui-react';
import profile from '../../../daniel.jpg';
import axios from "axios/index";

import InputComments from "../../Comments__Component/Input__Comments";


class Modal_Detail_Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updateTittle: '',
            updateBody: '',
            openModal: false,
            modalCondition: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            updateTittle: this.props.title,
            updateBody: this.props.body
        });
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        axios.put('https://jsonplaceholder.typicode.com/posts/'+this.props.postId, {
            userId: this.state.userId,
            id: this.props.postId,
            title: this.state.updateTittle,
            body: this.state.updateBody
        })
            .then(response =>  {
                ReactDOM.render(
                    <Message success>
                         <Message.Header>Success Update This Post</Message.Header>
                    </Message>
                    , document.getElementById('update--message'));
            })
            .catch(function (error) {
                console.log(error);
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
    viewDetailPost() {

        //apabila userId Modalnya sam dengan userId yang sedang loggin sekarang
        //maka users bisa mengedit postnya di modal tersebut.
        if (this.props.userId === this.props.userLoggedIn) {
            return (
                <ModalBody className="post__container">
                    <h5>Author: &nbsp;{this.props.username}</h5>
                    <Form id="post__container" onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <Form.Field>
                            <input name="updateTittle"
                                   value={this.state.updateTittle}
                             onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.TextArea
                            value={this.state.updateBody}
                            type="text"
                            name="updateBody"
                            style={{maxHeight: "100px", minHeight: "90px"}}
                            onChange={this.handleInputChange}
                        />
                        <Button
                                id="update--button"
                                type="submit"
                                style={{borderRadius: "5px"}}
                        >Update Post</Button>
                    </Form>
                    <br/>

                    <div id="update--message"/>

                    <Icon.Group
                        id="comments--icon--modal">
                        <Icon name='comments'/>
                        {this.props.commentsData.length} Comments
                    </Icon.Group>
                </ModalBody>
            );
        }
        else {
            return (
                <ModalBody className="post__container">
                    <h4>{this.props.title}</h4>
                    <h5>Author: &nbsp;{this.props.username}</h5>
                    <p>{this.props.body}</p>
                    <Icon.Group
                        id="comments--icon">
                        <Icon name='comments'/>
                        {this.props.commentsData.length} Comments
                    </Icon.Group>
                    <hr/>
                </ModalBody>
            );
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.openModal} toggle={this.props.closeModal}>

                {this.viewDetailPost()}

                <ModalBody className="post__comment__container">
                    <div className="commentBox">
                        <InputComments
                            postId={this.props.postId}
                            userLoggedIn={this.props.userLoggedIn}
                        />

                        {/*<CommentsContainer*/}
                        {/*getTweetData={this.props.getTweetData}*/}
                        {/*tweet={this.props.tweet}*/}
                        {/*isHome={this.props.isHome}*/}
                        {/*isProfile={this.props.isProfile}*/}
                        {/*showUserProfileFromTweets={this.props.showUserProfileFromTweets}*/}
                        {/*/>*/}
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

export default Modal_Detail_Post;