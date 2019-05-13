import React, {Component} from 'react';
import axios from 'axios';

import ViewComponent from "./View__Component";


class View__Container extends Component {
    constructor() {
        super();
        this.state = {
            postData: [],
        };

    }

    componentWillMount() {
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

    render() {
        return (
            <div style={{overflow: "auto"}}>
                {this.state.postData.map(post =>
                    <ViewComponent
                        key={post.id}
                        post={post}
                        userLoggedIn={this.props.userData.id}
                    />
                )}
            </div>
        );
    }
}

export default View__Container;