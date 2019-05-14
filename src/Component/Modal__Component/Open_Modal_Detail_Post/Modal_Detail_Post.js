import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Modal, ModalBody, ModalHeader} from 'mdbreact';
import {Button, Image, Icon, Form, Message} from 'semantic-ui-react';
import profile from '../../../daniel.jpg';
import axios from "axios/index";

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
                console.log(response.data)
                // this.setState({
                //     openModal: true,
                //     modalCondition: "Update Success Modal"
                // });
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
                                color='google plus'
                                type="submit"
                                style={{borderRadius: "5px"}}
                        >Update Post</Button>
                    </Form>
                    <br/>
                    <Message success id="update--message">
                        <Message.Header>Success Update This Post</Message.Header>
                    </Message>
                    <Icon.Group
                        id="comments--icon">
                        <Icon name='comments'/>
                        {this.props.commentsData.length} Comments
                    </Icon.Group>
                    <hr/>
                </ModalBody>
            );
        }
        else {
            return (
                <ModalBody className="post__container">
                    <h4>{this.props.title}</h4>
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
                <ModalHeader toggle={this.props.closeModal}>
                    <div className="profileBox">
                        <Image src={profile} avatar/>
                        <span><h5 id="nameBox">{this.props.username}</h5></span>
                    </div>
                </ModalHeader>

                {this.viewDetailPost()}

                <ModalBody className="post__comment__container">
                    <div className="commentBox">
                        {/*<CommentsBox*/}
                        {/*profilePicture={this.props.profilePicture}*/}
                        {/*userId={this.props.userId}*/}
                        {/*username={this.props.username}*/}
                        {/*tweet={this.props.tweet}*/}
                        {/*getTweetData={this.props.getTweetData}*/}
                        {/*isHome={this.props.isHome}*/}
                        {/*isProfile={this.props.isProfile}*/}
                        {/*showUserProfileFromTweets={this.props.showUserProfileFromTweets}*/}
                        {/*/>*/}
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