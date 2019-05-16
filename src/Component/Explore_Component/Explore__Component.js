import React, {Component} from 'react';
import FadeIn from 'react-fade-in';
import { Icon, Step } from 'semantic-ui-react';
import './Explore.Component.css';

import ExploreUsers from "./Explore__View__User__Component/Explore__Users__Container";
import ExploreAlbums from "./Explore__View__Album__Component/Explore__Album__Container";


class Explore__Component extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 1
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
                return <ExploreAlbums/>;
            default:
                return null;
        }
    }

    handleChange = (event) => {
        // We are looking for data-trigger attribute
        // In this example we expect type number but trigger holds string
        // That's why we 'cast' to a number using Number()
        const current = Number(event.target.dataset.trigger);
        // Sets new state of current component and triggers new render
        this.setState({ current })
    }

    render() {
        return (
            <FadeIn>
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
                                <Icon name='image' />
                                <Icon corner name='thumbs up outline' />
                            </Icon.Group>
                            <p>&nbsp;Best New Album</p>
                        </a>
                    </div>
                    {this.renderMyComponent()}
                </div>
            </FadeIn>
        );
    }
}

export default Explore__Component;