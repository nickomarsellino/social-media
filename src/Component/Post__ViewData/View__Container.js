import React, {Component} from 'react';
import axios from 'axios';

import ViewComponent from "./View__Component";


class View__Container extends Component {
    constructor() {
        super();
        this.state = {
            postData: [],
            posDataUsers: []
        };

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location){
            this.getUserPostData(nextProps.userId);
        }
    }


    componentWillMount() {
        // console.log(this.props.location)

        this.getPostData();
    }

    componentWillUnmount() {
        this.getPostData();
    }

    getPostData() {
        //difungsi ini hanya mengambil masing-masing 2 post dari setiap users supaya lebih beragam.
        const data = [];
        for (let i = 1; i < 11; i++) {
            axios.get('https://jsonplaceholder.typicode.com/posts?userId=' + i)
                .then(res => {
                    for (let j = 0; j < 2; j++) {
                        data.push(res.data[j]);
                        let joined = this.state.postData.concat(res.data[j]);
                        this.setState({postData: joined})
                    }
                });
        }
    }

    getUserPostData(userId){
        const data = [];
        axios.get('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
            .then(res => {
                for (let j = 0; j < 10; j++) {
                    data.push(res.data[j]);
                    let joined = this.state.posDataUsers.concat(res.data[j]);
                    this.setState({posDataUsers: joined})
                }
            });
    }

    condition(){
        if(this.props.location){
            return(
                <div style={{overflow: "auto"}}>
                    {this.state.posDataUsers.map(post =>
                        <ViewComponent
                            history={this.props.history}
                            key={post.id}
                            post={post}
                            userLoggedIn={this.props.userLoggedIn}
                        />
                    )}
                </div>
            );
        }
        else{
            return(
                <div style={{overflow: "auto"}}>
                    {this.state.postData.map(post =>
                        <ViewComponent
                            history={this.props.history}
                            key={post.id}
                            post={post}
                            userLoggedIn={this.props.userLoggedIn}
                        />
                    )}
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.condition()}
            </div>
        );
    }
}

export default View__Container;