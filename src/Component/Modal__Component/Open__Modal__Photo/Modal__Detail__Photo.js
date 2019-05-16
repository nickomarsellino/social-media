import React, {Component} from 'react';
import { Modal, ModalBody, ModalHeader} from 'mdbreact';
import { Image} from 'semantic-ui-react';


class Modal__Delete extends Component{
    componentWillMount() {
        console.log(this.props)
    }
    render() {
        return (
            <Modal isOpen={this.props.openModal} toggle={this.props.closeModal} centered id="delete--modal">
                <ModalHeader id="detail__photo__header" toggle={this.props.closeModal}>Detail Photo</ModalHeader>
                <ModalBody id="photo--content">
                    Title :&nbsp;{this.props.title} <br/>
                    Description : &nbsp;{this.props.description}
                    <p>From :&nbsp;{this.props.username}</p>
                </ModalBody>
                <Image src={this.props.photo} size='medium' id="photo--content--image"/>
            </Modal>
        );
    }
}

export default Modal__Delete;