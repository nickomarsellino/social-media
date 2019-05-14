import React, {Component} from 'react';
import axios from 'axios';
import {Feed, Icon, Image} from 'semantic-ui-react';
import {Container, Modal, ModalBody, ModalHeader} from 'mdbreact';
import profile from '../../../daniel.jpg';

class Modal__Delete extends Component{
    render() {
        return (
            <Modal isOpen={this.props.openModal} toggle={this.props.closeModal} centered>
                <ModalHeader toggle={this.props.closeModal} id="post__success">Success Post This Content</ModalHeader>
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
}

export default Modal__Delete;