import React, {Component} from 'react';
import axios from 'axios';
import {Feed, Icon, Image} from 'semantic-ui-react';
import {Container, Modal, ModalBody, ModalHeader} from 'mdbreact';

class Modal__Delete extends Component{
    render() {
        return (
            <Modal isOpen={this.props.openModal} toggle={this.props.closeModal} centered id="delete--modal">
                <ModalHeader id="delete--header" toggle={this.props.closeModal}>Success Delete This Content</ModalHeader>
                <ModalBody id="delete--content">
                    {this.props.title}
                    <p>From :&nbsp;{this.props.username}</p>
                </ModalBody>
            </Modal>
        );
    }
}

export default Modal__Delete;