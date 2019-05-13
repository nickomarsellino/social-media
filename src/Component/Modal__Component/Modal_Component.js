import React, {Component} from 'react';
import axios from 'axios';
import {Feed, Icon, Image} from 'semantic-ui-react';
import {Container, Modal, ModalBody, ModalHeader} from 'mdbreact';
import profile from '../../daniel.jpg';
import './Modal_Component.css';

class Modal_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: []
        };
        this.closeModal = this.closeModal.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        // if (nextProps.tweet !== this.props.tweet) {
        //     this.setState({
        //         tweet: nextProps.tweet
        //     });
        // }
    }

    //Akses Fungsi untuk close modal di parent
    closeModal() {
        this.props.closeModal(this.props.openModal);
    }

    openModalDelete() {
        return (
            <Modal isOpen={this.props.openModal} toggle={this.closeModal} centered id="delete--modal">
                <ModalHeader id="delete--header" toggle={this.closeModal}>Success Delete This Content</ModalHeader>
                <ModalBody id="delete--content">
                    {this.props.title}
                    <p>Author :&nbsp;{this.props.username}</p>
                </ModalBody>
            </Modal>
        );
    }

    openPostSuccess(){
        return (
            <Modal isOpen={this.props.openModal} toggle={this.closeModal} centered>
                <ModalHeader toggle={this.closeModal} id="post__success">Success Post This Content</ModalHeader>
                <ModalBody className="post__container">
                    <Feed>
                        <Feed.Event>
                            <Feed.Label style={{width: "76px", padding: "8px 0"}}>
                                <img alt=" "
                                     src={profile}
                                />
                            </Feed.Label>
                            <Feed.Content>

                                <Feed.Summary
                                    id="post--title"
                                    content={this.props.title}
                                />

                                <Feed.Extra id="post--username" text
                                >
                                    Author :&nbsp;{this.props.username}
                                </Feed.Extra>

                                <Feed.Extra
                                    text
                                    content={this.props.body}
                                /> <br/>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </ModalBody>
            </Modal>
        );
    }

    //render sesuai dengan kondisi modal yang dibuka
    render() {
        if (this.props.openModal) {
            if(this.props.condition.localeCompare("Delete Modal") === 0){
                return (
                    <Container>
                        {this.openModalDelete()}
                    </Container>
                );
            }
            else if(this.props.condition.localeCompare("Post Success Modal") === 0){
                console.log("JALAN")
                return (
                <Container>
                    {this.openPostSuccess()}
                </Container>
                );
            }
        }
        else{
            return (
                <Modal isOpen={this.props.openModal} toggle={this.closeModal} centered>
                <Container>
                    <div>nothing</div>
                </Container>
                </Modal>
            );
        }
    }
}

export default Modal_Component;