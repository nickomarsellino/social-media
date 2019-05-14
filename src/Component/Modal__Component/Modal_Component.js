import React, {Component} from 'react';
import axios from 'axios';
import {Feed, Icon, Image} from 'semantic-ui-react';
import {Container, Modal, ModalBody, ModalHeader} from 'mdbreact';
import profile from '../../daniel.jpg';
import './Modal_Component.css';

import ModalDelete from "../Modal__Component/Open__Modal__Delete/Modal__Delete";
import ModalPost from "../Modal__Component/Open__Modal__Post__Success/Modal__Post__Success";
import ModalDetailPost from "../Modal__Component/Open_Modal_Detail_Post/Modal_Detail_Post";

class Modal_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.closeModal = this.closeModal.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        // if (nextProps.tweet !== this.props.tweet) {
        //     console.log(this.state.commentsData)
        // }
    }

    //Akses Fungsi untuk close modal di parent
    closeModal() {
        this.props.closeModal(this.props.openModal);
    }

    //component modal sesuai dengan kebutuhan
    openModalDelete() {
        return (
            <ModalDelete
                openModal={this.props.openModal}
                closeModal={this.closeModal}
                title={this.props.title}
                username={this.props.username}
            />
        );
    }

    openPostSuccess() {
        return (
            <ModalPost
                openModal={this.props.openModal}
                closeModal={this.closeModal}
                title={this.props.title}
                username={this.props.username}
                body={this.props.body}
            />
        );
    }

    openDetailPost(){
        return (
            <ModalDetailPost
                openModal={this.props.openModal}
                closeModal={this.closeModal}
                postId={this.props.postId}
                title={this.props.title}
                username={this.props.username}
                body={this.props.body}
                commentsData={this.props.commentsData}
                userId={this.props.userId}
                userLoggedIn={this.props.userLoggedIn}
            />
        );
    }

    //render sesuai dengan kondisi modal yang dibuka
    render() {
        if (this.props.openModal) {
            if (this.props.condition.localeCompare("Delete Modal") === 0) {
                return (
                    <Container>
                        {this.openModalDelete()}
                    </Container>
                );
            }
            else if (this.props.condition.localeCompare("Post Success Modal") === 0) {
                return (
                    <Container>
                        {this.openPostSuccess()}
                    </Container>
                );
            }
            else if(this.props.condition.localeCompare("Detail Post Modal") === 0){
                return (
                    <Container>
                        {this.openDetailPost()}
                    </Container>
                );
            }
        }
        else {
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