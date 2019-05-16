import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Feed, Icon} from 'semantic-ui-react';
import {Card, CardBody} from "mdbreact";
import './View__Component.css';
import profile from '../../daniel.jpg';

import ModalComponent from "../Modal__Component/Modal_Component";

class View__Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            userId: '',
            username: '',
            title: '',
            body: '',
            userLoggedIn: '',
            commentsData:[],
            openModal: false,
            modalCondition: ''
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            Id: this.props.post.id,
            userId: this.props.post.userId,
            userLoggedIn: this.props.userLoggedIn,
            title: this.props.post.title,
            body: this.props.post.body
        });

        this.getDataUsers();
        this.getCommentsData(this.props.post.id);
    }

    getDataUsers() {
        axios.get('https://jsonplaceholder.typicode.com/users/' + this.props.post.userId)
            .then(res => {
                this.setState({
                    username: res.data.username
                });
            });
    }

    getCommentsData(postId){

        //untuk merandom jumlah data comment yang diambil
        let length = Math.floor(Math.random() * (15 - 5 + 1)) + 5
        let data = []

        axios.get('https://jsonplaceholder.typicode.com/posts/' +postId+'/comments')
            .then(res => {
                res.data.forEach(comments => {
                    if (data.length < length) {
                        data.push(comments);
                    }
                });
                this.setState({
                    commentsData: data,
                })
            });
    }

    buttonDelete(postId,userId) {
        if (userId === this.state.userLoggedIn) {
            return (
                <Icon
                    size='large' name='trash'
                    id="recycle--icon"
                    onClick={() => this.openModalDelete(postId)}
                />
            );
        }
    }

    buttonEdit(userId){
        if (userId === this.state.userLoggedIn) {
            return (
                <Icon
                    size='large' name='edit'
                    id="edit--icon"
                    onClick={() => this.openDetailPost()}
                />
            );
        }
    }

    openModalDelete(postId) {
        axios.delete("https://jsonplaceholder.typicode.com/posts/"+postId,)
            .then(response => {
                this.setState({
                    openModal: true,
                    modalCondition: "Delete Modal"
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

    openDetailPost(){
        this.setState({
            openModal: true,
            modalCondition: "Detail Post Modal"
        });
    }

    render() {
        return (
            <div id="scrollableDiv" style={{overflow: "auto"}}>
                <Card className="post__container" id="text-warp">
                    <CardBody className="post__cart">
                        <Feed>
                            <Feed.Event>
                                <Feed.Label style={{width: "60px", padding: "8px 0"}}>
                                    <img alt=" "
                                         src={profile}
                                         onClick={() => this.openProfilePage(this.state.userId, this.state.username)}
                                    />

                                </Feed.Label>
                                <Feed.Content className="post__container">

                                    <Feed.Summary
                                        id="post--title"
                                        content={this.state.title}
                                    />

                                    <Link
                                        to={`/Profile/${this.state.username}`}
                                    >
                                        <Feed.Extra
                                            id="post--username" text
                                            content={this.state.username}
                                        />
                                    </Link>


                                    <Feed.Extra
                                        onClick={() => this.openDetailPost(this.state.id)}
                                        text
                                        content={this.state.body}
                                    /> <br/>

                                    <Icon.Group
                                        onClick={() => this.openDetailPost(this.state.id)}
                                                id="comments--icon">
                                        <Icon name='comments'/>
                                        {this.state.commentsData.length} Comments
                                    </Icon.Group>

                                </Feed.Content>

                                <Feed.Label>
                                    {this.buttonDelete(this.state.Id,this.state.userId)}
                                    {this.buttonEdit(this.state.userId)}
                                </Feed.Label>
                            </Feed.Event>
                        </Feed>
                    </CardBody>
                </Card>

                {/*Modal Component*/}
                <ModalComponent
                    openModal={this.state.openModal}
                    closeModal={this.closeModal}
                    condition={this.state.modalCondition}
                    userId={this.state.userId}
                    userLoggedIn={this.state.userLoggedIn}
                    postId={this.props.post.id}
                    title={this.state.title}
                    body={this.state.body}
                    username={this.state.username}
                    commentsData={this.state.commentsData}
                />
            </div>
        );
    }
}

export default View__Component;