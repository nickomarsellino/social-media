import React, {Component} from 'react';
import axios from 'axios';
import {Comment, Icon, Message} from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import '../Comments__Component.css';
import ReactDOM from "react-dom";

class View__Comment__Component extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

    componentWillMount(){
        this.setState({
            comment:this.props.comment
        });
    }

    deleteComment(postId, commentId){
        let url= "https://jsonplaceholder.typicode.com/comments/"+commentId
        console.log(url)
        axios.delete(url,)
            .then(response => {
                console.log(response)
                alert('This Comment have been Deleted! \n' +
                    'Name: '+this.state.comment.name + '\n'+
                    'E-mail: '+ this.state.comment.email + '\n'+
                    'Body: '+ this.state.comment.body + '\n'+
                    '');
            });
    }

    showButtonDeleteComment(commentId, postId){
        if(this.props.userLoggedIn === commentId){
            return(
                <Icon name='trash' id="trashIcon" onClick={() => this.deleteComment(postId, commentId)}/>
            );
        }
    }
    render() {
        return (
            <div>
                <Comment id="commentsContainer" key={this.state.comment.id}>
                    <Comment.Avatar as='a' src={profile} id="commentAvatar"/>
                    <Comment.Content>
                        <Comment.Author as='a' id="commentUsername">{this.state.comment.name}</Comment.Author>
                        <Comment.Text id="commentText">{this.state.comment.email}</Comment.Text>
                        <Comment.Text id="commentText">{this.state.comment.body}</Comment.Text>
                    </Comment.Content>

                    //users hanya bisa mengapus comment Id yang sama dengan userLoggedIn saat ini.
                    {this.showButtonDeleteComment(this.state.comment.id, this.state.comment.postId)}
                    <hr/>
                </Comment>
            </div>
        );
    }
}

export default View__Comment__Component;