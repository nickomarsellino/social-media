import React, {Component} from 'react';
import axios from 'axios';
import { Icon, Step } from 'semantic-ui-react';
import './Explore.Component.css';

import ExploreUsers from "./Explore__User__Component/Explore__Users__Container";


class Explore__Component extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    renderMyComponent = () => {
        // Our switch conditional render
        switch(this.state.current) {
            case 0:
                return <ExploreUsers
                    history={this.props.history}
                    userLoggedIn={this.props.userLoggedIn}
                />;
            case 1:
                return <h1>2</h1>;
            default:
                return null;
        }
    }

    handleChange = (event) => {
        // We are looking for data-trigger attribute
        // In this example we expect type number but trigger holds string
        // That's why we 'cast' to a number using Number()
        const current = Number(event.target.dataset.trigger);
        console.log(event.target.dataset)
        console.log(current)
        // Sets new state of current component and triggers new render
        this.setState({ current })
    }

    render() {
        return (
            <div>
                <div id="explore__container" className="ui three item menu">
                    <a className="item itemNav"
                       data-trigger="0"
                       onClick={this.handleChange}
                    >
                        <Icon.Group size='large'>
                            <Icon name='users' />
                            <Icon corner name='add' />
                        </Icon.Group>
                        <p>&nbsp;Connect to another users</p>
                    </a>
                    <a className="item itemNav"
                       data-trigger="1"
                       onClick={this.handleChange}
                    >
                        <Icon.Group size='large'>
                            <Icon name='music' />
                            <Icon corner name='assistive listening systems' />
                        </Icon.Group>
                        <p>&nbsp;Best New Album</p>
                    </a>
                </div>
                {this.renderMyComponent()}
            </div>
        );
    }
}

export default Explore__Component;