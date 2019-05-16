import React, {Component} from 'react';
import {Card, Comment, Image} from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import axios from 'axios';
import '../Explore.Component.css';

import ModalComponent from "../../Modal__Component/Modal_Component";

class Explore__Album__Component extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            username: '',
            photoTitle: '',
            photoUrl: '',
            PhotoThumbnail: '',
            openModal: false,
            modalCondition: ''
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            title: this.props.album.title
        });

        this.getUserData();
        this.getPhotoData();
    }

    getUserData(){
        axios.get('https://jsonplaceholder.typicode.com/users/' + this.props.album.userId)
            .then(res => {
                this.setState({
                    username: res.data.username
                });
            });
    }

    getPhotoData(){
        axios.get('https://jsonplaceholder.typicode.com/photos/' + this.props.album.userId)
            .then(res => {
                this.setState({
                    photoTitle: res.data.title,
                    photoUrl: res.data.url,
                    PhotoThumbnail: res.data.thumbnailUrl
                });
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

    openDetailPhoto(){
        this.setState({
            openModal: true,
            modalCondition: "Detail Photo Modal"
        });
    }

    render() {
        return (
            <div className="album--Container">
                <Card id="album__cart__container">
                    <Card.Content>
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar as='a' src={profile}/>
                                <Comment.Content>
                                    <Comment.Author id="album--title">{this.state.title}</Comment.Author>
                                    <Comment.Text id="album--name">
                                        From: {this.state.username}
                                    </Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                        <Image src={this.state.PhotoThumbnail} size='medium'
                               onClick={() => this.openDetailPhoto()}

                        />
                    </Card.Content>
                </Card>

                {/*Modal Component*/}
                <ModalComponent
                    openModal={this.state.openModal}
                    closeModal={this.closeModal}
                    condition={this.state.modalCondition}
                    title={this.state.title}
                    description={this.state.photoTitle}
                    username={this.state.username}
                    photo={this.state.photoUrl}
                />
            </div>
        );
    }
}

export default Explore__Album__Component;