import React, {Component} from 'react';
import axios from 'axios';
import {Comment, Icon, Message} from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import ReactDOM from "react-dom";
import "../Comments__Component.css";

import CommentComponent from "./View__Comment__Component";

class Navigation__bar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            commentsData: []
        };
    }

    componentWillMount(){
        this.setState({
            commentsData:this.props.commentsData
        });
    }

    render() {
        return (
            <Comment.Group size='small'>
                {this.state.commentsData.map(comment =>
                    <CommentComponent
                        userLoggedIn={this.props.userLoggedIn}
                        comment={comment}/>
                )}
            </Comment.Group>
        );
    }
}

export default Navigation__bar;