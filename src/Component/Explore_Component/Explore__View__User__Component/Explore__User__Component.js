import React, {Component} from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';
import profile from '../../../daniel.jpg';
import {Link} from 'react-router-dom';
import '../Explore.Component.css';

class Navigation__bar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            name: "",
            username:"",
            city: "",
        };
    }
    componentWillMount() {
        this.setState({
            userId: this.props.users.id,
            name: this.props.users.name,
            username: this.props.users.username,
            city: this.props.users.address.city
        });
    }

    viewButtton(userId){
        if (this.props.userLoggedIn !== userId) {
            return (
                <center>
                    <Link
                        to={`/Profile/${this.state.username}`}
                    >
                    <div
                        id='icon--view--profile'>
                        <center>
                            <Icon
                                size='large'
                                name='user circle'
                            />
                            {' '} View Profile
                        </center>
                    </div>
                    </Link>
                </center>
            );
        }
    }

    render() {
        return (
            <div className="col-lg-3 col-lg-offset-4 user-Container" key={""}>
                <Card>
                    <center>
                        <Image style={{margin: "20px"}}
                            // onClick={() => this.viewUserProfile(this.state.userData.username, this.state.userData._id)}
                        >
                            <img alt=" " src={profile} id="ProfileImage"/> </Image>
                    </center>
                    <Card.Content id="user__Card__Container">
                        <Card.Header className="card__profile__name"
                                     // onClick={() => this.viewUserProfile(this.state.userData.username, this.state.userData._id)}
                        >
                            {this.state.name}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.state.username}</span>
                        </Card.Meta>
                        <div>
                            <Icon name='map' />
                            {this.state.city}
                        </div>

                            {this.viewButtton(this.state.userId,this.state.username)}
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default Navigation__bar;