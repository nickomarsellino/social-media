import React, {Component} from 'react';
import {Card, Comment, Image} from 'semantic-ui-react'
import axios from 'axios';
import '../Explore.Component.css';

import AlbumComponent from "./Explore__Album__Component";


class Explore__Album__Container extends Component {
    constructor() {
        super();
        this.state = {
            albumData: [],
        };

    }

    componentWillMount() {
        this.getAlbumsData();
    }

    getAlbumsData() {
        //difungsi ini hanya mengambil masing-masing 1 data album bersarkan idnya
        //jadi hasil yangdipatkan 1 users mempunyai 1 album
        const data = [];

        for (let i = 1; i <= 91; i += 10) {
            axios.get('https://jsonplaceholder.typicode.com/albums/' + i)
                .then(res => {
                    data.push(res.data);
                    let joined = this.state.albumData.concat(res.data);
                    this.setState({albumData: joined})
                });
        }
    }

    render() {
        return (
            <div>
                {this.state.albumData.map(album =>
                    <AlbumComponent album={album} key={album.id}/>
                )}
            </div>
        );
    }
}

export default Explore__Album__Container;