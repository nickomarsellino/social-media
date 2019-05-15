import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Card, CardBody, Button} from "mdbreact"
import {Form, TextArea, Image, Icon} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import './Post__Inbox.css';

import ModalComponent from "../Modal__Component/Modal_Component";

class Post__Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: '',
            inputTittle: '',
            inputBody: '',
            openModal: false,
            modalCondition: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            userId: this.props.userData.id,
            username: this.props.userData.username
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: this.state.inputTittle,
            body: this.state.inputBody,
            userId: this.state.userId
        })
            .then(response => {
                this.setState({
                    openModal: true,
                    modalCondition: "Post Success Modal"
                });
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

    render() {
        return (
            <div className="Post__container">
                <Card>
                    <CardBody>
                        <div className="profileBox">
                            <Image src={profile} avatar id="avatarBox"/>
                            <span><h5 id="nameBox">{this.state.username}</h5></span>
                            <Link to={'/Explore'}>
                                <Button color="default"
                                        size="md"
                                        color="info"
                                        id="explore__button"
                                        type="submit"
                                        style={{borderRadius: "5px"}}
                                >
                                    <Icon.Group>
                                        <Icon name='globe'/>
                                        Explore
                                    </Icon.Group>
                                </Button>
                            </Link>
                        </div>
                        <Form id="post__container" onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <Form.Field>
                                <input placeholder='Tittle' name="inputTittle" onChange={this.handleInputChange}/>
                            </Form.Field>
                            <Form.TextArea
                                placeholder={"Have a nice day " + this.state.username}
                                id='form-textarea-control-opinion'
                                type="text"
                                maxLength="120"
                                control={TextArea}
                                name="inputBody"
                                style={{maxHeight: "100px", minHeight: "90px"}}
                                onChange={this.handleInputChange}
                            />
                            <Button color="default"
                                    size="md"
                                    id="post__button"
                                    type="submit"
                                    style={{borderRadius: "5px"}}
                                    disabled={!this.state.inputBody}
                            >Post</Button>
                        </Form>
                    </CardBody>
                </Card>

                {/*Modal Component*/}
                <ModalComponent
                    openModal={this.state.openModal}
                    closeModal={this.closeModal}
                    condition={this.state.modalCondition}
                    title={this.state.inputTittle}
                    body={this.state.inputBody}
                    username={this.state.username}
                />
            </div>
        );
    }
}

export default Post__Inbox;