import React, {Component} from 'react';
import axios from 'axios';
import {Container} from "mdbreact"
import {Route} from 'react-router-dom';
import './App.css';

//load another component
import Navbar from "./Component/Navigation__bar/Navigation__bar";
import PostInbox from "./Component/Post__InputBox/Post__Inbox"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    componentWillMount() {
        this.getDataUsers()
    }

    getDataUsers() {
        axios.get('https://jsonplaceholder.typicode.com/users/' + this.getRandomInt(10), {
            withCredentials: true
        })
            .then(res => {
                this.setState({
                    userData: res.data
                });
            });
    }

    render() {
        const home = () => (
            <Container className="col-lg-6 col-lg-offset-2" style={{marginBottom: "5%"}}>
                <PostInbox userData={this.state.userData}/>
            </Container>
        );
        return (
            <div className="App">
                <Navbar userData={this.state.userData}/>

                <div>
                    <Route exact path={this.props.match.url} component={home}/>
                </div>
            </div>
        );
    }
}

export default App;
