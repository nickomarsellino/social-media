import React, {Component} from 'react';
import axios from 'axios';
import {Container} from "mdbreact";
import FadeIn from 'react-fade-in';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

//load another component
import Navbar from "./Component/Navigation__bar/Navigation__bar";
import PostInbox from "./Component/Post__InputBox/Post__Inbox";
import ViewData from "./Component/Post__ViewData/View__Container";
import ExploreComponent from "./Component/Explore_Component/Explore__Component";
import ProfileComponent from "./Component/Profile__Page__Component/Profile__Page";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };
    }

    //untuk me-random pengguna yang seakan-akan sedang login di aplikasi.
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    componentWillMount() {
        this.getDataUsers()
    }

    componentWillUnmount() {
        this.getDataUsers()
    }

    getDataUsers() {
        axios.get('https://jsonplaceholder.typicode.com/users/' + this.getRandomInt(10))
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
                <ViewData
                    history={this.props.history}
                    userData={this.state.userData}
                    userLoggedIn={this.state.userData.id}
                />
            </Container>
        );

        const explore = () => (
            <Container className="col-lg-8 col-lg-offset-4" style={{marginBottom: "5%", marginTop: "5%"}}>
                <ExploreComponent history={this.props.history} userLoggedIn={this.state.userData.id}/>
            </Container>
        );


        // console.log(this.props.location.state);
        return (
            <Router>
                <FadeIn>
                    <div className="App">
                        <Navbar userData={this.state.userData} history={this.props.history}/>

                        <div>
                            <Switch>
                                <Route exact path={'/'} component={home}/>
                                <Route path={'/Profile/:username'} render={({match}) => (
                                    <Container className="col-lg-8 col-lg-offset-4"
                                               style={{marginBottom: "5%", marginTop: "5%"}}>
                                        <ProfileComponent
                                            username={match.params.username}
                                            userLoggedIn={this.state.userData.id}
                                        />
                                    </Container>
                                )}
                                />
                                <Route path={'/Explore'} component={explore}/>
                            </Switch>
                        </div>
                    </div>
                </FadeIn>
            </Router>
        );
    }
}

export default App;
